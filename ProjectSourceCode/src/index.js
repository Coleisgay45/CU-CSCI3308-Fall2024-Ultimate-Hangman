// *****************************************************
// <!-- Section 1 : Import Dependencies -->
// *****************************************************

const express = require('express'); // To build an application server or API
const app = express();
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const path = require('path');
const pgp = require('pg-promise')(); // To connect to the Postgres DB from the node server
const bodyParser = require('body-parser');
const session = require('express-session'); // To set the session object. To store or access session data, use the `req.session`, which is (generally) serialized as JSON by the store.
const bcrypt = require('bcryptjs'); //  To hash passwords
const axios = require('axios'); // To make HTTP requests from our server. We'll learn more about it in Part C.
const WordsFromFile = require('./resources/js/client.js');


// *****************************************************
// <!-- Section 2 : Connect to DB -->
// *****************************************************

// create `ExpressHandlebars` instance and configure the layouts and partials dir.
const hbs = handlebars.create({
  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
});
/*
hbs.handlebars.keyboardTyping('range', (start, end) => {

});
*/

// database configuration
const dbConfig = {
  host: 'db', // the database server
  port: 5432, // the database port
  database: process.env.POSTGRES_DB, // the database name
  user: process.env.POSTGRES_USER, // the user account to connect with
  password: process.env.POSTGRES_PASSWORD, // the password of the user account
};

const db = pgp(dbConfig);

// test your database
db.connect()
  .then(obj => {
    console.log('Database connection successful'); // you can view this message in the docker compose logs
    obj.done(); // success, release the connection;
  })
  .catch(error => {
    console.log('ERROR:', error.message || error);
  });

// *****************************************************
// <!-- Section 3 : App Settings -->
// *****************************************************

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
console.log(__dirname);
app.use(bodyParser.json()); // specify the usage of JSON for parsing request body.
//app.set('resources',path.join(__dirname,'resources'));
app.use(express.static(__dirname+'/resources'));
// path join is taking you to rpository 

// initialize session variables
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// TODO: write test case - where is this used?
app.get('/read-file', (req, res) => {
  const filePath = path.join(__dirname, 'resources','js', 'word_def.txt'); // Adjust path
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      //console.log('here');
      console.error('Error reading file:', err);
      return res.status(500).send('Error reading file');
    }
    res.status(200).json({ content: data });
  });
});


// test case written
app.get('/', (req, res) => {
  res.status(200).render('pages/register');
});

//test case written
app.get('/welcome', function(req, res) { 
  res.status(200).json({
    status: 'success',
    message: 'Welcome!'
  })
})

// test case written
app.get('/register', (req, res) => {
  res.status(200).render('pages/register');
});

// test case written
app.get('/login', (req, res) => {
    res.status(200).render('pages/login');
});

// app.get('/settings', (req, res) => {
//   res.render('pages/settings');
// });

// app.get('/discover', (req, res) => {
//   res.render('pages/discover'); 
// });


// test case written

// login creates a user session if the user passes in the correct
// / valid credentials. If invalid or wrong credentials were passed in
// the login page is rendered again. Otherwise on sucessful login
// the home page is rendered

app.post('/login', async (req, res) => {
  db.tx(async t => {
    const user = await t.one(
      `SELECT username, password
         FROM
          users
         WHERE
          username = $1`,
      [req.body.username]
    );
    //console.info(user)
    if(user.username === ''){
      res.render('pages/register');
      return;
    }
    console.log('matching')
    const match = await bcrypt.compare(req.body.password, user.password);
    console.log(match)
    if(match !== true){
      //res.redirect('/login', {message: "Wrong Password or Username"})
      res.status(400).render('pages/login');
      return;
    }
    req.session.user = req.body.username;
    req.session.save();
    res.redirect('/home');
  })
    .catch(err => {
      res.status(500).render('pages/register')
    });

});

// app.get('/register', (req, res) => {
//     res.render('pages/register');
//   });

// test case written
app.post('/register', async (req, res) => {
    //hash the password using bcrypt library
    
    // register creates a new user in the user database. It takes
    // the information that the user passes in (username, password)
    // and creates and inserts a new user into the user database

    var uname = req.body.username;
    console.log("USERNAME: ", uname);
    const regquery = `insert into users (username, password, easy_high_score, medium_high_score, hard_high_score) values ($1, $2, 0, 0, 0);`;
    if ((uname !== '') && (req.body.password !== '')){
    const hash = await bcrypt.hash(req.body.password, 10);
    db.any(regquery,[uname, hash])
    // if query execution succeeds
    // query results can be obtained
    // as shown below
    .then(data => {
        res.status(200).render('pages/login');
    })
    // if query execution fails
    // send error message
    .catch(err => {
      res.status(400).render('pages/register');
    });
  }
  else{
    console.log('uh oh spaghettio');
    res.status(400).render('pages/register');
  }
    // To-DO: Insert username and hashed password into the 'users' table
});

// app.get('/settings', (req, res) => {
//     res.render('pages/settings');
//   });

// app.get('/dictionary', (req, res) => {
//     res.render('pages/dictionary');
// });

// test case written
app.get('/gameover', (req, res) => {
    const { result, correctWord } = req.query;
    res.status(200).render('pages/gameOver', { result, correctWord}); // Render the gameOver.hbs page
  });

// app.get('/home', (req, res) => {
//     res.render('pages/home', {
//       username: req.session.user,
//     });
//   });

// test case written

//logout destroys the user session and logs the user out
app.get('/logout', (req,res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Failed to destroy session:', err);
      return res.status(500).render('pages/logout', { 
        message: 'Could not log out. Please try again later.',
        error: true
      });
    }
    res.status(200).render('pages/logout', { 
      message: 'You have successfully logged out.',
      error: false
    });
  });
});

