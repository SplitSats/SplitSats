import {
    relayInit,
    getEventHash,
    getSignature,
    finishEvent,
    validateEvent,
    verifySignature,
    Relay,
    SimplePool
} from "nostr-tools"
import { l, err } from "@log"
import { sign } from "crypto"
import { USE_POOL } from "@consts/config"

  export const nostrEventKinds = {
    profile: 0,
    note: 1,
    contactList: 3,
    repost: 6,
    reaction: 7,
  }
  export const defaultRelays = [
    'wss://127.0.0.1:8008',
    'wss://relay.damus.io',
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
  
  const GET_EVENTS_LIMIT = 50
  const TIMEOUT = 3000
  
  type ConnectionEventCbArg = {
    success: boolean
    relay?: Relay
  }
  
  export const connectToRelay = async (relayEndpoint, cb: (ConnectionEventCbArg) => void) => {
    let relay
    let handled = false
  
    try {
      relay = relayInit(relayEndpoint)
      await relay.connect()
  
      relay.on("connect", () => {
        l("connected to: ", relay.url)
  
        handled = true
        return cb({ relay, success: true })
      })
  
      relay.on("error", () => {
        relay.close()
        handled = true
  
        return cb({ relay, success: false })
      })
    } catch (e) {
      l("error with init relay", relayEndpoint, e)
      handled = true
  
      cb({ relay: { url: relayEndpoint, status: 0 }, success: false })
    }
  
    setTimeout(() => {
      if (handled) return
  
      if (relay) {
        relay.close()
      }
  
      cb({ relay, success: false })
    }, 1000)
  }
  
  export const getNostrEvents = async (relays: Relay[], filter?: NostrFilter): Promise<NostrEvent[]> =>
    new Promise((resolve) => {
      const limit = filter?.limit || GET_EVENTS_LIMIT
      const eventsById: Record<string, NostrEvent> = {}
      let fetchedCount = 0
      let returned = false
  
      relays.forEach((relay) => {
        if (!relay.sub) {
          return
        }
  
        const sub = relay.sub([
          {
            limit,
            ...filter,
          },
        ])
  
        sub.on("event", (event) => {
          const nostrEvent = <NostrEvent>event
  
          let newEvent = nostrEvent
          if (nostrEvent.kind === nostrEventKinds.profile) {
            const { content: possiblyStringifiedContent, ...rest } = nostrEvent
            if (typeof possiblyStringifiedContent === "string") {
              try {
                const content = JSON.parse(possiblyStringifiedContent)
                newEvent = { content, ...rest }
              } catch (e) {
                l("error parsing content", e)
                l("", nostrEvent)
              }
            }
          }
  
          // ts-expect-error
          eventsById[nostrEvent.id] = newEvent
  
          fetchedCount++
  
          if (fetchedCount === limit) {
            resolve(Array.from(Object.values(eventsById)))
            sub.unsub()
            returned = true
          }
        })
  
        sub.on("eose", () => {
          sub.unsub()
        })
  
        setTimeout(() => {
          // If all data was already received do nothing
          if (returned) {
            return
          }
  
          // If a timeout happens, return what has been received so far
          sub.unsub()
          returned = true
  
          resolve(Array.from(Object.values(eventsById)))
        }, TIMEOUT)
      })
    })
  
  export const getNostrEvent = async (relays: Relay[], filter?: NostrFilter): Promise<NostrEvent> =>
    new Promise((resolve) => {
      relays.forEach((relay) => {
        if (!relay.sub) {
          return
        }
  
        const sub = relay.sub([{ ...filter }])
        sub.on("event", (event) => {
          const nostrEvent = <NostrEvent>event
          const { content: stringifedContent, ...rest } = nostrEvent
          if (stringifedContent === "") {
            resolve(nostrEvent)
          } else {
            try {
              const content = JSON.parse(stringifedContent)
              resolve({ content, ...rest })
            } catch (e) {
              resolve(nostrEvent)
            }
          }
          sub.unsub()
        })
  
        sub.on("eose", () => {
          sub.unsub()
        })
      })
    })
  
  export const publishNote = async (
    relays: Relay[],
    user: { pubkey: string; privateKey: string },
    kind: number,
    content = "",
    tags = []
  ): Promise<NostrNoteEvent | undefined> => {
    l("Publishing nostr event...")
    const event = {
      kind,
      pubkey: user.pubkey,
      created_at: Math.floor(Date.now() / 1000),
      content,
      tags,
    }
    const signedEvent = finishEvent(event, user.privateKey)
    
    l("signedEvent", signedEvent)
    
    let returned = false

    return new Promise((resolve) => {

      if (USE_POOL){
        const pool = new SimplePool()

        // Wrap in an async function to use await
        (async () => {
          let pubs = await pool.publish(defaultRelays, signedEvent);
          l("pubs", pubs);
          await Promise.all(pubs);
          resolve(signedEvent);
        })();
        
        // let pubs = pool.publish(defaultRelays, signedEvent)
        // l("pubs", pubs)
        // await Promise.all(pubs)
        // resolve(event)
      } else {
        const publishPromises = relays.map(async (relay) => {
          l("publishing event using relay:", relay.url)
          if (!relay.publish) {
            return;
          }
          const pub = await relay.publish(signedEvent); // Use await here
          if (!pub) {
            err("Error publishing event using relay:", relay.url);
          } else {
            l("published event using relay:", relay.url)
          }
          return event; // Return the event for resolution
        });
  
        Promise.all(publishPromises)
          .then(() => resolve(event))
          .catch((error) => {
            console.error("Error publishing events:", error);
          });
    }
    setTimeout(() => {
      if (!returned) {
        resolve(undefined)
        returned = true
      }
    }, 5000)
    })
}

  export const getProfile = async (
    relays: Relay[],
    pubkey: string
  ): Promise<{ profile?: NostrProfile; contactList?: NostrContactListEvent }> => {
    const profilePromise = getNostrEvent(relays, {
      kinds: [nostrEventKinds.profile],
      authors: [pubkey],
    })
  
    const contactListPromise = getNostrEvent(relays, {
      kinds: [nostrEventKinds.contactList],
      authors: [pubkey],
    })
  
    const [profile, contactList] = await Promise.all([profilePromise, contactListPromise])
  
    const profileRes = profile as NostrProfileEvent
    const contactListRes = contactList as NostrContactListEvent
  
    return { profile: profileRes, contactList: contactListRes }
  }
  