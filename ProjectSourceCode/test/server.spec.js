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



// *********************** TODO: WRITE 2 UNIT TESTCASES **************************

// ********************************************************************************
// negative test case: user tries to login but enters the wrong password

describe('I am testing login with invalid credentials', () => {
  it('Returns the error message for invalid credentials', (done) => {
    chai
      .request(app)
      .post('/login')
      .send({ username: 'hhawksley0', password: 'Stu1234567!' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Username or Password incorrect');
        done();
      });
  });
});

// positive test case: user enters correct username and password
describe('I am testing login with valid credentials', () => {
  // Sample test case given to test / endpoint.
  it('Returns successful login message', done => {
    chai
      .request(app)
      .post('/login')
      .send({ username: 'hhawksley0', password: 'Stu123456!' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        //expect(res.body.status).to.equals('logged in');
        assert.strictEqual(res.body.message, 'login successful!');
        done();
      });
  });
});