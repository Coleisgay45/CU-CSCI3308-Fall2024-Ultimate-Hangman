// const fs = require('fs');
let currentFetchedWord = ' ';
let TrimmedDefinitions = ' ';
// var Easy = [];
// let Medium = [];
// let Hard = [];
// TODO: should we add a reset function each new game to reset global variables?

console.log("client.js loaded successfully");

function setDifficulty(level){
  console.log("we are in setDifficulty");
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

// function WordsFromFile(level) {
//   // Arrays to store words for each difficulty level\
//   return new Promise((resolve, reject) => {
    
//     console.log('ok'); // For debugging purposes, print a message to the console
//     console.log(__dirname);
//     fs.readFile('./src/resources/js/word_def.txt', (err, data) => {
//       if (err) throw err;
//       let text = data.toString()
//       const lines = text.split('\n');
//       lines.forEach(line => {
//         const [word, definition] = line.split(',').map(part => part.trim());
        
//         // Ensure both word and definition exist
//         if (word && definition) {
//           currentFetchedWord = word.replace(/[()]/g, '');
//           //const TrimmedDefinitions = definition.replace(/[()]/g, '');  // Same cleaning for definition
//           TrimmedDefinitions = definition;
//           const entry = { word: currentFetchedWord, definition: TrimmedDefinitions };

//           // Filter out words containing invalid characters like hyphens, apostrophes, or spaces
//           if (!/[-' ]/.test(currentFetchedWord)) {
//             // Categorize words based on their length into difficulty levels
//             if (currentFetchedWord.length == 3 || currentFetchedWord.length == 4) {
//               Easy.push(entry); // Add to Easy level
//             }
//             if (currentFetchedWord.length == 5 || currentFetchedWord.length == 6) {
//               Medium.push(entry); // Add to Medium level
//             }
//             if (currentFetchedWord.length > 6) {
//               Hard.push(entry); // Add to Hard level
//             }
//           }
//         }
//       });

//       // Debugging: log the first entry from each difficulty level to the console
//       console.log(Easy[199]); 
//       console.log(Medium[1899]); 
//       console.log(Hard[11234]); 

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
//   });
// }

function hint(definition)
{
  const modal = document.getElementById('hintModal'); // Get the modal
  const hintText = document.getElementById('hintText'); // Get the hint text area

  const word = document.getElementById("wordToMatch").innerText;
 
  // Check if a word is loaded
  if (!word) {
    hintText.textContent = "No word is currently loaded!";
  } else {
    hintText.textContent = definition;
    // // Search for the definition of the current word
    // const wordToFind = word.toUpperCase();
    // const match = [...Easy, ...Medium, ...Hard].find(
    //   entry => entry.word.toUpperCase() === wordToFind
    // );
 
    // // Display the definition if found, otherwise show an error
    // if (match) {
    //   hintText.textContent = match.TrimmedDefinitions;
    // } else {
    //   hintText.textContent = "No definition available for this word!";
    // }
  }
 
  modal.style.display = "flex"; // Show the modal
}

function closeHintModal() 
{
  const modal = document.getElementById('hintModal'); // Get the modal
  modal.style.display = "none"; // Hide the modal
}

// module.exports = WordsFromFile; // Or, if part of multiple exports


// WordsFromFile();




