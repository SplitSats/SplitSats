import { IProfileContent } from '@model/nostr';

class ContactManager {
  contacts: Record<string, Contact>;

  constructor() {
    this.contacts = {};
  }

  addContact(contact: Contact): void {
    this.contacts[contact.npub] = contact;
  }

  getContactByNpub(npub: string): Contact | undefined {
    return this.contacts[npub];
  }

  fetchContactsInfo(): void {
    // Logic to fetch contacts' information
  }

  getContacts(): Contact[] {
    return Object.values(this.contacts);
  }
}

class Contact {
  username: string;
  npub: string;
  profile: IProfileContent;

  constructor(username: string, npub: string, profile: IProfileContent) {
    this.username = username;
    this.npub = npub;
    // this.profile = profile instanceof IProfileContent ? profile : new IProfileContent();
    this.profile = profile;
  }

  updateProfileField(key: string, value: string | undefined): void {
    this.profile[key] = value;
  }
  
  getProfileField(key: string): string | undefined {
    return this.profile[key];
  }
}

export { ContactManager, Contact };