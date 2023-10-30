# SplitSats - Technical specifications

# UML Class Diagram
![UML Class Diagram](http://www.plantuml.com/plantuml/png/fLPDRnit4Btlho1oae4QS0_jWK2Rs5QR6aQCnahGWo44r78i4QR83ScrAwVvxrrooT7iqlq0ueErV3Dyd7axCyitFWWN-hrkMYsyPwjEgx0ImPzt7VlIiE7lb1dvyD63u-pcUXaVCgpDUTlQtWJEBXp0ysfvdG6MFU0HJ7WdZDZ6tR_W2YcsplOTEhp55Jf8s1m9bhWevjQQ8DgZn-LatNnjSbeto-iOECs8Hv3znNeZuLuPaDdKENklDBpcPTFl8v3DdqpNRw9n-2dG3luSLWzm6F3VodCsEj3YyD5fpvaFJfdjtJfP_Cu-HOxtjuiJpXwjabMq-M0C-cvWBIphyl121aRiuNMn5nsLxuP0RbumgRtOLk1660EkGfMTGqPrPp_CGTtBinzV0B-lGB6nVPY3pw9RWNjKRHNM4soy2WH6pLRznhTETK5PanLxK4PofaevYZxihFESQUN3tR1_ZRidfObwUq8vR9EgJTk-cvordlO8Las6F_VGGpuo7JBwftyI1Zybj7g6P8g5a1wIjRRvCBA2QTsX2nMU_bcJkkZIWGWW5oSPl51Qpx7B7RGFoNiLHEWz6jv2UAUy7_IDs_o4P0KXw4Y2ubNDN_Hx4bf3uEoFz8j3etUwAq4ZylusGKWww-JCYGrFNqTnNREVs9UlHoM4bDcoQ74oZAbi8UJrnI4sOSxm7aAxomP_PUxjOkxkQTuPmzXw3oxs7aqkJWkwpjEb6Yv8IcTWOiOnINCUtJ3ZkW3_tm1jKqKahiKspz-J8ju8Zqi96ch7h4rQ-OMtRf1pYbuShfPKiWIMj7974dboGF8y3BaE3q7jeOZRoSf2nFb4X2TeccqKtiD-0zCXGFolPF8TP7rrzcf250uTeArpwb44A1uRfNLXZ2rIABNm8QwlbcC4HF88BpQSnLyKl0Apx1H7UR5bIJagSvHs7rinJRyYRUyScFQ0VKO--05hhQvO7nruOiTTAHJSqOa3u5l4m_CUB4EScCGplShgXVeSKj6qXBWcUjTlgjPxEaQZ9LTpAtJRQn4WCMEJfyspYaqjyy5YhlR9_6UkVXoHd6sirKE4lmhjWRmd1r9HpZO1zXjfIM_FcEdWmDFBxC0XGRqI6VgyN9yPJ7nnmY8pcYB9Gl9CXYh7fJ-AdhPb0EtvBL0NWcKfAdwqZ1jkuNCFVXfRrAjS1azFVvwDOLxcSzFGYp3rv6NGLXxpxo0_Nf1hNthXu0p8glQbdmHEhyorBwq2JcT_vJdxmFBPLRgPckaETFN5wL-Ln4mB3RqzyUabgw6f7dFFITVcVqutUKQNLArydD5DVCwfACDpao6Aiv0VHr239v0JFzZniCgATSPBwpM5ipvsPAhnmb5Rte2H_Lx_3G00)
 
# User Stories

## Creating a group
KIND: 50001
Alice want to create a group with Bob and Carol

- 0. Alice press the "+" button for create a new group. Alice fill the form with the group information.
- 1. Alice create a Group object with the group information. 
{
    groupId: "0",
    author: Alice.npub,
    createdAt: Math.floor(Date.now() / 1000),
    updatedAt: Math.floor(Date.now() / 1000),
    name: "Alice's group",
    image: "https://www.example.com/image.png",
    members: [Bob.npub, Carol.npub]
    groupType: = "private" 
    bills: []
    status: "0"
}
- 2. Alice serialize the group and generate the groupID. Then she signs add the sign at the group object with her private key. 
- 3. For each group member Alice send an encrypted direct message using nip-44. E.g 
{
    pubkey: g.author, 
    kinds: [4],
    author: Alice.npub,
    created_at: Math.floor(Date.now() / 1000),
    tags: [ ["p", m] for m in g.members ]
    content: encrypted("50001:JoinGroupEvent.serialize()")
}

## onGroupCreated
Bob has received the group invitation from Alice. He wants to accept the invitation.

1. Bob receive the encrypted message from Alice. He decrypts the message and parse the ":". He gets the event kind and the event content. He found is a new group invitation. Then create a new Group object by deserializing the event content.
2. If Bob accept the invitation he add the group to his group list. If not he ignore the invitation.
3. Bob check if all the group members are in his followers. If not, he add the missing members to his followers.
4. Bob is ready to receive the group bills or generate new ones.
   
## createBill
KIND: 50002
Alice has paid a bill also for Bob and decide to Split the bill on Splitsats. 
0. Alice press the "+" button for create a new bill. Alice fill the form with the bill information.
1. Alice create a Bill object with the bill information. 
{
    billId: "0",
    payer: Alice.npub,
    amount: {amount: 1000, currency: "USD"},
    description: "Dinner at the restaurant",
    date: Math.floor(Date.now() / 1000),
    splitters: [{npub: Alice.npub, split: {amount: 500, currency: "USD"}}, {npub: Bob.npub, split: {amount: 500, currency: "USD"}}]
}
2. Alice serialize the bill and generate the billID. Then she signs add the sign at the bill object with her private key.
3. Alice send an encrypted direct message using nip-44 to the group members.
4. Alice add the bill to the group bills list.

## onBillCreated
Carol has received the bill from Alice. She wants is not in the bill, but she needs to update her group status.
0. Carol receive the encrypted message from Alice. She decrypts the message and parse the ":". She gets the event kind and the event content. She found is a new bill. Then create a new Bill object by deserializing the event content.
1. Carol add the bill to the group bills list.
2. Carol update the group status.
3. Carol check if she has all the bills in the group. If not, she ask for the missing bills.
4. Carol is ready to settle the bills.

## checkGroupStatus
KIND: 50003
Bob has been offline for a while. He wants to check if he has all the bills in the group.
He send a message to the group members asking for the group status.

## onCheckGroupStatus
Alice has received the group status request from Bob. She will send the merkle tree of the group bills to Bob.

## getMissingBills
KIND: 50004
Bob has found that he is missing some bills. By looking at the last status. He will ask the group members for the missing bills.

## onGetMissingBills
Alice has received the missing bills request from Bob. Bob has provided the last status of the group he has. Alice will send the missing bills to Bob from that previous hash. 

## settleBill
KIND: 50005
Bob has recieved a bill from Alice. He finds that the bill is correct and he now own a debt to Alice. He wants to settle the bill.
He press the "Settle" button on the bill.
He pay Alice using a lightning payment to her LNURLp. When came back to the app settle the payment, informing the group members that the bill has been settled.

## onBillSettled
Alice has received the bill settled event from Bob. She will update the debt manager and the group status.


- Creazione nuova bill
- Richiesta di stato del gruppo e sincronizzazione
- Richiesta di bill mancanti
- Settlement con Nostr
- Aggiungere setting per nostr e vari 
