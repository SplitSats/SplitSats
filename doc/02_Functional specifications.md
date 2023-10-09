# SplitSats - Functional specifications

This document aims to give to development team a guide to develop SplitSats meeting the [01_Project Proposal: SplitSats](01_Project%20Proposal:%20Splitsats.md)

### User Nostr key generation
- Users will be able to generate their new Nostr keypair directly from the app. This allow them to create a Nostr account and insert the main info.
- Users will be informed to save their keys to recover their account in future or use it in other nostr clients.
- The app will use an algorithm to generate a public/private key pair, in a Bech32 encoded format:
    - private key: nsec…
    - public key: npub…

### User Login
- Users will be able to login with an existing Nostr account using their private key.
- Users' infos will be retrieved automatically querying the relays.

### User Profile
- Users will be able to add/modify their account info, such as:
    - Display name
    - Username
    - Profile Image
    - Description
    - Nostr Address (NIP05)*
    - LN address
    - Adding relays
- Users profile will be identified by their username, with their npub visible to be shared.

### Contacts
- All the contacts will be retrieved querying the relays.
- Users will be able to add new contacts using their public key or Nostr Address (NIP05).
- Users will be able to add new contacts scanning their QR code.

### Add Bills
- **Manually**:  Users will be able to add a new bill by manually adding price and description. Users will also choose the contact to split the bill with.
- **Automatically**: Users will be able to add a new bill by scanning the receipt. The underlying AI-OCR system will detect the description and the price. Users will have to manually add the friends to split the bill with.
- **Bills splitting**: the bills can be splitted between the friends in different ways:
    - in equal parts;
    - in unequal parts;
    - by percentage;
    - by shares.
- **Debits and credits tracking**: in the home page, users can check their debits and credits with groups and friends.. 
- **Settle the expense**: users will be able to settle the expenses using the lightning network, as a nostr zap.
- **Statistics**: users can check payment done and received in an history page.

### Lighting Network Payment
- User will be able to settle the expenses using the lightning network.
- To pay, a zap will be created using the contact LN Address.
- The zap request generates the invoice to be paid with the user's favorite lightning wallet installed on their smartphone.
- The zap receipt generated will be intercepted to automatically settle the expenses in the app.
