import { IProfileContent } from '@model/nostr';
import { DebtManager } from './debt';
import { NDKUser } from '@nostr-dev-kit/ndk';
import * as Crypto from 'expo-crypto';

class GroupManager {
    private groups: Record<string, Group>;
    // private ndkUser: NDKUser;
    private debtManager: DebtManager;

    constructor() {
      this.groups = {};
      // this.ndkUser = {}; // TODO: Initialize the NDKUser object
      this.debtManager = new DebtManager();
    }
    
    addGroup(group: Group): void {
      // Logic to add a group
      if (group.groupId in this.groups) {
        throw new Error("Group already exists");
      }
      this.groups[group.groupId] = group;
    }
  
    deleteGroup(groupId: string): void {
      // Logic to delete a group by its ID
      delete this.groups[groupId];
    }
  
    getGroups(sortBy: string): Group[] {
      // Logic to retrieve groups, potentially sorted based on a parameter
      return Object.values(this.groups);
    }

    hasGroups(): boolean {
      return Object.keys(this.groups).length > 0;
    }
  
    getGroupByID(groupId: string): Group | undefined {
      // Logic to retrieve a group by its ID
      return this.groups[groupId];
    }

  }
  
  class Group {
    // Define Group class properties based on the UML diagram
    private author: string;
    private createdAt: Date;
    private updatedAt: Date;
    private name: string;
    private image: string;
    private members: string[];
    private groupId: string = "0";
    private groupType: string = "private";
    private bills: Bill[];
    private lastBillID: string;
  
    constructor(author, groupName, groupImage, members, groupType) {
      this.author = author || '';
      this.name = groupName || '';
      this.image = groupImage || '';
      this.members = members || [];
      this.groupType = groupType || 'private';
      this.bills = [];
      this.lastBillID = '';
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
    // Add methods specific to the Group class if needed
  
    public async createId(): Promise<string> {
      const groupData = this.toJSON();
      const groupDataJSON = JSON.stringify(groupData);
      const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        groupDataJSON
      );
      // We use the first 32 bytes as group ID
      const groupID = digest.slice(0, 32);
      this.groupId = groupID; // Update the groupId property directly using "this"
      return groupID;
    }

    public toJSON(): Record<string, unknown> {
      return {
        author: this.author,
        name: this.name,
        image: this.image,
        members: this.members,
        groupType: this.groupType,
        createdAt: this.createdAt.toJSON(), // Serialize createdAt date in ISO format
        updatedAt: this.updatedAt.toJSON(), // Serialize updatedAt date in ISO format
        groupId: this.groupId,
      };
    }
  }

  

  // Define other necessary classes and interfaces as per your application requirements

  export { GroupManager, Group };