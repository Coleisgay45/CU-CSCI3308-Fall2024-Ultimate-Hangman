let currentWord = '';
let correctGuesses = []; 
let errorCount = 0;

// should we add a reset function each new game to reset global variables?

function setTheme(theme) 
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
  currentWord = currentWord_;
}

function displayLetters()
{
  let display = word.split('').map((letter, index) => {
    return correctGuesses ? letter : '_';
  });
  document.getElementById('lettersDisplay').textContent = display.join(' '); // TODO: need to make html element lettersDisplay on playHangman page
}

function checkGuess(guess)
{
  let correctGuess = false;
  if (currentWord.includes(letter))
  {
    correctGuess = true;
    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i] === guess) {
        correctGuesses[i] = true;
      }
    }
  }

  else
  {
    correctGuess = false;
    errorCount++;
    
    // error count ++
  }

  displayLetters();

  if (correctGuess == false)
  {
    // display incorrect guess message
    document.getElementById('guessMessage').innerText = 'Incorrect!'; //TODO: need to define guessMesssage html element
  }

  else
  {
    // display correct guess message
    document.getElementById('guessMessage').innerText = 'Correct!';
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