/**
 * Default bootstrap relays
 */

export const USE_NDK = true

export const defaultRelays: string[] = [
	'wss://relay.damus.io',
	'wss://relay.nostr.band', 
	'wss://purplepag.es',
	'wss://relay.snort.social',
	'wss://nos.lol/',
	'wss://nostr.zebedee.social',
	'wss://relay.plebstr.com',
	'wss://relay.nostrich.de',
	'wss://nostr.massmux.com',
	'wss://eden.nostr.land',
	'wss://nostr.wine',
]

export const defaultNpubs: string[] = [
	'npub1jwver7w272as2eaneruv3pg8he3u4fw9v8xukus5qealwv5pdymqp7qgvy', // splitsats
	'npub1uezd5f0czgdlkru5qfnv0v03a8uwmzxryg2sjvjzd732k3wfphyslwadkc', // waltermaffy
	'npub1q6le8ppm0nz0gdnfl4jxy77su3l8t56pqm99tl4xpwfl5uez6c7q7ztql6', // gianlock
	'npub16k0sld6ctkqd70kwalhvdgtlmtqzevg9w4dvnwa3sgtpqtmrqeeqak3n8e', // nadia
	'npub1suynw72ac26e835g0z7zzrteqzka9ls7pm3t8px70aktmwa5syrsjsjme3', // bitpolito
	'npub1za04drthlvxtwsq0phwc4mgh8rxhjafjkv2w7pf6ze5afka8gvaquadur3', // pavlenex
]

export const defaultRelays2: string[] = [
	'wss://relay.nostrss.re', 
	'wss://relay.nostrich.de',
	'wss://relay.plebstr.com',
	'wss://nostr-pub.wellorder.net',
	'wss://nostr.mom',
	'wss://4.up.railway.app',
	'wss://eden.nostr.land',
	'wss://nostr-relay.untethr.me',
	'wss://nostr.zebedee.social',
	'wss://offchain.pub',
	'wss://nostr.fmt.wiz.biz',
	'wss://nostr-relay.wlvs.space',
	'wss://nostr.fly.dev',
	'wss://nostr.nostr.band',
	'wss://relay.realsearch.cc',
	'wss://relay.nostrgraph.net',
	'wss://relay.minds.com/nostr/v1/ws',
	'wss://nos.lol/',
	'wss://relay.snort.social',
]

export enum EventKind {
	Unknown = -1,
	SetMetadata = 0,
	TextNote = 1,
	RecommendServer = 2,
	ContactList = 3, 			// NIP-02
	DirectMessage = 4, 			// NIP-04
	Deletion = 5, 				// NIP-09
	Repost = 6, 				// NIP-18
	Reaction = 7, 				// NIP-25
	BadgeAward = 8, 			// NIP-58
	SnortSubscriptions = 1000, 	// NIP-XX
	Polls = 6969, 				// NIP-69
	FileHeader = 1063, 			// NIP-94
	Relays = 10002, 			// NIP-65
	Ephemeral = 20_000,
	Auth = 22242, 				// NIP-42
	PubkeyLists = 30000, 		// NIP-51a
	NoteLists = 30001, 			// NIP-51b
	TagLists = 30002, 			// NIP-51c
	Badge = 30009, 				// NIP-58
	ProfileBadges = 30008, 		// NIP-58
	ZapRequest = 9734, 			// NIP 57
	ZapReceipt = 9735, 			// NIP 57
	HttpAuthentication = 27235, // NIP XX - HTTP Authentication
	SplitGroupRequest = 5001, 	// SplitSats Create Group
	SplitGroupReceipt = 5002, 	// SplitSats Confirm Group


}

export const npubLength = 64

export const splitSats = ''

/**
 * Regex to match a mnemonic seed
 */
// export const MnemonicRegex = /(\w+)/g

/**
 * NIP06-defined derivation path for private keys
 */
// export const DerivationPath = 'm/44\'/1237\'/0\'/0/0'

/**
 * Websocket re-connect timeout
 */
// export const defaultConnectTimeout = 2000