app.get('/leaderboard', (req, res) => {
    res.render('pages/leaderboard');
});

app.get('/home', (req,res) => {
    res.render('pages/home')
});

// access after this point requires login 
// TODO: do we write test case for this ?
const auth = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    next();
};
app.use(auth);

// test case written
app.get('/playHangman', (req, res) => {
  const difficulty = req.session.difficulty || 'Easy'; // Default to Easy
  WordsFromFile(difficulty)

  
    .then((wordEntry) => {
      console.log(wordEntry.word)
      res.status(200).render('pages/playHangman', {
        word: wordEntry.word, 
        definition: wordEntry.definition,
      });
    console.log(difficulty);
      
   // we gonna check, if we do have a diffucultg 
  // then we will use the saved session diffuculty 
  // after that we will make it easy as default 
  // we gonna call the function either with  defaul t
  // or either with selected one 
    })
    .catch((err) => {
      console.error('Error fetching word:', err);
      res.status(500).render('pages/playHangman', { error: 'Failed to fetch word!' });
    });
});

// test case written
app.get('/settings', (req, res) => {
  res.status(200).render('pages/settings');
});

// test case written
app.get('/dictionary', (req, res) => {
    res.status(200).render('pages/dictionary');
});


// TODO: write test case, find out why console logs arent showing up, wtf is up with the status codes 
app.post('/dictionaryword', (req, res) =>{
  // Makes a api call using the word that the user enters by
  // parsing the word to the api call url
  var userword = req.body.word;
  var url2 = "https://api.dictionaryapi.dev/api/v2/entries/en/"
  + userword;
  console.log(userword);
  axios({
    url: url2,
    method: 'GET',
    dataType: 'json',
    headers: {
      'Accept-Encoding': 'application/json',
      
    },
    params: { 
    },
  })
  .then(results => {
    const wordData = results.data;
    const wordData2 = wordData[0].meanings
    const wordData3 = wordData2[0].definitions
    const wordData4 = wordData3[0].definition
    
    // parse the api call results and then display the word as a message

    console.log("word data is ", wordData);
    console.log("word data 2 is ", wordData2)
    console.log("word data 3 is ", wordData3)
    console.log("word data 4 is ", wordData4)
    // console.log("word data item ", wordData[0].meanings);
    res.status(200).render('pages/dictionary', {message: wordData4}
     //res.redirect('/login', {message: "Wrong Password or Username"})
    );
    
   // the results will be displayed on the terminal if the docker containers are running // Send some parameters
  })
  .catch(error => {
    // Handle errors
    // const empty = "error"
    console.error(error.message);
    res.status(500).render('pages/dictionary', {message: "Error Something went wrong"});
  });

});


// test case written
app.get('/home', (req, res) => {
  // displays information for the home screen, displays the user's data
  // their username, scores, etc
  var userRanked = `select * from users where users.username = '${req.session.user}'`;
  db.any(userRanked)
  .then( (rows) => {
    res.status(200).render('pages/home', {
      username: req.session.user,
      easy_high_score: rows[0].easy_high_score,
      medium_high_score: rows[0].medium_high_score,
      hard_high_score: rows[0].hard_high_score,
    });
  })
  .catch(err => {
    console.log("Error data was not fetched")
    console.error(err.message);
    res.status(500).render('pages/leaderboard', {message: "Error fetching data"});
  });
});

// TODO: write test case
app.post('/set-difficulty',(req,res) => {// we set up a post ewquest for set-diffuculty 
  // request from the client, it contains info about what client sent 
  //res this is the respomse the server sen back 
  const { difficulty } = req.body;// we get the diffuculty from request body 
  //request body contains diffuculty 
  console.log(difficulty);
  if(['Easy','Medium','Hard'].includes(difficulty)){
    // we check if diffucultt is easy, meduim or hard
    //It uses the .includes() method to see if difficulty (which the user provided) is in that list.
    req.session.difficulty = difficulty || 'Easy';
    // we store the diffuculty in session 
    // session is the place we store information 
    // The session is a way to store data that the server can remember 
    //between requests (like remembering the user's chosen difficulty).
    req.session.save(err =>{ // we save the session and then handle the session 

      console.log(difficulty);

      if(err){ 
        //// we check to see if there is soething wrong 
      // in saving our session
        console.log('Eror saving session',err);
        return res.status(500).json({error:'Failed to save diffuculty'});      
      }
      res.status(200).json({difficulty});
    });
  }
  else{ // this is for the case that our diffuculty is not inclusing 
    // easy hard and meduim
    res.status(400).json({error: 'invalid diffuculty'});
  }
});

// testcase written
app.get('/leaderboard', function (req, res) {
  // loads the leaderboard by fetching all the users from the database
  // users are ranked by their highest hard mode score
  
    var usersRanked = `select * from users order by hard_high_score desc;`
  
    // use task to execute multiple queries
    db.any(usersRanked)
      // if query execution succeeds
      // query results can be obtained
      // as shown below
      .then(data => {
        users = data;
        console.log("user data fetched");
        console.log(data);
        res.status(200).render('pages/leaderboard', {users})
      })
      // if query execution fails
      // send error message
      .catch(err => {
        console.log("Error users were not fetched")
        console.error(err.message);
        res.status(500).render('pages/leaderboard', {message: "Error fetching user data"});
      });
  }
  
  );
module.exports = app.listen(3000);
console.log('Server is listening on port 3000');


// here is the place when we will do back end of settijng diffucuty
