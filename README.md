# SplitSats - Sync Groups, Split Bills and Settle in Bitcoin
SplitSats is a complete re-imagination of financial collaboration powered by BTC on Lightning and centred around chat with Nostr as the base layer.

SplitSats is a proof of concept application that aims to provide users with an easy way to share expenses and settle debts instantly using bitcoin. The React Native app will utilize Nostr for user profiles and payment contacts. Users will be able to add expenses manually or automatically, by scanning fiscal receipts, enabling them to itemize expenses and assign them to appropriate contacts (friends), to tabulate amounts owing by each group member. Artificial intelligence API will be implemented for receipt scanning to extract itemized lists within the app.


## Table of Contents

- [SplitSats - Sync Groups, Split Bills and Settle in Bitcoin](#splitsats---sync-groups-split-bills-and-settle-in-bitcoin)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
  - [Contributing](#contributing)
  - [License](#license)

## About

This is a React Native application that uses the Expo framework. It is a proof of concept application that aims to provide users with an easy way to share expenses and settle debts instantly using bitcoin. 

We are using NDK and nostr-tools for nostr communication. 


## Installation

Explain how to install your project:

1. Clone the repository: `git clone https://github.com/SplitSats/SplitSats.git`
2. Install dependencies: `npm install` or `yarn install`

## Usage

Provide instructions on how to use your application:

1. Start the Expo development server: `expo start` or `npm run start`
2. Scan the QR code with the Expo Go app on your mobile device or run in a simulator.

## Features

List the key features of your application:

 - [X] Account creation on Nostr
 - [X] Add friends from Nostr 
 - [X] Lightning Wallet Connection with NWC
 - [ ] Create groups with friends using Nostr
 - [ ] Add expenses and bills to groups
 - [ ] Settle debts with Zaps using NWC
 - [ ] Off-line sync with Nostr 

## Contributing

Explain how others can contribute to your project:

0. Select the issue you want to work on or create a new one and assign yourself to it.
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/my-feature`).
3. Make changes and commit them (`git commit -am 'Add my feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Create a new Pull Request.

## License

[MIT License](LICENSE)

