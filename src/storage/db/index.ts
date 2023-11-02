import { l } from '@log'
import type { IContact, IInvoice, IMint, IMintWithBalance, IPreferences, IPreferencesResp, ITx } from '@model'
import { arrToChunks, isObj } from '@util'
import * as SQLite from 'expo-sqlite'

import { Db } from './Db'
import { tables } from './sql/table'
import { views } from './sql/view'


const db = new Db(SQLite.openDatabase('splitsats.db'))
/*  ### table names ###
	contacts 
*/


// ################################ init DB ################################
export async function initDb() {
	if (process.env.NODE_ENV === 'test') {
		l('[initDb]', 'reset DB in test mode')
		await db.reset(SQLite.openDatabase('cashu.db'))
	}
	await db.execMany([
		{ sql: 'PRAGMA cache_size=8192;', args: [] },
		{ sql: 'PRAGMA encoding="UTF-8";', args: [] },
		{ sql: 'PRAGMA synchronous=NORMAL;', args: [] },
		{ sql: 'PRAGMA temp_store=FILE;', args: [] },
	], false)
	const queries: readonly string[] = [
		...tables,
		...views
	]
	const cmds: ITx[] = queries.map(query => ({
		sql: query,
		args: [],
		errorCb: (_, error) => {
			l('[initDb]', query, 'DB init error!', error)
			return true
		},
	}))
	return db.execTxs(
		cmds,
		err => { l('[initDb]', 'DB init error!', err) },
		() => { l('[initDb]', 'DB init success!') }
	)
}

// ################################ Preferences ################################
export async function getPreferences(): Promise<IPreferences> {
	const x = await db.get<IPreferencesResp>('SELECT * FROM preferences limit 1', [])
	return {
		id: x?.id || 1,
		darkmode: x?.darkmode === 'true',
		theme: x?.theme || 'Default',
		formatBalance: x?.formatBalance === 'true',
		hasPref: isObj(x)
	}
}
export async function setPreferences(p: IPreferences) {
	const x = await db.execInsert<IPreferences>(
		'INSERT OR REPLACE INTO preferences (id, theme,darkmode,formatBalance) VALUES (?, ?,?, ?)',
		[1, p.theme, p.darkmode.toString(), p.formatBalance.toString()]
	)
	return x.rowsAffected === 1
}


// ################################ Contacts ################################
export async function getContacts(): Promise<IContact[]> {
	interface ITempContact extends Omit<IContact, 'isOwner'> { isOwner: number }
	const contacts = await db.all<ITempContact>('select * from contacts')
	// l('[getContacts]', contacts)
	return contacts.map(c => ({ ...c, isOwner: !!c.isOwner })) as IContact[]
}
export async function addContact(c: IContact) {
	const result = await db.execInsert(
		'INSERT INTO contacts (name, ln, isOwner) VALUES (?, ?, ?)',
		[c.name, c.ln, c?.isOwner ? 1 : 0]
	)
	l('[addContact]', result, c)
	return result.rowsAffected === 1
}
export async function editContact(c: Required<IContact>) {
	const result = await db.execTx(
		'UPDATE contacts SET name = ? , ln = ? WHERE id = ?',
		[c.name, c.ln, c.id]
	)
	l('[editContact]', result, c)
	return result.rowsAffected === 1
}
export async function delContact(id: number) {
	const result = await db.execTx(
		'Delete from contacts Where id = ?',
		[id]
	)
	l('[delContact]', result, { id })
	return result.rowsAffected === 1
}



// ################################ Drops ################################
export function dropContacts() {
	return dropTable('contacts')
}
export function dropTable(table: string) {
	return db.execTx(`drop table ${table}`, [])
}
export async function dropAll() {
	try {
		await Promise.all([
			dropTable('preferences'),
			dropTable('contacts')
		])
	} catch (e) {
		// ignore
	}
}