const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const db = require("../db/connection");
const app = require("../app");
const request = require("supertest");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

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
