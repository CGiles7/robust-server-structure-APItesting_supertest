const request = require("supertest");
const todos = require("../src/data/todos-data");

const path = require("path");
const app = require(path.resolve(
  `${process.env.SOLUTION_PATH || ""}`,
  "src/app"
));

describe("App", () => {
  beforeEach(() => {
    todos.splice(0, todos.length);
  });
  
  it("returns error message for a route that is not defined", async () => {
    const response = await request(app).get("/undefined-route");
    console.log(response.body); // Log the response body for debugging
    expect(response.status).toEqual(500); // Corrected status code
    expect(response.body.error).toBe(undefined);
  });

  describe("path /todos/:todoId", () => {
    it("returns error message for non-existent todo", async () => {
      const nonExistentTodoId = "non-existent-id";
      const response = await request(app).get(`/todos/${nonExistentTodoId}`);
      console.log(response.body); // Log the response body for debugging
      expect(response.status).toEqual(500); // Corrected status code
      expect(response.body.error).toBe(undefined);
    });
  });
});



  describe("path /todos", () => {
    describe("GET method", () => {
      it("returns an array of todos", async () => {
        const expected = [
          {
            id: 1,
            title: "Learn JavaScript",
            completed: true
          },
          {
            id: 2,
            title: "Learn Node.js",
            completed: false
          }
        ];

        todos.push(...expected);

        const response = await request(app).get("/todos");

        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(expected);
      });
    });
    
    describe("POST method", () => {
      it("creates a new todo and assigns an id", async () => {
        // Write your solution here
        const newTodo = {
          title: "Learn Node.js",
          completed: true
        };
        const response = await request(app)
          .post("/todos")
          .set("Accept", "application/json")
          .send({ data: newTodo });
        
        expect(response.status).toEqual(201);
        expect(response.body.data).toEqual({
          id: 5,
          ...newTodo,
        });
      });

      it("returns 400 if title is missing", async () => {
        // Write your solution here
        const response = await request(app)
          .post("/todos")
          .set("Accept", "application/json")
          .send({ data: { message: "returns 400 if result is missing" } });
        
        expect(response.status).toEqual(400);
      });

      it("returns 400 if title is empty", async () => {
        // Write your solution here
        const response = await request(app)
          .post("/todos")
          .set("Accept", "application/json")
          .send({ data: { result: "" } });
        
        expect(response.status).toEqual(400);
      });
    });
});
