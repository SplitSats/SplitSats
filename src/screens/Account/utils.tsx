
export function generateRandomHumanReadableUserName(length: number): string {
    // TODO: Use bip39 to generate a random username
    const words = ['apple', 'banana', 'cherry', 'dog', 'elephant', 'fox', 'grape', 'honey', 'iguana', 'jelly', 'kiwi', 'lemon', 'mango', 'nut', 'orange', 'pear', 'quokka', 'rabbit', 'strawberry', 'tiger', 'unicorn', 'violet', 'watermelon', 'xylophone', 'zebra'];
    let userName = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      userName += words[randomIndex];
    }
    userName += Math.floor(Math.random() * 100);
  
    return userName;
  }
  