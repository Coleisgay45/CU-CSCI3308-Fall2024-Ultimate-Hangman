
function setTheme(theme) {
    const body = document.body;
    if (theme === 'Light') {
      body.setAttribute('data-bs-theme', 'light');
    } else if (theme === 'Dark') {
      body.setAttribute('data-bs-theme', 'dark');
    }
}

function setDifficulty(level){
    if (level == 'Easy'){
      // 3 and 4 
      //WordsFromFile('Easy');

    }

    else if (level == 'Medium'){
   // 5 6 
      //WordsFromFile('Medium');
    }

    else if (level == 'Hard'){
      //WordsFromFile('Hard');
           // 6+
    }
}
function WordsFromFile(level) {
  // Arrays to store words for each difficulty level
  const Easy = [];
  const Medium = [];
  const Hard = [];
  
  console.log('ok'); // For debugging purposes, print a message to the console
  

  // sunce fetch is a asyrchones thing 
  // we do need promise so it will wait till whole file loads and then it will start doing stuuff 
  // if we do not put promise then it will fetch data before file is loaded
  // Start fetching the data from the file using the endpoint
  return new Promise((resolve, reject) => {
    fetch('/read-file')
      // If the response is not successful, throw an error
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch file');
        }
        return response.json(); // Parse the JSON response to get the content
      })
      
      // The above fetch uses the fetch API to request the file. 
      // Since the 'fs' module is for Node.js and cannot run in the browser, we wrote the '/read-file' endpoint to handle this.
      
      .then(data => {
        // Split the file content by lines
        const lines = data.content.split('\n');
        
        // Loop over each line in the file
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
      })
      
      // Catch any errors that might occur during fetch or processing
      // this is like second part of the promise thingy 
      .catch(err => {
        console.error('Error occurred:', err); // Log the error for debugging
        reject(err); // Reject the promise with the error
      });
  });
};



WordsFromFile();
