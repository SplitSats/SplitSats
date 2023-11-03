import { SecureStore } from '@store/SecureStore'
import { SimpleKeyValueStore } from '@store/SimpleKeyValueStore'
import { AsyncStore } from '@store/AsyncStore'

// Choose here which store to use [AsyncStorage or SQLite]
const store = new SimpleKeyValueStore('__store__')
// const store = new AsyncStore()

const secureStore = new SecureStore()

export { secureStore, SimpleKeyValueStore, store }
