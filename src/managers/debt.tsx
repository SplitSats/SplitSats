import { IProfileContent } from '@model/nostr';
import { Coin } from './coin'; 
import { Bill } from './bill'; 

class DebtTo {
  owner: string;
  amount: Coin;
  settled: boolean = false;
  createdAt: string = new Date().toISOString();

  constructor(owner: string, amount: Coin) {
    this.owner = owner;
    this.amount = amount;
  }
  // ... other methods as needed
}

class CreditTo {
  creditor: string;
  amount: Coin;
  settled: boolean = false;
  createdAt: string = new Date().toISOString();

  constructor(creditor: string, amount: Coin) {
    this.creditor = creditor;
    this.amount = amount;
  }
  // ... other methods as needed
}

class DebtManager {
  private credits: Record<string, CreditTo> = {};
  private debts: Record<string, DebtTo> = {};

  addBill(bill: Bill): void {
    // Logic to add a bill and update credits and debts
    // ...
  }

  addCredit(credit: CreditTo): void {
    this.credits[credit.creditor] = credit;
    // ...
  }

  addDebt(debt: DebtTo): void {
    this.debts[debt.owner] = debt;
    // ...
  }

  getDebts(): Record<string, DebtTo> {
    return this.debts;
  }

  getCredits(): Record<string, CreditTo> {
    return this.credits;
  }

  getDebtByID(debtId: string): DebtTo | undefined {
    return this.debts[debtId];
  }

  getCreditByID(creditId: string): CreditTo | undefined {
    return this.credits[creditId];
  }

  settleDebt(debt: DebtTo): void {
    debt.settled = true;
    // ...
  }

  settleCreditRequest(credit: CreditTo): void {
    credit.settled = true;
    // ...
  }

  // ... other methods and logic related to managing debts
}

export { DebtTo, CreditTo, DebtManager };