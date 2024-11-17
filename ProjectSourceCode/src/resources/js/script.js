let currentWord = 'WORD'; // temp for testing, will change to initialize to '' later
let correctGuesses = new Array(currentWord.length).fill(false);
let errorCount = 0;
let guessedLetters = [];
// TODO: should we add a reset function each new game to reset global variables?

document.addEventListener('keydown', function(event) {
  const letter = event.key.toUpperCase(); // Get the pressed key and convert it to uppercase
  if (letter >= 'A' && letter <= 'Z') { // Check if the key is a letter
    const button = document.querySelector(`button[onclick="checkGuess('${letter}', this)"]`);
    if (button)
    {
      checkGuess(letter, button); // Call the checkGuess function with the letter
    }
  }
});

function setTheme(theme) // TODO: fix so that styling applies to all pages
{
    const body = document.body;
    if (theme === 'Light') {
      body.setAttribute('data-bs-theme', 'light');
    } else if (theme === 'Dark') {
      body.setAttribute('data-bs-theme', 'dark');
    }
}

function setDifficulty(level) // TODO: need to decide which word lengths correlate with which difficulty?
{
    if (level == 'Easy'){
    }

    else if (level == 'Medium'){

    }

    else if (level == 'Hard'){
        
    }
}

function generateRandomWord()
{
  let currentWord_ = '';
  // random word generated, then we set it to currentWord_
  // word generated depends on level: maybe easy = 3-4, medium = 5-6, hard = 7+? idk what we want to decide
  // set all to uppercase to correlate with buttons
  currentWord = currentWord_;
}

function displayLetters() {
  let display = currentWord.split('').map((letter, index) => {
    // Check if the letter has been correctly guessed
    return correctGuesses[index] ? letter : '_';
  });
  document.getElementById('lettersDisplay').textContent = display.join(' ');
}


function checkGuess(guess, button)
{
  console.log('checkGuess called', guess);
  let correctGuess = false;

  if (guessedLetters.includes(guess)) 
  {
    return;
  }

  guessedLetters.push(guess);
  button.style.backgroundColor = '#d3d3d3';

  if (currentWord.includes(guess))
  {
    console.log(guess);
    correctGuess = true;
    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i] === guess) {
        correctGuesses[i] = true;
      }
    }
  }

  else
  {
    errorCount++;
  }

  displayLetters();

  if (correctGuess)
  {
    // display incorrect guess message
    document.getElementById('guessMessage').innerText = 'Correct!';
  }

  else
  {
    // display correct guess 
    document.getElementById('guessMessage').innerText = 'Incorrect!';
  }

  if (correctGuesses.every(val => val)) 
  {
    document.getElementById('guessMessage').innerText = 'You win!';
  } 
  
  else if (errorCount >= 6) 
  {  
    document.getElementById('guessMessage').innerText = 'Game over!';   
  }
}