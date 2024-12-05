console.log('client.js loaded');

// Global variables for game state
let currentWord = ''; // The current word to be guessed
let correctGuesses = new Array(currentWord.length).fill(false); // Array to track correctly guessed letters
let guessedLetters = []; // Array to track all guessed letters
let errorCount = 0; // Number of incorrect guesses




// function test(db, username){
//   db.any(username)
//   .then((rows) => {
//     newScore = rows[0].easy_high_score + 1;
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// }

function setTheme(theme) // TODO: fix so that styling applies to all pages
{
    const body = document.body;
    if (theme === 'Light') 
    {
      body.setAttribute('data-bs-theme', 'light');
    } 
    else if (theme === 'Dark') 
    {
      body.setAttribute('data-bs-theme', 'dark');
    }

    // local storage allows you to save stuff so im saving the theme into localstorage
    localStorage.setItem('theme', theme);
}

// this function loads and applys the theme that was selected to a page when its loaded
function loadTheme() 
{
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) 
    {
      setTheme(savedTheme);
    }
}

// you have to call the loadTheme function whenever scrtip.js is loaded so the theme will apply to each page
loadTheme();
console.log('load theme called');

// Function to initialize the game
function initializeGame() 
{
  // Get the hidden word from the DOM
  let element = document.getElementById('wordToMatch');
  if (element !== null) {
    let word = element.innerText;   //let word = document.getElementById('wordToMatch').innerText;
  
    // TODO: update userscore in leaderboard

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
}

// Event listener to handle keyboard input
// document.addEventListener('keydown', function (event) {
//   const letter = event.key.toUpperCase(); // Get the pressed key and convert it to uppercase

//   // Check if the key is a valid letter (A-Z)
//   if (letter >= 'A' && letter <= 'Z') 
//   {
//     // Find the corresponding button for the letter
//     const button = document.querySelector(`button[onclick="checkGuess('${letter}', this)"]`);
//     if (button) 
//     {
//       checkGuess(letter, button); // Call the checkGuess function with the guessed letter
//     }
//   }
//   loadTheme(); //might change **
//   console.log('load theme called into event listener');
// });

// function setDifficulty(level) // TODO: need to decide which word lengths correlate with which difficulty?
// {
//   console.log('this function is called');
//     if (level == 'Easy'){
//     }

//     else if (level == 'Medium'){

//     }
//   }
  
// Function to display the current state of the word (underscores and correct guesses)
function displayLetters() 
{
  const display = currentWord
    .split('') 
    .map((letter, index) => (correctGuesses[index] ? letter : '_')) 
    .join(' ');

  // Update the display on the webpage
  document.getElementById('lettersDisplay').textContent = display;
}

// Function to handle letter guesses
function checkGuess(guess, button) 
{
  guess = guess.toUpperCase();
  console.log('checkGuess called', guess); // Debug: Log the guessed letter

  // Check if the letter has already been guessed
  if (guessedLetters.includes(guess)) 
  {
    return; // Ignore repeated guesses
  }
  // Add the guessed letter to the list of guessed letters
  guessedLetters.push(guess);

  // Disable the button to prevent re-clicking
  button.disabled = true; 
  button.style.backgroundColor = '#d3d3d3'; // Change button color to indicate it was clicked

  let correctGuess = false; // Track whether the guess was correct

  if ((currentWord.toUpperCase()).includes(guess))
  {
  // Check if the guessed letter is in the word
    for (let i = 0; i < currentWord.length; i++) 
    {
      if (currentWord[i].toUpperCase() === guess) 
      {
        correctGuesses[i] = true; // Mark the position as correctly guessed
        correctGuess = true; // Indicate the guess was correct
      }
    }
  }

  // Display appropriate message based on correctness
  if (correctGuess) 
  {
    console.log('Correct guess:', guess); // Debug: Log the correct guess
    document.getElementById('guessMessage').innerText = 'Correct!';
    document.getElementById('guessMessage').style.color = 'green';
  } 
  else 
  {
    errorCount++; // Increment the error count for incorrect guesses
    document.getElementById('guessMessage').innerText = 'Incorrect!';
    document.getElementById('guessMessage').style.color = 'red';
    console.log("script.js is loaded");
    updateHangmanImage(errorCount);
  }

// <<<<<<< HEAD
//   if (correctGuesses.every(val => val)) 
//   {
//     document.getElementById('guessMessage').innerText = 'You win!';
//     window.location.href = '/gameover?result=win';
// =======
  // Update the word display with correct letters and underscores
  displayLetters();

  // Check for game win or loss conditions
  if (correctGuesses.every(Boolean)) 
  { // If all letters are guessed
    console.log(correctGuesses);
    console.log(currentWord);
    for (let i = 0; i < correctGuesses.length; i++) {
      console.log(correctGuesses[i]); // Access each value by index
      console.log('inside for loop');
    }
    console.log('end of for loop');    
    document.getElementById('guessMessage').innerText = 'You win!'; // Display win message
    window.location.href = `/gameover?result=win&correctWord=${currentWord}`;

  } 
  else if (errorCount >= 6) 
  {  // if error count reaches 6
    document.getElementById('guessMessage').textContent = 'Game over!'; // Display loss message
    document.getElementById('revealWord').style.display = 'block'; // Reveal the correct word
    document.getElementById('correctWord').textContent = currentWord; // Show the correct word
    window.location.href = `/gameover?result=lose&correctWord=${currentWord}`;
  }
}

function updateHangmanImage(errorCount) {
    const image = document.getElementById('hangman-image');
    // Update the image source based on the error count
    image.src = `img/hangman-${errorCount}.svg`;
    console.log('Updated hangman image to:', image.src);
  }
// initialize the game when the page loads

document.addEventListener('DOMContentLoaded', function () {
  // Check if the current page is the "playgame" page (by URL or a unique element)
  if (window.location.pathname.includes("playHangman")) {
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
      loadTheme(); // Might change **
      console.log('load theme called into event listener');
    });
  }
  initializeGame(); // Call initializeGame to set up the initial game state
});

// document.addEventListener('DOMContentLoaded', () => {
//   initializeGame(); // Call initializeGame to set up the initial game state
// });
//By using DOMContentLoaded, the code ensures that all elements needed for the game (like buttons, displays, or hidden elements) are available before trying to manipulate them.
//Without this, the initializeGame() function might run too early, causing errors if the DOM isn't fully loaded yet
