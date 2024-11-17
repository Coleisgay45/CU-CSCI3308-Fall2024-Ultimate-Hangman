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

// *****************************************************
// <!-- Section 2 : Connect to DB -->
// *****************************************************

// create `ExpressHandlebars` instance and configure the layouts and partials dir.
const hbs = handlebars.create({
  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
});

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

app.get('/', (req, res) => {
  res.render('pages/register');
});

//test cases
app.get('/welcome', function(req, res) { 
  res.status(200).json({
    status: 'success',
    message: 'Welcome!'
  })
})

app.get('/register', (req, res) => {
  res.render('pages/register');
});

app.get('/login', (req, res) => {
    res.render('pages/login');
});

app.get('/settings', (req, res) => {
  res.render('pages/settings');
});

app.get('/discover', (req, res) => {
  res.render('pages/discover'); 
});

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

app.get('/register', (req, res) => {
    res.render('pages/register');
  });

app.get('/playHangman', (req, res) => {
    res.render('pages/playHangman');
  });

  // Register
  app.post('/register', async (req, res) => {
    //hash the password using bcrypt library
    
    var uname = req.body.username;
    console.log("USERNAME: ", uname);
    const regquery = `insert into users (username, password) values ($1, $2);`;
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

// access after this point requires login 
  const auth = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    next();
};
app.use(auth);

app.get('/dictionary', (req, res) => {
    res.render('pages/dictionary');
});

  
app.post('/dictionaryword', (req, res) =>{
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
    console.log("word data is ", wordData);
    console.log("word data 2 is ", wordData2)
    console.log("word data 3 is ", wordData3)
    console.log("word data 4 is ", wordData4)
    // console.log("word data item ", wordData[0].meanings);
    res.render('pages/dictionary', {message: wordData4}
     //res.redirect('/login', {message: "Wrong Password or Username"})
    );
    
   // the results will be displayed on the terminal if the docker containers are running // Send some parameters
  })
  .catch(error => {
    // Handle errors
    // const empty = "error"
    console.error(error.message);
    res.render('pages/dictionary', {message: "Error invalid word / word not found"});
    
  });

});
 
app.get('/home', (req, res) => {
  res.render('pages/home', {
    username: req.session.user,
  });
});

module.exports = app.listen(3000);
console.log('Server is listening on port 3000');
