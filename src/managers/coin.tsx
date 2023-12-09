export class Coin {
    amount: number;
    currency: string;
  
    constructor(amount: number, currency: string) {
      this.amount = amount;
      this.currency = currency;
    }
  
    // Method to update the amount of the coin
    updateAmount(newAmount: number): void {
      this.amount = newAmount;
    }
  
    // Method to update the currency of the coin
    updateCurrency(newCurrency: string): void {
      this.currency = newCurrency;
    }
  
    // Other methods related to handling coin amounts or currency
  }
  