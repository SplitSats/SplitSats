import { SecureStore } from '@store/SecureStore'
import { SimpleKeyValueStore } from '@store/SimpleKeyValueStore'

const store = new SimpleKeyValueStore('__store__')

const secureStore = new SecureStore()

export { secureStore, SimpleKeyValueStore, store }
