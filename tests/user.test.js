const chai = require("chai");
// allows you to execute steps and if a step fails the remaining test in the describes will not run
const step = require("mocha-steps").step;
const expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

//the service must be running for these test to run!
//the version of mocha and chai matter here becasue newest versions require some additional refactoring to get to work.

const {
  generateAccessToken,
} = require('../src/utils/jwt-helpers');

const accessToken = generateAccessToken('661a052490d378d93a231f51', {
  expiresIn: 86400,
});

describe("User API service", () => {
  
  step("should GET a authorized user", (done) => {
    chai
    .request("http://localhost:3000")
    .get("/api/users/currentuser")
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      userEmail: "admins@theadmins.com",
    })
    .end((_, resp) => {
      console.log(resp.body);
      expect(resp.body.userEmail).to.be.eql('admins@theadmins.com');
      done();
    });
  });
 
});
