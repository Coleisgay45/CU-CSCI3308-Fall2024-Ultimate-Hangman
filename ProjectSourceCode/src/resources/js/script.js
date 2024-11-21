const { response } = require("express");
const fs = require('fs');

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

function setDifficulty(level){
  // this is the where we connect them, it will connect front end to back end by calling it
  fetch('/set-difficulty',{
    // Sends an HTTP POST request to the server at the /set-difficulty endpoint.
    method :'POST',
    headers: {
      'Content-Type':'application/json',
      //The Content-Type: 'application/json' header specifies that the request body contains JSON data.
    },
    body : JSON.stringify({difficulty: level}), // bodys shows the seelected diffuculty level 

  })
  .then(response=>{
    if(!response.ok){
      throw new Error("Failed to set difficulty");
    }
    throw response.json();
  })
  .then(data=>{
    console.log('Difficulty set to:', data.difficulty);
    window.location.href='/playHangman';
    // if diffuculty went well thwb it is gonna redirect to 
    //Playhangman page abd it will start platinh the gane 
    //based on the se diffucultu 
  })
  .catch(err => console.error(err));
}

function WordsFromFile(level) {
  // Arrays to store words for each difficulty level
  const Easy = [];
  const Medium = [];
  const Hard = [];
  
  console.log('ok'); // For debugging purposes, print a message to the console
  console.log(__dirname);
  fs.readFile('./src/resources/js/word_def.txt', (err, data) => {
    if (err) throw err;
    let text = data.toString()
    const lines = text.split('\n');
    lines.forEach(line => {
      const [word, definition] = line.split(',').map(part => part.trim());
      
      // Ensure both word and definition exist
      if (word && definition) {
        const TrimmedWord = word.replace(/[()]/g, '');
        const TrimmedDefinitions = definition.replace(/[()]/g, '');  // Same cleaning for definition
        const entry = { word: TrimmedWord, definition: TrimmedDefinitions };

        // Filter out words containing invalid characters like hyphens, apostrophes, or spaces
        if (!/[-' ]/.test(TrimmedWord)) {
          // Categorize words based on their length into difficulty levels
          if (TrimmedWord.length == 3 || TrimmedWord.length == 4) {
            Easy.push(entry); // Add to Easy level
          }
          if (TrimmedWord.length == 5 || TrimmedWord.length == 6) {
            Medium.push(entry); // Add to Medium level
          }
          if (TrimmedWord.length > 6) {
            Hard.push(entry); // Add to Hard level
          }
        }
      }
    });

    // Debugging: log the first entry from each difficulty level to the console
    console.log(Easy[100]); 
    console.log(Medium[100]); 
    console.log(Hard[100]); 

    // Resolve the promise based on the selected level
    if (level === 'Easy') {
      const index = Math.floor(Math.random() * Easy.length); 
      resolve(Easy[index]); // Return the selected word for Easy
    }

    if (level === 'Medium') {
      const index = Math.floor(Math.random() * Medium.length);
      resolve(Medium[index]); // Return the selected word for Medium
    }

    if (level === 'Hard') {
      const index = Math.floor(Math.random() * Hard.length);
      resolve(Hard[index]); // Return the selected word for Hard
    }  
  });

  // sunce fetch is a asyrchones thing 
  // we do need promise so it will wait till whole file loads and then it will start doing stuuff 
  // if we do not put promise then it will fetch data before file is loaded
  // Start fetching the data from the file using the endpoint
  // return new Promise((resolve, reject) => {
  //   fetch('./src/resources/js/word_def.txt')
  //     // If the response is not successful, throw an error
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch file');
  //       }
  //       return response.json(); // Parse the JSON response to get the content
  //     })
      
  //     // The above fetch uses the fetch API to request the file. 
  //     // Since the 'fs' module is for Node.js and cannot run in the browser, we wrote the '/read-file' endpoint to handle this.
      
  //     .then(data => {
  //       // Split the file content by lines
  //       const lines = data.content.split('\n');
        
  //       // Loop over each line in the file
  //       lines.forEach(line => {
  //         const [word, definition] = line.split(',').map(part => part.trim());
          
  //         // Ensure both word and definition exist
  //         if (word && definition) {
  //           const TrimmedWord = word.replace(/[()]/g, '');
  //           const TrimmedDefinitions = definition.replace(/[()]/g, '');  // Same cleaning for definition
  //           const entry = { word: TrimmedWord, definition: TrimmedDefinitions };

  //           // Filter out words containing invalid characters like hyphens, apostrophes, or spaces
  //           if (!/[-' ]/.test(TrimmedWord)) {
  //             // Categorize words based on their length into difficulty levels
  //             if (TrimmedWord.length == 3 || TrimmedWord.length == 4) {
  //               Easy.push(entry); // Add to Easy level
  //             }
  //             if (TrimmedWord.length == 5 || TrimmedWord.length == 6) {
  //               Medium.push(entry); // Add to Medium level
  //             }
  //             if (TrimmedWord.length > 6) {
  //               Hard.push(entry); // Add to Hard level
  //             }
  //           }
  //         }
  //       });

  //       // Debugging: log the first entry from each difficulty level to the console
  //       console.log(Easy[100]); 
  //       console.log(Medium[100]); 
  //       console.log(Hard[100]); 

  //       // Resolve the promise based on the selected level
  //       if (level === 'Easy') {
  //         const index = Math.floor(Math.random() * Easy.length); 
  //         resolve(Easy[index]); // Return the selected word for Easy
  //       }

  //       if (level === 'Medium') {
  //         const index = Math.floor(Math.random() * Medium.length);
  //         resolve(Medium[index]); // Return the selected word for Medium
  //       }

  //       if (level === 'Hard') {
  //         const index = Math.floor(Math.random() * Hard.length);
  //         resolve(Hard[index]); // Return the selected word for Hard
  //       }
  //     })
      
  //     // Catch any errors that might occur during fetch or processing
  //     // this is like second part of the promise thingy 
  //     .catch(err => {
  //       console.error('Error occurred:', err); // Log the error for debugging
  //       reject(err); // Reject the promise with the error
  //     });
  // });
};



WordsFromFile();


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

