import { generatePrivateKey, getPublicKey, nip44 } from 'nostr-tools'
import { validateEvent, verifySignature, getSignature, getEventHash } from 'nostr-tools'
import { relayInit, signEvent, finishEvent } from 'nostr-tools'
import 'websocket-polyfill'

// Define an interface for a group
interface Group {
  author: string;
  name: string;
  photo: string;
  createdAt: Date;
  members: string[];
}

// Function to create a new user with a private key and public key
function createUser() {
  const privateKey = generatePrivateKey();
  const publicKey = getPublicKey(privateKey);
  return { privateKey, publicKey };
}

// Function to send a message
async function sendMessage(sender: User, receiver: User, relay: Relay, message: string) {
  const sharedKey = nip44.getSharedSecret(sender.privateKey, receiver.publicKey);
  const ciphertext = nip44.encrypt(sharedKey, message);

  const event = {
    kind: 4,
    created_at: Math.floor(Date.now() / 1000),
    pubkey: sender.publicKey,
    tags: [['p', receiver.publicKey]],
    content: ciphertext,
  };

  const signedEvent = finishEvent(event, sender.privateKey);
  console.log(signedEvent);
  await relay.publish(signedEvent);
}


// Define a function to handle incoming events on the receiver side
function handleIncomingEvent(event: any) {
  const senderPublicKey = event.pubkey;
  const sharedKey = nip44.getSharedSecret(receiver.privateKey, senderPublicKey);
  const plaintext = nip44.decrypt(sharedKey, event.content);
  console.log(plaintext);
}

// Create sender and receiver users
const sender = createUser();
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
sendMessage(sender, receiver, relay, message);
