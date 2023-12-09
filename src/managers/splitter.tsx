import { Coin } from './coin'; // Import Coin class if it's in a separate file

export class Splitter {
  npub: string;
  split: Coin;

  constructor(npub: string, split: Coin) {
    this.npub = npub;
    this.split = split;
  }
}
