import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext, useEffect,useState } from 'react'
import { store } from '@store'
import { STORE_KEYS } from '@store/consts'


const AuthContext = createContext()

export function AuthProvider({ children }) {
	const [userIsLoggedIn, setUserIsLoggedIn] = useState(false)

	useEffect(() => {
		// Check AsyncStorage for the user's login status
		const checkLoginStatus = async () => {
			const loggedIn = await store.get(STORE_KEYS.userIsLoggedIn)
			setUserIsLoggedIn(!!loggedIn) // Convert to boolean
		}

		checkLoginStatus()
	}, [])

	return (
		<AuthContext.Provider value={{ userIsLoggedIn, setUserIsLoggedIn }}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	return useContext(AuthContext)
}
