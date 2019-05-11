/*
PIG-DICE GAME RULES:
- The game has 2 players, playing in rounds
- On each turn, a player rolls the dice as many times as they wish. Each result gets added to their ROUND score
- If a player rools a 1, all of their ROUND score is lost & it is the next player's turn
- The player can choose to 'Hold' which means that their ROUND score will be added to their GLOBAL score & then it is the next player's turn
- The first player to reach a GLOBAL score of 100 points wins the game
********************
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

// Declare variables
var scores, roundScore, activePlayer, dice, dice2, gamePlaying, previousRoll, previousRoll2, maxScore;

// Initialize game
init();

// Set winning score to 100 (only on page load)
maxScore = 100;

// Change the CSS of a selected element
document.querySelector('.dice').style.display = 'none';
document.querySelector('.dice2').style.display = 'none';

// A callback function is a function that is passed to another function (btn in this case, notice there is no '()' bc the name is just passed to the listener)
// An anonymous function has no name and cannot be reused, but is useful since this is the only 'roll-dice' button we need

// Button Event Handler for rolling dice
document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    // Random number is rolled for each dice
    dice = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;

    // Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'img/dice-' + dice + '.png';
    var dice2DOM = document.querySelector('.dice2');
    dice2DOM.style.display = 'block';
    dice2DOM.src = 'img/dice-' + dice2 + '.png';

    // Check that there was not a one rolled on either dice
    // Also check that there was not a 6 rolled if the previous roll(s) were a 6
    if (
      (dice !== 1 && dice2 !== 1 && previousRoll !== 6 && previousRoll2 !== 6) ||
      (dice !== 1 && dice !== 6 && (dice2 !== 1 && dice2 !== 6) && (previousRoll === 6 || previousRoll2 === 6))
    ) {
      // Update score with dice value & display user's total score
      roundScore = roundScore + dice + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
      previousRoll = dice;
      previousRoll2 = dice2;
      displayRollValues();
    } else {
      displayRollValues();
      // Next player's turn
      nextPlayer();
    }
  }
});

function displayRollValues() {
  // Display the previous roll values
  if (activePlayer === 0) {
    document.querySelector('.previous-rolls-box').style.left = '265px';
  } else {
    document.querySelector('.previous-rolls-box').style.left = '827px';
  }
  document.querySelector('.previous-rolls-text').textContent = 'Dice1: ' + dice + ' // Dice2: ' + dice2;
  document.querySelector('.previous-rolls-box').style.display = 'block';
}

function checkForWinner() {
  if (scores[activePlayer] >= maxScore) {
    document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    gamePlaying = false;
  } else {
    // Next player's turn
    nextPlayer();
  }
  return;
}

// Button event handler for holding score
document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    // Add current score to player's global score
    scores[activePlayer] += roundScore;
    // Update UI to reflect score changing
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    checkForWinner();
  }
});

// Update the maxScore and start a new game
function updateMaxScore(event) {
  event.preventDefault();
  maxScore = document.getElementById('max-score-input').value;
  init();
}
// Event handler for the score input submit btn
const form = document.getElementById('input-form');
form.addEventListener('submit', updateMaxScore);

function nextPlayer() {
  // Next player's turn - initialize values for new round
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  previousRoll = 0;
  previousRoll2 = 0;
  document.querySelector('#current-' + activePlayer).textContent = 0;
  // Reset current scores to zero
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  // Toggle active player panel color
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  // Hide the dice image
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
}

// Button event handler for new game
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  // Initialize game values
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  previousRoll = 0;
  previousRoll2 = 0;
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
  document.querySelector('.previous-rolls-box').style.display = 'none';
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
/*
 ***** 
 Modal Functions and Handling
 *****
*/
// Grab the modal
var modal = document.getElementById('info-modal');
// Get the button that opens the modal
var modalBtn = document.querySelector('.btn-how2play');
// Get the <span> element that closes the modal
var closeModalBtn = document.querySelector('.close');
// Open modal when the button is clicked
modalBtn.addEventListener('click', function() {
  modal.style.display = 'block';
});
// Close modal when 'x' is clicked
closeModalBtn.addEventListener('click', function() {
  modal.style.display = 'none';
});
// Close modal when user clicks outside the modal itself
window.addEventListener('click', function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});

/*
********************
LEARNING NOTES
********************
// Change the selected element's text
document.querySelector('#current-' + activePlayer).textContent = dice;
// Change the selected element's actual HTML
document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
// Reading text value of an element and storing to a variable
var x = document.querySelector('#score-0').textContent;
/console.log(x);
// Add / remove classes
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.add('active');

*/
