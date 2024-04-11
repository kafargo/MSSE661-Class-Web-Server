const chai = require("chai");
// allows you to execute steps and if a step fails the remaining test in the describes will not run
const step = require("mocha-steps").step;
const expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

//the service must be running for these test to run!
//the version of mocha and chai matter here becasue newest versions require some additional refactoring to get to work.

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGM4NGZlMjcwODMwMTlmN2M2ODM5MiIsImlhdCI6MTcxMjc4NzY2MywiZXhwIjoxNzEyODc0MDYzfQ.Q2CSGhRwNvCZ13kbK3-hm3Lo4Zs_Mmb8sEHoCTqSilA'

describe("User API service", () => {
  
  step("should GET a authorized user", (done) => {
    chai
    .request("http://localhost:3000")
    .get("/api/users/currentuser")
    .set('Authorization', `Bearer ${token}`)
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
