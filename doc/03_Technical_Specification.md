# SplitSats - Technical specifications

# ClassDiagram

class NDKUser {
    public ndk: NDK | undefined;
    public profile?: NDKUserProfile;
    private _npub?: Npub;
    private _hexpubkey?: Hexpubkey;
    readonly relayUrls: string[] = [];
}

class UserApp {
    ndkUser: NKDUser
    lnAccount: BreezSDK 
    groupManager: GroupManager
    debtManager: DebtManager
    contactManager: ContactManager
}

class Group:
    author: str (npub of user who created the group)
    createdAt: datetime (time of creation)
    group_name: str (name of the group)
    group_image: str (image url of the group)
    members: list[str] (list of members in the group)
    group_id: str = "0" (hash of the serialized group object)
    group_type: str = "private" (private or public)
    bills: list[Bill] (list of bills in the group)

    def serialize(self):
        return json.dumps(self.__dict__)

class GroupManager:
    groups: dict[str, Group] = {}
    ndkUser: NDKUser

    functions:
        - createGroup(g: Group)
        - onCreateGroup
        - getGroups
        - getGroupByID


class Coin: 
    - amount: int (amount of the bill)
    - currency: str (currency of the bill)
    

class Bill:
    - payer: str (npub of the user who paid the bill)
    - amount: Coin (bill price and currency)
    - description: str (description of the bill)
    - date: datetime (date of the bill)
    - splitters: list[str] (list of npubs of the users who split the bill)

class Splitter:
    - npub: str (npub of the user)
    - split: Coin (bill price and currency)
    

class Debt:
    owner: str (npub of the user who owns the debt) # I have to pay him
    amount: Coin (amount of the debt)
    settled: bool = False (if the debt is settled or not)

class Credit: 
    creditor: str (npub of the user who owns the credit) # He has to pay me
    amount: Coin (amount of the credit)
    settled: bool = False (if the credit is settled or not)

class AccountingManager:
    credits: dict[str, Credit] = {}
    debts: dict[str, Debt] = {}
    ndkUser: NDKUser

    functions:
     - addCredit(c: Credit)
     - addDebt(d: Debt)
     - getDebts
     - getCredits
     - getDebtByID
     - getCreditByID
     - settleDebt(d: Debt)
     - settleCreditRequest(c: Credit) 
  


class ContactManager:
    contacts: dict[str, Contact] = {}
    ndkUser: NDKUser

    functions:
        - addContact(c: Contact)
        - getContacts // Fetch contact from nostr
        - getContactByID


# Nostr Events for SplitSats

## CreateNewGroup:
Alice want to create a group with Bob and Carol

- 0. Alice create a new Group object


- 1. Alice create a JoinGroup event

JoinGroupEvent(g: Group): 
{
    group_id: g.group_id,
    pubkey: g.author, 
    created_at: Math.floor(Date.now() / 1000),
    tags: [
        ["p", m] for m in g.members
    ]

}
- 2. Alice sign the JoinGroup event with her private key. Alice serialize the JoinGroupEvent to a string
- 3. Alice creates an EncryptedDirectMessage to Bob and Carol with the serialized JoinGroupEvent as the content. 


## GroupSubscription:

Bob subscribe to kind: 4 events from followrs