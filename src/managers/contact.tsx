import { IProfileContent } from '@model/nostr';
import { instanceToPlain, plainToInstance } from 'class-transformer'; // Import necessary serialization libraries

class ContactManager {
  contacts: Record<string, Contact>;

  constructor() {
    this.contacts = {};
  }
  
  public static fromJSON(json: any): ContactManager {
    const manager = plainToInstance(ContactManager, json); // Deserialize JSON to ContactManager instance
    return manager;
  }
  
  toJSON(): any {
    return instanceToPlain(this); // Serialize ContactManager instance to JSON
  }

  public addContact(contact: Contact): void {
    this.contacts[contact.npub] = contact;
  }

  public getContactByNpub(npub: string): Contact | undefined {
    return this.contacts[npub];
  }

  fetchContactsInfo(): void {
    // Logic to fetch contacts' information
  }

  public async getContacts(): Promise<Contact[]> {
    try {
      const contacts = Object.values(this.contacts);
      return contacts;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

class Contact {
  username: string;
  npub: string;
  profile: IProfileContent;

  constructor(username: string, npub: string, profile: IProfileContent) {
    this.username = username;
    this.npub = npub;
    this.profile = profile;
  }

  public static fromJSON(json: any): Contact {
    const contact = plainToInstance(Contact, json); // Deserialize JSON to Contact instance
    return contact;
  }

  toJSON(): any {
    return instanceToPlain(this); // Serialize Contact instance to JSON
  }


  updateProfileField(key: string, value: string | undefined): void {
    this.profile[key] = value;
  }
  
  getProfileField(key: string): string | undefined {
    return this.profile[key];
  }
}

export { ContactManager, Contact };
