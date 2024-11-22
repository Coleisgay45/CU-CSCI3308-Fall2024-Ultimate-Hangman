console.log('client.js loaded');

// Global variables for game state
let currentWord = ''; // The current word to be guessed
let correctGuesses = []; // Array to track correctly guessed letters
let guessedLetters = []; // Array to track all guessed letters
let errorCount = 0; // Number of incorrect guesses

// Function to initialize the game
function initializeGame() {
  // Get the hidden word from the DOM
  let word = document.getElementById('wordToMatch').innerText;

  // Initialize game variables
  currentWord = word; // Set the current word to the hidden word
  correctGuesses = new Array(currentWord.length).fill(false); // Create an array to track guessed letters
  guessedLetters = []; // Reset the array of guessed letters
  errorCount = 0; // Reset the error count

  // Reset the display to show underscores for unguessed letters
  displayLetters();

  // Clear any messages from the previous game
  document.getElementById('guessMessage').textContent = '';

  // Re-enable all buttons on the keyboard
  document.querySelectorAll('.Keyboard button').forEach((btn) => {
    btn.disabled = false; // Enable the button
    btn.style.backgroundColor = ''; // Reset the button's background color
  });

  // Hide the reveal word section from the previous game
  document.getElementById('revealWord').style.display = 'none';
  document.getElementById('correctWord').textContent = ''; // Clear the revealed word
}

// Event listener to handle keyboard input
document.addEventListener('keydown', function (event) {
  const letter = event.key.toUpperCase(); // Get the pressed key and convert it to uppercase

  // Check if the key is a valid letter (A-Z)
  if (letter >= 'A' && letter <= 'Z') {
    // Find the corresponding button for the letter
    const button = document.querySelector(`button[onclick="checkGuess('${letter}', this)"]`);
    if (button) {
      checkGuess(letter, button); // Call the checkGuess function with the guessed letter
    }
  }
});

// Function to display the current state of the word (underscores and correct guesses)
function displayLetters() {
  const display = currentWord
    .split('') 
    .map((letter, index) => (correctGuesses[index] ? letter : '_')) 
    .join(' ');

  // Update the display on the webpage
  document.getElementById('lettersDisplay').textContent = display;
}

// Function to handle letter guesses
function checkGuess(guess, button) {
  console.log('checkGuess called', guess); // Debug: Log the guessed letter

  // Check if the letter has already been guessed
  if (guessedLetters.includes(guess)) {
    return; // Ignore repeated guesses
  }

  // Add the guessed letter to the list of guessed letters
  guessedLetters.push(guess);

  // Disable the button to prevent re-clicking
  button.disabled = true; 
  button.style.backgroundColor = '#d3d3d3'; // Change button color to indicate it was clicked

  let correctGuess = false; // Track whether the guess was correct

  // Check if the guessed letter is in the word
  for (let i = 0; i < currentWord.length; i++) {
    if (currentWord[i].toUpperCase() === guess.toUpperCase()) {
      correctGuesses[i] = true; // Mark the position as correctly guessed
      correctGuess = true; // Indicate the guess was correct
    }
  }

  // Display appropriate message based on correctness
  if (correctGuess) {
    console.log('Correct guess:', guess); // Debug: Log the correct guess
    document.getElementById('guessMessage').innerText = 'Correct!';
  } else {
    errorCount++; // Increment the error count for incorrect guesses
    document.getElementById('guessMessage').innerText = 'Incorrect!';
  }

  // Update the word display with correct letters and underscores
  displayLetters();

  // Check for game win or loss conditions
  if (correctGuesses.every(Boolean)) { // If all letters are guessed
    document.getElementById('guessMessage').innerText = 'You win!'; // Display win message
  } else if (errorCount >= 6) { // If error count reaches 6
    document.getElementById('guessMessage').textContent = 'Game over!'; // Display loss message
    document.getElementById('revealWord').style.display = 'block'; // Reveal the correct word
    document.getElementById('correctWord').textContent = currentWord; // Show the correct word
  }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
  initializeGame(); // Call initializeGame to set up the initial game state
  
});
//By using DOMContentLoaded, the code ensures that all elements needed for the game (like buttons, displays, or hidden elements) are available before trying to manipulate them.
//Without this, the initializeGame() function might run too early, causing errors if the DOM isn't fully loaded yet.
