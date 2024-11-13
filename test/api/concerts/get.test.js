const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server");
const Concert = require("../../../models/concert.model");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("GET /api/concerts", () => {
  before(async () => {
    const testConcertOne = new Concert({
      _id: "5d9f1140f10a81216cfd4408",
      performer: "Harry Potter",
      genre: "Rock",
      price: 50,
      day: 2,
      image: "/img/uploads/1fsd324fsdg.jpg",
    });
    await testConcertOne.save();

    const testConcertTwo = new Concert({
      _id: "5d9f1159f81ce8d1ef2bee48",
      performer: "Hermiona Granger",
      genre: "Pop",
      price: 55,
      day: 1,
      image: "/img/uploads/1fsd324fsdf.jpg",
    });
    await testConcertTwo.save();

    const testConcertThree = new Concert({
      _id: "5d9f1159f81ce8d1ef2bee54",
      performer: "Ron Weasley",
      genre: "Metal",
      price: 43,
      day: 2,
      image: "/img/uploads/1fsd324fstf.jpg",
    });
    await testConcertThree.save();
  });

  it("/concerts/performer/:performer should return concert by performer", async () => {
    const res = await request(server).get("/api/concerts/performer/ron");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body).to.not.be.null;
  });

  it("/concerts/genre/:genre should return concerts by genre", async () => {
    const res = await request(server).get("/api/concerts/genre/rock");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body).to.not.be.null;
  });

  it("/concerts/price/:price_min/:price_max should return concerts by price range", async () => {
    const res = await request(server).get("/api/concerts/price/50/55");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body).to.not.be.null;
  });

  it("/concerts/day/:day should return concerts by day", async () => {
    const res = await request(server).get("/api/concerts/day/1");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body).to.not.be.null;
  });

  after(async () => {
    await Concert.deleteMany();
  });
});