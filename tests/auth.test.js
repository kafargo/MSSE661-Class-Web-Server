const chai = require("chai");
// allows you to execute steps and if a step fails the remaining test in the describes will not run
const step = require("mocha-steps").step;
const expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

//the service must be running for these test to run!
//the version of mocha and chai matter here becasue newest versions require some additional refactoring to get to work.

before((done) => {
  chai
    .request("http://localhost:3000")
    .delete("/api/auth/delete")
    .send({
      userEmail: "test@mocha.com",
      userName: "mochatest",
      userPassword: "test",
    })
    .end((_, resp) => {
      console.log(
        "If the test user already existed, it's getting deleted now!" + "\n"
      );
      done();
    });
});

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
        //color codes the text in the console
        console.log("\n" + "\x1b[35m" + "Registering a new user" + "\x1b[0m");
        console.log("Response Status: " + "\x1b[36m%s\x1b[0m", resp.status);
        console.log(resp.body);
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
        console.log(
          "\n" + "\x1b[35m" + "Trying to register an existing user" + "\x1b[0m"
        );
        console.log("Response Status: " + "\x1b[36m%s\x1b[0m", resp.status);
        console.log(resp.text);
        expect(resp.text).to.be.equal("User with this email already exists");
        done();
      });
  });

  step("should fail to login a user with a incorrect password", (done) => {
    chai
      .request("http://localhost:3000")
      .post("/api/auth/login")
      .send({
        userPassword: "wrongpassword",
        userEmail: "test@mocha.com",
      })
      .end((_, resp) => {
        console.log(
          "\n" + "\x1b[35m" + "Trying to login with a bad password" + "\x1b[0m"
        );
        console.log("Response Status: " + "\x1b[36m%s\x1b[0m", resp.status);
        console.log(resp.body.msg);
        expect(resp.body.msg).to.be.equal("Invalid password!");
        done();
      });
  });

  step("should login a valid user", (done) => {
    chai
      .request("http://localhost:3000")
      .post("/api/auth/login")
      .send({
        userPassword: "test",
        userEmail: "test@mocha.com",
      })
      .end((_, resp) => {
        console.log(
          "\n" + "\x1b[35m" + "logging in with a good password" + "\x1b[0m"
        );
        console.log("Response Status: " + "\x1b[36m%s\x1b[0m", resp.status);
        console.log(resp.body);
        expect(resp.body.msg).to.be.equal("Logged in!");
        expect(resp.status).to.be.equal(200);
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
        console.log("\n" + "\x1b[35m" + "Deleting the user" + "\x1b[0m");
        console.log("Response Status: " + "\x1b[36m%s\x1b[0m", resp.status);
        console.log(resp.body);
        expect(resp.body.userEmail).to.be.equal("test@mocha.com");
        done();
      });
  });
});
