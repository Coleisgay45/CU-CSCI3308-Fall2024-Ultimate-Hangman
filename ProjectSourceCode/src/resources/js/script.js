
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
    }

    else if (level == 'Medium'){
   // 5 6 
    }

    else if (level == 'Hard'){
           // 6+
    }
}

function WordsFromFile(){
  console.log('ok');
  fetch('/read-file')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch file');
      }
      return response.json(); // Parse JSON response
    })
    // used that because require fs is node js enviroment and it is for js that works on app not browser 
    // that is wht we wrote endpoint and called it 
    .then(data => {
    const lines = data.content.split('\n');
    const words = [];
    const definitions =[];
    lines.forEach(line =>{
      const [word,definition] = line.split(',').map(part=>part.trim());
      if(word && definition){
        const TrimmedWord = word.replace(/[()]/g,''); // this function will be replacing all of the paranthesis 
        // ( ) both way in the word and then push it 
        //  Q? why not word = word.replace?
        // answer: In JavaScript, variables declared with const (constant) cannot be reassigned after their initial definition.
        words.push(TrimmedWord);
        definitions.push(definition);
      }
    });

    console.log(words);
    console.log(definitions);

  
  });

};

WordsFromFile();