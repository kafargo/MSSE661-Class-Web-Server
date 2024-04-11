const chai = require("chai");
// allows you to execute steps and if a step fails the remaining test in the describes will not run
const step = require("mocha-steps").step;
const expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

//the service must be running for these test to run!
//the version of mocha and chai matter here becasue newest versions require some additional refactoring to get to work.

describe("Recipe API service", () => {
  
  step("should GET all recipes", (done) => {
    chai
      .request("http://localhost:3000")
      .get("/api/recipes")
      .end((_, resp) => {
        console.log(resp.body.length);
        expect(resp.body.length).to.be.above(1);
        done();
      });
  });

  step("should POST a new recipe", (done) => {
    chai
      .request("http://localhost:3000")
      .post("/api/recipes")
      .send({
        name:"test food",ingredients:["water","ice","fire"]
      })
      .end((_, resp) => {
        console.log(resp.text);
        expect(resp.body.name).to.be.equal("test food");
        done();
      });
  });

  step("should delete recipe", (done) => {
    chai
      .request("http://localhost:3000")
      .delete("/api/recipes/test food")
      
      .end((_, resp) => {
        console.log(resp.text);
        expect(resp.body.name).to.be.equal("test food");
        done();
      });
  });
 
});
