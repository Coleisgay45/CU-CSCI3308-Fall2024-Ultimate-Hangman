// ********************** Initialize server **********************************

const app = require('../src/index'); //TODO: Make sure the path to your index.js is correctly added

// ********************** Import Libraries ***********************************
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const chai = require('chai'); // Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const {assert, expect} = chai;

global.localStorage = {
  getItem: (key) => null,  // or mock a default return value
  setItem: (key, value) => {},
  removeItem: (key) => {},
};

let window;
let document;

beforeEach(function () {
  const dom = new JSDOM(`
    <html>
      <body>
        <div id="lettersDisplay"></div>
      </body>
    </html>
  `);
  window = dom.window;
  document = window.document;

  // Mock global objects for testing
  global.document = document;
  global.window = window;

  global.currentWord = "apple";
  global.correctGuesses = [true, false, false, true, true]; // a: correct, p: wrong, l: wrong, e: correct
});

const script = require('../src/resources/js/script.js');

// script test cases
describe('displayLetters', function () { 

  // Set up a fake DOM before each test

  it('should display the correctly guessed letters and underscores for incorrect ones', function () {
    // Call the displayLetters function
    script.displayLetters();  // Call the function after requiring script.js

    // Find the element by ID and get its text content
    const lettersDisplay = document.getElementById('lettersDisplay').textContent;

    // Assert that the text content is updated correctly
    expect(lettersDisplay).to.equal('a _ _ e');
  });
});

// ********************** DEFAULT WELCOME TESTCASE ****************************

describe('I am testing the server', () => {
  // Sample test case given to test / endpoint.
  it('Returns the default welcome message', done => {
    chai
      .request(app)
      .get('/welcome')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals('success');
        assert.strictEqual(res.body.message, 'Welcome!');
        done();
      });
  });
});

describe('i am testing / endpoint', () => {
  // Sample test case given to test / endpoint.
  it('should render register page', done => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('i am testing register get endpoint', () => {
  // Sample test case given to test / endpoint.
  it('should render register page', done => {
    chai
      .request(app)
      .get('/register')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('i am testing login get endpoint', () => {
  // Sample test case given to test / endpoint.
  it('should render login page', done => {
    chai
      .request(app)
      .get('/login')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('i am testing game over get endpoint', () => {
  // Sample test case given to test / endpoint.
  it('should render gameover page', done => {
    chai
      .request(app)
      .get('/gameover')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('i am testing logout get endpoint', () => {
  // Sample test case given to test / endpoint.
  it('should render logout page', done => {
    chai
      .request(app)
      .get('/logout')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('i am testing playHangman get endpoint', () => {
  // Sample test case given to test / endpoint.
  it('should render playHangman page', done => {
    chai
      .request(app)
      .get('/playHangman')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('i am testing settings get endpoint', () => {
  // Sample test case given to test / endpoint.
  it('should render settings page', done => {
    chai
      .request(app)
      .get('/settings')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('i am testing dictionary get endpoint', () => {
  // Sample test case given to test / endpoint.
  it('should render dictionary page', done => {
    chai
      .request(app)
      .get('/dictionary')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('i am testing home get endpoint', () => {
  // Sample test case given to test / endpoint.
  it('should render home page', done => {
    chai
      .request(app)
      .get('/home')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('i am testing leaderboard get endpoint', () => {
  // Sample test case given to test / endpoint.
  it('should render leaderboard page', done => {
    chai
      .request(app)
      .get('/leaderboard')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

// describe('read file test', () => {
//   // Sample test case given to test / endpoint.
//   it('file is successfully read', done => {
//     chai
//       .request(app)
//       .get('/read-file')
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         done();
//       });
//   });
// });

// *********************** TODO: WRITE 2 UNIT TESTCASES FOR REGISTER POST**************************
// POS: A SUCESSFUL REGISTRATION
// NEG: UNSUCESSFUL, LIKE DUPLICATE USERNAME OR SOMETHING ELSE
describe('I am testing registration with new user', () => {
  it('Returns 200 status code, successful registration', (done) => {
    chai
      .request(app)
      .post('/register')      
      .send({ username: 'erpoulas123', password: 'Slay936!!' })
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        //res.should.be.html;
        done();
      });
  });
});

describe('I am testing registration with existing user in database', () => {
  it('Returns 400 status code, failed registration', (done) => {
    chai
      .request(app)
      .post('/register')      
      .send({ username: 'hhawksley0', password: 'MiamiBeach832$' })
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(400);
        //res.should.be.html;
        done();
      });
  });
});

// *********************** TODO: WRITE 2 UNIT TESTCASES **************************

// ********************************************************************************
// negative test case: user tries to login but enters the wrong password

describe('I am testing login with existing user, incorrect password', () => {
  it('Returns 400 status code, incorrect password', (done) => {
    chai
      .request(app)
      .post('/login')
      .send({ username: 'hhawksley0', password: 'Stu1234567?' })
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(400);
        //res.should.be.html;
        done();
      });
  });
});

// // positive test case: user enters correct username and password
describe('I am testing login with valid credentials', () => {
  // Sample test case given to test / endpoint.
  it('Returns 200 status code, successful login', done => {
    chai
      .request(app)
      .post('/login')
      .send({ username: 'hhawksley0', password: 'Stu123456!' })
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        //res.should.be.html;
        done();
      });
  });
});

/*
describe('updateHangmanImage' function(){
  let window;
  let document;
  beforeEach(function(){
    const dom = new JSDOM(`
      <html>
        <body>
          <img id = id="hangman-image" />
        </body>
      </html>
    `);
    window = dom.window;
    document = window.document;

    global.document
  })
})

*/


// // negative test case dictionary
// describe('I am testing dictionary with word not in dictionary', () => {
//   it('Returns 404 status code', (done) => {
//     chai
//       .request(app)
//       .post('/dictionaryword')
//       .send({ word: 'akjsdfla' })
//       .end((err, res) => {
//         expect(res).to.have.status(404);
//         done();
//       });
//   });
// });

// // positive test case dictionary
// describe('I am testing dictionary with word in dictionary', () => {
//   it('Returns 200 status code', (done) => {
//     chai
//       .request(app)
//       .post('/dictionaryword')
//       .send({ word: 'clam' })
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         done();
//       });
//   });
// });

// describe('i am testing /set-difficulty post endpoint', () => {
//   it('returns 200, set difficulty to Easy when "Easy" is sent', done => {
//     chai
//       .request(app)
//       .post('/set-difficulty')
//       .send({ difficulty: 'Easy' })
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body.difficulty).to.equal('Easy');
//         done();
//       });
//   });

//   it('returns 200, set difficulty to Medium when "Medium" is sent', done => {
//     chai
//       .request(app)
//       .post('/set-difficulty')
//       .send({ difficulty: 'Medium' })
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body.difficulty).to.equal('Medium');
//         done();
//       });
//   });

//   it('returns 200, set difficulty to Hard when "Hard" is sent', done => {
//     chai
//       .request(app)
//       .post('/set-difficulty')
//       .send({ difficulty: 'Hard' })
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body.difficulty).to.equal('Hard');
//         done();
//       });
//   });

//   it('returns 400 return an error for invalid difficulty', done => {
//     chai
//       .request(app)
//       .post('/set-difficulty')
//       .send({ difficulty: 'Impossible' })
//       .end((err, res) => {
//         expect(res).to.have.status(400);
//         expect(res.body.error).to.equal('invalid diffuculty');
//         done();
//       });
//   });

// });
