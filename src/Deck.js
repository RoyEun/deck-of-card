// Dictionary defined for Card Class
const suits = ['Spades','Hearts','Clubs','Diamonds', 'Joker'];
const values = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Joker'];

class Deck {
  constructor(joker) {
    this.deck = [];
    this.dealtCards = [];
    this.openDeck(joker);
  }
// If joker argument is passed in, the deck will be instantiated with 2 Jokers included.
  openDeck(joker) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 13; j++) {
        let currentCard = new Card(i, j);
        this.deck.push(currentCard);
      }
    }
    if (joker) {
      let k = 0;
      while (k < 2) {
        let currentCard = new Card(4, 13);
        this.deck.push(currentCard);
        k++;
      }
    }
  }
  shuffleDeck() {
    // Assuming that decks are only shuffled when a game ends and players will return all cards back to the deck.
    if (this.dealtCards.length > 0) {
      this.deck = this.deck.concat(this.dealtCards);
      this.dealtCards = [];
    }
    // shuffle defined below using Fisher-yates-shuffle
    shuffle(this.deck);
  }
  deal() {
    // Using last item in the array as dealt card for O(1) deletion using pop. 
    let dealtCard = this.deck[this.deck.length-1];
    this.dealtCards.push(dealtCard);
    return this.deck.pop();
  }
};

class Card {
  constructor(suit, value) {
    this.suit = suits[suit];
    this.value = values[value];
  }
};

class Hand {
  constructor() {
    this.hand = [];
    this.cardCount = this.hand.length;
  }
  clear() {
    this.hand = [];
  }
  addCard(card) {
    this.hand.push(card);
  }
  removeCard(position) {
    if (this.hand[position]) {
      return this.hand.splice(position, 1);
    }
    return 'does not have card in that position';
  }
};

// https://www.developphp.com/video/JavaScript/Fisher-Yates-Shuffle-Modern-Algorithm-Array-Programming-Tutorial
const shuffle = (arr) => {
  let i = arr.length, j, temp;
    while(--i > 0){
      j = Math.floor(Math.random() * (i+1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
};