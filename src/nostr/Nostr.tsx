import { generatePrivateKey, getPublicKey, nip44 } from 'nostr-tools'
import { relayInit, finishEvent } from 'nostr-tools'
import 'websocket-polyfill'

// Define an interface for a group
interface Group {
  author: string;
  name: string;
  photo: string;
  createdAt: Date;
  members: string[];
}

interface User {
  privateKey: string;
  publicKey: string;
}


// Function to create a new user with a private key and public key
function createUser() {
  const privateKey = generatePrivateKey();
  const publicKey = getPublicKey(privateKey);
  return {
    privateKey: privateKey,
    publicKey: publicKey,
  };
}

// Function to send a message
async function createEncryptedEvent(sender: User, receiver: User, message: string) {
  const sharedKey = nip44.utils.v2.getConversationKey(sender.privateKey, receiver.publicKey);
  console.log(sharedKey);
  const ciphertext = nip44.encrypt(sharedKey, message);

  const event = {
    kind: 4,
    created_at: Math.floor(Date.now() / 1000),
    pubkey: sender.publicKey,
    tags: [['p', receiver.publicKey]],
    content: ciphertext,
  };

  const signedEvent = finishEvent(event, sender.privateKey);
  return signedEvent;
}


// Define a function to handle incoming events on the receiver side
function handleIncomingEvent(event: any) {
  const senderPublicKey = event.pubkey;

  const sharedKey = nip44.utils.v2.getConversationKey(receiver.privateKey, senderPublicKey);
  const plaintext = nip44.decrypt(sharedKey, event.content);
  console.log(plaintext);
}

// Create sender and receiver users
const sender = createUser();
console.log(sender);
const receiver = createUser();

// Initialize the relay
const relay = relayInit('wss://relay.damus.io');

// Set up relay event handling
relay.on('connect', () => {
  console.log(`Connected to ${relay.url}`);
});

relay.on('error', () => {
  console.log(`Failed to connect to ${relay.url}`);
});

await relay.connect();

const subscription = relay.sub([
  {
    kinds: [4],
    authors: [sender.publicKey],
  },
]);

subscription.on('event', handleIncomingEvent);

// Send a message from sender to receiver
const message = 'Hello, receiver!';
const signedEvent = await createEncryptedEvent(sender, receiver, message);
await relay.publish(signedEvent);
