# Project Proposal 
# SplitSats - Expense sharing App using bitcoin for instant settlement

SplitSats is a proof of concept application that aims to provide users with an easy way to share expenses and settle debts instantly using bitcoin. The React Native app will utilize Breez SDK as an underlying stack and Nostr for user profiles and payment contacts. Users will be able to add expenses manually or automatically, by scanning fiscal receipts, enabling them to itemize expenses and assign them to appropriate contacts (friends), to tabulate amounts owing by each group member. Artificial intelligence API will be implemented for receipt scanning to extract itemized lists within the app.
The app will be developed in phases, each focusing on a specific aspect of the app's functionality. We will be aiming to develop several different libraries and demo applications in each of the phases. End-goal is to attempt to unify all those efforts into a single app - SplitSats.

### Project Objectives

The main objectives of this project are as follows:
1. Foster a community of builders where people can gather, learn, and create together, as well as document and share their learnings with others.
2. Develop four proof of concept apps that will explore different aspects of SplitSats:
    a. Nostr key generation app;
    b. Profile and Contact list;
    c. Calculation Logic App and Itemization App;
    d. AI - OCR-powered expense scanning app;
3. Test and evaluate the technologies used in each phase, including Nostr, Breeze SDK, and OpenAI, in order to identify strengths, weaknesses, and opportunities for improvement and create content around these technologies;
4. Integrate the code developed in each phase to create a SplitSats - Bitcoin Expense Sharing and Settlement App that will allow users to securely generate and store their own keys, create contact lists and share metadata with others, manage a lightning network wallet for basic operations, and easily scan and itemize expenses for easy splitting and sharing.

### Project Scope:

The scope of this project includes the following:

**Phase 1: Nostr Key Generation App**  
The first phase will focus on developing a proof of concept react-native app that allows users to generate a private/public keypair. The app will warn users to securely back up their keys using a secure backup and to keep them secret. The app will allow users to sign in with their existing keys, if they already have ones. We plan to utilize the generated keys to retrieve user info, LN Address and contacts, which will be utilized in phases 2 and 3.

**Phase 2: Profile and Contacts List App**  
The second phase will focus on creating another proof of concept app that utilizes the keys generation app mentioned in phase 1 as a foundation. The app will enable users to create or retrieve their account metadata, contacts list and share metadata with their contacts. The technologie we plan to use for this phase is Nostr, so all the messages are sent and received from the clients connected.

**Phase 3: Calculation Logic App and Itemization App**  
In the third phase, we will develop another proof of concept app that will focus on exploring the logic behind expense sharing and different methods for splitting expenses (calculation). The goal of this app will be to allow users to create new expenses voices, the total of which must be divided among the added contacts:
- in equal parts;
- in unequal parts;
- by percentage;
- by shares.
Contacts and contact lists from the phase 2 app will be utilized for friends to settle payments with each other by using [Nostr zap](https://github.com/nostr-protocol/nips/blob/master/57.md) mechanism.

**Phase 4: Open AI API Bill Scanning**
In phase 4, we will develop a proof of concept app that utilizes the Open AI API to explore how users can scan bills and add expenses easily. The app will enable users to assign expenses (transactions) to each other, by selecting who to split with from their contact list.


## Final Product:
The final product will be a proof of concept app that incorporates all the separate efforts from each phase of development. The app will utilize the nostr key generation, profile metadata, contact list, lightning network, manual or Open AI API bill scanning and itemization, and expense sharing and splitting calculation logic proof of concept apps. By utilizing the code from each phase, we hope to create a seamless experience for users when sharing and settling expenses using bitcoin as an underlying technology.

## Deliverables:
The deliverables for this project include the following:
- A fully-functional proof of concept application that allows users to create a nostr profile with a LNURL associated, add contacts, and share expenses.
- A feature that enables users to scan fiscal digital receipt and itemize products to their contacts.
- A feature that enables users to settle expenses using Lightning Network.

Conclusion:
The SplitSats app is an innovative and user-friendly way for users to share expenses and settle debts using Bitcoin and Lightning Network. By utilizing Breez SDK, Nostr, AI - OCR-powered the app offers an easy way to share expenses with friends and settle them as fast as the lightning.
