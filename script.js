//
// Blackjack Game App:
// by Vanessa Tsang on  October 2019.

// Card variables:
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack',
        'Ten', ' Nine', 'Eight', 'Seven', 'Six',
        'Five', 'Four', 'Three', 'Two' ];

// DOM variables:
let textArea = document.getElementById('text-area'),
  newGameButton = document.getElementById('new-game-button'),
  hitButton = document.getElementById('hit-button'),
  stayButton = document.getElementById('stay-button');

// Game variables:
let gameStarted = false,
  gameOver = false,
  playerWon = false,
  dealerCards =[],
  plyerCards =[],
  dealerScore = 0,
  playerScore = 0,
  deck = [];

// At the start of the game, both the Hit! and Stay buttons will be hidden:
hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

// A handler for when new player hits the new game button:
newGameButton.addEventListener('click', function(){
  gameStarted = true;
  gameOver = false;
  playerWon = false;

  // We call shuffleDeck, passing it the deck:
  deck = createDeck();
  shuffle(deck);
  dealerCards = [ getNextCard(), getNextCard() ];
  playerCards = [ getNextCard(), getNextCard() ];

// Remove and Add Elements to the DOM. Handler for new game button:
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  showStatus();
});

// The hit button. Player wants another card, so we'll call: getNextCard and push that onto playerCards (right to left):
hitButton.addEventListener('click', function() {
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

// The stay button. We are done taking cards:
stayButton.addEventListener('click', function() {
  gameOver = true; // The game is over, so gameOver is: true.
  checkForEndOfGame();
  showStatus(); // Update our text area.
});

// Creating a Deck using a createDeck function which is a local variable since its inside this function:
function createDeck() {
    for(suitIdx = 0; suitIdx < suits.length; suitIdx++) {
// Loop through all the values, using another for-loop (nested loops):
        for(let valueIdx = 0; valueIdx < values.length; valueIdx++) {
// A card object with suit property and value property:  
          let card = { 
                suit: suits[suitIdx],
                value: values[valueIdx]
            };
// Push the above card onto the deck! Our deck is now an array: 
            deck.push(card); 
        }
    }
    return deck; 
}

// A function to shuffle the cards. The letter 'i' is just a random variable used to get a random card:
function shuffle(deck) {
  for (let i = 0; i < deck.length; i++) { // iterative loop.
    let swapIdx = Math.trunc (Math.random() * deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp;
  }
}

// A new function to print out the card:
function getCardString(card) {
    return card.value + ' of ' + card.suit; 
}

function getNextCard() {
    return deck.shift()
}

// A big switch statement. Will return the value of the card between an Ace and 10 for a 10, Jack, Queen or King.
// We pass it the: card as our argument:
function getCardNumberValue(card) {
  switch (card.value) {
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
// If card value is equal to 10, Jack, Queen or King, that'll get caught by this default block and will return 10:
    default: 
      return 10;                  
  }
}
// We are passing it an array of cards and we initialise the score to 0:
// A flag named: hasAce. Its important to know if the player has an Ace or not:
// looping through all the cards. As long as: 'i' is less than cardArray.length, we'll execute this block of code:
function getScore(cardArray) {
  let score = 0;
  let hasAce = false; 
   for (let i = 0; i < cardArray.length; i++) {
     let card = cardArray[i]; // Assigning: i to the variable: card.
     score += getCardNumberValue(card); // Calling: getCardNumbericValue and passing it the card (argument), we get back the value of that card, we add that to the: score (variable) which will increment (++) as each card is read.
     if(card.value === 'Ace') {
       hasAce = true;
     }
   }
   
// Before we return the: score, we check that if: hasAce is true? The opporator: &&, checks the 2 different conditions and both must equal to 'true':   
   if (hasAce && score + 10 <= 21) { 
     return score + 10;
   }
 // Returning the: score.
 // This is how we get the score out of the function named: getScore:   
   return score;
}

// To get the dealerScore, we are passing it the: dealerCards. Same idea for the: playerScore:
function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function checkForEndOfGame() {
    
// Calling: updateScores as we want to make sure the scores are current:
    updateScores();

// Checking if the game is over. If so, we give the dealer the option to take card(s):
//     
    if (gameOver) {
// let dealer take cards
      while(dealerScore < playerScore
          && playerScore <= 21
          && dealerScore <= 21) {
        dealerCards.push(getNextCard()); // give the dealer a new card.
        updateScores(); // Again, update the score.   
          }
    }

    if (playerScore > 21 ) {
      playerWon = false;
      gameOver = true;
    }
    else if (dealerScore > 21) {
      playerWon = true;
      gameOver = true;
    }
    else if (gameOver) {
      if (playerScore > dealerScore) {
        playerWon = true;
      }
      else {
        playerWon = false;
      }
    }
}

// when game not started, return the below message, which is a string:
function showStatus() {
  if (!gameStarted) { 
    textArea.innerText = 'Welcome to Blackjack!';
    return;
  }

// The deck length at the start is 52 (as 52 cards at the start). The '\n' means: printout each card on new line:
// A variable named: dealerCardString and its a string form of all the dealer's cards.
// We loop through the dealer cards and for each card we append the string version of the card along with a new line character:
  let dealerCardString = '';
  for (let i=0; i < dealerCards.length; i++) {
    dealerCardString += getCardString(dealerCards[i]) + '\n'
  }
 
 // Same idea as the above dealerCardString but for the player:  
  let playerCardString = '';
  for (let i=0; i < playerCards.length; i++) {
    playerCardString += getCardString(playerCards[i]) + '\n';
  }

  updateScores();

// Changing our: innerText for our textArea. We show what Dealer has, with a new line, our: dealerCardString,
// then we show: score + dealerScore, + a few blank lines. So we get this whole area to print out:
// Adding: playerScore, done same way as the: dealerScore:
textArea.innerText =
    'Dealer has:\n' +
    dealerCardString +
    '(score: '+ dealerScore + ')\n\n' +
    
    'Player has:\n' +
    playerCardString +
    '(score: '+playerScore +')\n\n';

// Checking for gameOver. If the game is over we want to print out a message who won.
// If the player won we'll show YOU WIN!
// else that means the dealer has won, so will print out: DEALER WINS.
// if the game's over, we want to show the New Game! button and hide the Hit! and Stay buttons:

   if (gameOver) {
      if (playerWon) {
        textArea.innerText += "YOU WON!";
      }
      else {
        textArea.innerText += "DEALER WINS!";
      }
      newGameButton.style.display = 'inline';
      hitButton.style.display = 'none';
      stayButton.style.display = 'none';
    };
};       