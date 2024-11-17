const fs = require('fs')
//library for reading files
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
  fs.readFile('wordsanddefinitions.txt','utf8',(err,data)=>{
    if (err){
      console.log("Error in loading file");
      return;
    }
    else{
      console.log('ok');
    }
    const lines = data.split('\n');
    const words = [];
    const definitions =[];
    lines.forEach(line =>{
      const [word,definition] = line.split(',').map(part=>part.trim());
   
      if(word && definition){
        words.push(word);
        definitions.push(definition);
      }
    });

    console.log(words);
    console.log(definitions);


  });
}

WordsFromFile();