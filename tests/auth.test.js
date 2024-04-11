const chai = require("chai");
// allows you to execute steps and if a step fails the remaining test in the describes will not run
const step = require("mocha-steps").step;
const expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

//the service must be running for these test to run!
//the version of mocha and chai matter here becasue newest versions require some additional refactoring to get to work.

describe("Auth API service", () => {
  
  step("should POST a new user", (done) => {
    chai
      .request("http://localhost:3000")
      .post("/api/auth/register")
      .send({
        userName: "mochatest",
        userPassword: "test",
        userEmail: "test@mocha.com",
      })
      .end((_, resp) => {
        console.log(resp.text);
        expect(resp.body.userEmail).to.be.equal("test@mocha.com");
        done();
      });
  });

  step("should not POST a new user if they already exist", (done) => {
    chai
      .request("http://localhost:3000")
      .post("/api/auth/register")
      .send({
        userName: "mochatest",
        userPassword: "test",
        userEmail: "test@mocha.com",
      })
      .end((_, resp) => {
        console.log(resp.text);
        expect(resp.text).to.be.equal("User with this email already exists");
        done();
      });
  });

  step("should delete user", (done) => {
    chai
      .request("http://localhost:3000")
      .delete("/api/auth/delete")
      .send({
        userName: "mochatest",
        userPassword: "test",
        userEmail: "test@mocha.com",
      })
      .end((_, resp) => {
        console.log(resp.text);
        expect(resp.body.userEmail).to.be.equal("test@mocha.com");
        done();
      });
  });
 
});
