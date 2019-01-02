//

import request from "supertest";

import { App } from "src/app";
import { TodoInMemory } from "src/models/todo";

//

const app = new App();

//

test("1 - no todos in the list", async () => {
  {
    // when
    const response = await request(app.express).get("/todos");

    // then
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  }
});
test("2 - add some eggs", async () => {
  {
    // when
    const response = await request(app.express)
      .post("/todos")
      .send({ title: "Buy some eggs" });

    // then
    expect(response.status).toBe(200);
    expect(response.body).toMatchSnapshot({ id: expect.any(String) });
  }
});
test("3 - some eggs in the list", async () => {
  {
    // when
    const response = await request(app.express).get("/todos");

    // then
    expect(response.status).toBe(200);
    expect(_(response.body)).toMatchSnapshot();
  }
});
test("4 - add some breed", async () => {
  {
    // when
    const response = await request(app.express)
      .post("/todos")
      .send({ title: "Buy some breed" });

    // then
    expect(response.status).toBe(200);
    expect(response.body).toMatchSnapshot({ id: expect.any(String) });
  }
});
test("5 - some eggs and breed in the list", async () => {
  {
    // when
    const response = await request(app.express).get("/todos");

    // then
    expect(response.status).toBe(200);
    expect(_(response.body)).toMatchSnapshot();
  }
});
test("6 - add some milk", async () => {
  {
    // when
    const response = await request(app.express)
      .post("/todos")
      .send({ title: "Buy some milk" });

    // then
    expect(response.status).toBe(200);
    expect(response.body).toMatchSnapshot({ id: expect.any(String) });
  }
});
test("7 - some eggs, breed and milk in the list", async () => {
  {
    // when
    const response = await request(app.express).get("/todos");

    // then
    expect(response.status).toBe(200);
    expect(_(response.body)).toMatchSnapshot();
  }
});
test("8 - done buying breed", async () => {
  {
    // given
    const breedTodo = ((await request(app.express).get("/todos"))
      .body as TodoInMemory[]).find(todo => todo.title === "Buy some breed");

    // when
    const response = await request(app.express).patch(
      `/todos/${breedTodo!.id}/completed`
    );

    // then
    expect(response.status).toBe(200);
    expect(response.body).toMatchSnapshot({ id: expect.any(String) });
  }
});
test("9 - some eggs, breed (x) and milk in the list", async () => {
  {
    // when
    const response = await request(app.express).get("/todos");

    // then
    expect(response.status).toBe(200);
    expect(_(response.body)).toMatchSnapshot();
  }
});
test("10 - add some chocolate", async () => {
  {
    // when
    const response = await request(app.express)
      .post("/todos")
      .send({ title: "Buy some chocolate" });

    // then
    expect(response.status).toBe(200);
    expect(response.body).toMatchSnapshot({ id: expect.any(String) });
  }
});
test("11 - some eggs, breed (x), milk, chocolate in the list", async () => {
  {
    // when
    const response = await request(app.express).get("/todos");

    // then
    expect(response.status).toBe(200);
    expect(_(response.body)).toMatchSnapshot();
  }
});
test("12 - remove chocolate from the list", async () => {
  {
    // given
    const chocolateTodo = ((await request(app.express).get("/todos"))
      .body as TodoInMemory[]).find(
      todo => todo.title === "Buy some chocolate"
    );

    // when
    const response = await request(app.express).delete(
      `/todos/${chocolateTodo!.id}`
    );

    // then
    expect(response.status).toBe(200);
    expect(response.body).toMatchSnapshot({ id: expect.any(String) });
  }
});
test("13 - some eggs, breed (x) and milk in the list", async () => {
  {
    // when
    const response = await request(app.express).get("/todos");

    // then
    expect(response.status).toBe(200);
    expect(_(response.body)).toMatchSnapshot();
  }
});

test("foo async await return error no-try-catch", async () => {
  const user = await UserModelfindById();
  if (user instanceof Error) {
    const err = user;
    throw err;
  }

  [err, savedTask] = await to(
    TaskModel({ userId: user.id, name: "Demo Task" })
  );
  if (err) {
    throw new CustomError("Error occurred while saving task");
  }

  if (user.notificationsEnabled) {
    const [err] = await to(
      NotificationService.sendNotification(user.id, "Task Created")
    );
    if (err) {
      console.error("Just log the error and continue flow");
    }
  }

  async function UserModelfindById(): Promise<{ name: string } | Error> {
    return (
      new Promise((resolve, reject) =>
        Math.random() > 0.5
          ? resolve({ name: "gui" })
          : reject("User not found")
      )
        // Alway resolved promise
        .catch(e => e)
    );
  }
});

const _ = (arr: any) =>
  arr.map((val: any) => ({ ...val, id: expect.any(String) }));
