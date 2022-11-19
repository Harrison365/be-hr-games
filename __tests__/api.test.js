const seed = require("../db/seeds/seed"); //require the seed script (which will DROPs, CREATEs, and INSERTS specified data.
const data = require("../db/data/test-data"); //the test data that will populate our test database.
const db = require("../db/connection"); //imports Pool as db from connection.js . Allowing interaction with our PSQL db using pg. In this case, to end the connection db.end()
const app = require("../app"); //allows access to our express server (and its endpoints)
const request = require("supertest"); //allows us to make a rewuest to the express server within our tests.
//npm run setup-dbs before first test

beforeEach(() => {
  return seed(data);
});
//before each test we re-seed the test data using the test script, this allows a clean slate each time.

afterAll(() => {
  return db.end();
});
//after each test we will need to end our connection (pg) to the database. This saves typing db.end each time.

describe("/app/categories", () => {
  test("200 - returns an array of category objects", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((res) => {
        let categoriesArray = res.body.categories;
        expect(Array.isArray(categoriesArray)).toBe(true);
        expect(categoriesArray.length).toBeGreaterThan(0);
        categoriesArray.forEach((obj) => {
          expect(obj).toEqual({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
  test("404 - invalid path", () => {
    return request(app)
      .get("/api/banana")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Sorry, invalid path.");
      });
  });
});
