import { SecureStore } from '@store/SecureStore'
import { SimpleKeyValueStore } from '@store/SimpleKeyValueStore'
import { AsyncStore } from '@store/AsyncStore'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { useDispatch as useReactReduxDispatch } from "react-redux"
import { persistStore, persistReducer } from "redux-persist"
import { profilesSlice } from "@src/redux/slices/profilesSlice"


// Choose here which store to use [AsyncStorage or SQLite]
// const store = new SimpleKeyValueStore('__store__')
// const store = new AsyncStore()
const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["settings"],
  }
  
  const rootReducer = combineReducers({
    profiles: profilesSlice.reducer,
  })
  
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })

  export const secureStore = new SecureStore()

  export type RootState = ReturnType<typeof store.getState>
  export const persistor = persistStore(store)
  
  export type AppDispatch = typeof store.dispatch
  export type GetState = () => RootState
  export const useDispatch: () => AppDispatch = useReactReduxDispatch

  