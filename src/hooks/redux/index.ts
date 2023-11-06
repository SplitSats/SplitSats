export { useAppDispatch } from "./useAppDispatch";
export { useAppSelector } from "./useAppSelector";
import { createSelector } from "@reduxjs/toolkit"

import { nostrEventKinds } from "@nostr"
import type { RootState } from "@store"

const selectProfiles = (state: RootState) => state.profiles
const selectSettings = (state: RootState) => state.settings

export const selectUser = createSelector(selectSettings, (settings) => {
  return settings.user
})

export const selectProfilesByPubkey = createSelector(selectProfiles, (profiles) => {
  const { profilesByPubkey } = profiles
  return profilesByPubkey
})

export const selectRelaysByUrl = createSelector(selectSettings, (settings) => {
  return settings.relaysByUrl
})

export const selectRelaysLoadingByUrl = createSelector(selectSettings, (settings) => {
  return settings.relaysLoadingByUrl
})

export const selectContactListsByPubkey = createSelector(selectProfiles, (profiles) => {
  return profiles.contactListsByPubkey
})

export const selectNip05ByPubkey = createSelector(selectProfiles, (profiles) => {
  return profiles.nip05ByPubkey
})


export const selectHasRelayConnection = createSelector(selectRelaysByUrl, (relaysByUrl) => {
  return !!Object.values(relaysByUrl).find((relay) => relay.status === 1 && typeof relay.on === "function")
})

export const makeSelectProfileByPubkey = (pubkey: string) =>
  createSelector(selectProfilesByPubkey, (profilesByPubkey) => {
    return profilesByPubkey[pubkey]
  })

export const makeSelectContactListByPubkey = (pubkey: string) =>
  createSelector(selectContactListsByPubkey, (contactListsByPubkey) => {
    return contactListsByPubkey[pubkey]
  })

export const makeSelectSubscriptionByFeedId = (feedId: string) =>
  createSelector(selectSubscriptionsByFeedId, (subscriptionsByFeedId) => {
    return subscriptionsByFeedId[feedId]
  })

export const makeSelectNoteByNoteId = (noteId: string) =>
  createSelector(selectNotesById, selectProfilesByPubkey, (notesById, profilesByPubkey) => {
    const note = notesById[noteId]

    if (!note) {
      return
    }

    if (note.kind !== nostrEventKinds.repost) {
      // See if there are any replies
      // TODO: handle reposts of replies
      const replyingToPubkeys = note.tags.filter((tag) => tag[0] === "p").map((tag) => tag[1])
      const replyingToProfiles = replyingToPubkeys
        .map((pubkey) => profilesByPubkey[pubkey] || pubkey)
        .slice(0, 3)

      return {
        ...note,
        replyingToProfiles,
      }
    }

    const repostedId = note.tags.find((tag) => tag[0] === "e")?.[1]
    const repostedNote = notesById[repostedId]

    if (!repostedNote) {
      return
    }

    return {
      repostedBy: note.pubkey,
      ...repostedNote,
    }
  })

export const makeSelectUserHasRepostedByNoteId = (noteId: string) =>
  createSelector(selectNotesById, selectUser, (notesById, user) => {
    const notes = Object.values(notesById)

    for (let i = 0; i < notes.length; i++) {
      const note = notes[i]
      if (note.kind === nostrEventKinds.repost) {
        const isMe = note.pubkey === user.pubkey
        const isNoteMatch = note.tags.find((tag) => tag[0] === "e")?.[1] === noteId

        if (isMe && isNoteMatch) {
          return true
        }
      }
    }

    return false
  })

export const makeSelectRepostCountByNoteId = (noteId: string) =>
  createSelector(selectNotesById, (notesById) => {
    const notes = Object.values(notesById)

    let count = 0
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i]
      if (note.kind === nostrEventKinds.repost) {
        const isNoteMatch = note.tags.find((tag) => tag[0] === "e")?.[1] === noteId

        if (isNoteMatch) {
          count++
        }
      }
    }

    return count
  })

export const makeSelectionReactionsByNoteId = (noteId: string) =>
  createSelector(selectReactionsById, (reactionsByNoteId) => {
    return reactionsByNoteId[noteId]?.length || 0
  })

export const makeSelectFeedById = (feedId: string) =>
  createSelector(selectFeedsById, selectNotesById, selectLoadingById, (feedsById, notesById, loadingById) => {
    const loading = loadingById[feedId]
    const feed = feedsById[feedId]

    if (!feed) {
      return { notes: [], loading }
    }

    return {
      loading,
      notes: feed
        .reduce((acc, noteId) => {
          const note = notesById[noteId]

          if (note) {
            return [...acc, note]
          }

          return acc
        }, [])
        .sort((a, b) => b.created_at - a.created_at)
        .map((note) => note.id),
    }
  })

export const makeSelectNip05ByPubkey = (pubkey: string) =>
  createSelector(
    selectNip05ByPubkey,
    (state: RootState) => makeSelectProfileByPubkey(pubkey)(state),
    (nip05ByPubkey, profile) => {
      if (!profile || !profile?.content.nip05) {
        return undefined
      }

      const nip05ForPubkey = nip05ByPubkey[pubkey]
      return nip05ForPubkey
    }
  )
