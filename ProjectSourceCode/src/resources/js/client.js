// const fs = require('fs');
let currentFetchedWord = ' ';
let TrimmedDefinitions = ' ';
// var Easy = [];
// let Medium = [];
// let Hard = [];

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