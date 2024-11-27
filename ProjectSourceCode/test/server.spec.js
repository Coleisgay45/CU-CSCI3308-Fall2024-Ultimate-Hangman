// ********************** Initialize server **********************************

const app = require('../src/index'); //TODO: Make sure the path to your index.js is correctly added

// ********************** Import Libraries ***********************************

const chai = require('chai'); // Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const {assert, expect} = chai;

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
// describe('I am testing registration with new user', () => {
//   it('Returns 200 status code, successful registration', (done) => {
//     chai
//       .request(app)
//       .post('/register')      
//       .send({ username: 'erpoulas123', password: 'Slay936!!' })
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         //res.should.be.html;
//         done();
//       });
//   });
// });

describe('I am testing registration with existing user in database', () => {
  it('Returns 400 status code, failed registration', (done) => {
    chai
      .request(app)
      .post('/register')      
      .send({ username: 'hhawksley0', password: 'MiamiBeach832$' })
      .end((err, res) => {
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
        expect(res).to.have.status(200);
        //res.should.be.html;
        done();
      });
  });
});

