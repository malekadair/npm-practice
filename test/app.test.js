const app = require("../app");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-sorted"));

const supertest = require("supertest");

describe("Application", () => {
  describe("GET /", () => {
    it("Should return a list of apps", () => {
      return supertest(app)
        .get("/")
        .expect(200)
        .expect(response => {
          expect(response.body).to.be.an("array");
          expect(response.body[0]).to.have.property("App");
        });
    });
  });

  describe("GET /sort/:sortBy", () => {
    it("Should return list sorted by rating", () => {
      return supertest(app)
        .get("/sort/rating")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(response => {
          expect(response.body).to.be.an("array");
          expect(response.body[0]).to.have.property("App");
          expect(response.body).to.be.descendingBy("Rating");
        });
    });
    it("Should return list sorted by app", () => {
      return supertest(app)
        .get("/sort/app")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(response => {
          expect(response.body).to.be.an("array");
          expect(response.body[0]).to.have.property("App");
          expect(response.body).to.be.sortedBy("App");
        });
    });
  });

  describe("GET /genre/:genreName", () => {
    it("should return list of apps in Action genre", () => {
      return supertest(app)
        .get("/genre/Action")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(response => {
          expect(response.body).to.be.an("array");
          expect(
            response.body.map((item, index) => {
              // console.log(index);

              expect(item.Genres).to.equal("Action");
            })
          );
          // expect(response.body[0].Genres).to.equal("hello");
        });
      // .catch(err => console.log("error", err));
    });
  });
});

//'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'
