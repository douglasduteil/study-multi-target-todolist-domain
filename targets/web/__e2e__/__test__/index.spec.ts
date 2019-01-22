//

const BASE_URL = process.env.BASE_URL || "";
beforeAll(async () => {
  if (!BASE_URL) {
    fail(new Error("`BASE_URL` environment variable required"));
  }

  await page.goto(BASE_URL);
});

test("display 'Todo List' title", async () => {
  expect(await page.title()).toMatch("Todo List");
});

test("empty list by default", async () => {
  const todolist = await page.$eval("ul", el => el.textContent);

  expect(todolist).toBe("");
});

//

test("Add Chocolate to the todolist", async () => {
  await page.click("label");
  await page.keyboard.type("Chocolate");
  await page.keyboard.press("Enter");

  const todolist = await page.$eval("ul", el => el.textContent);
  expect(todolist).toBe("Chocolate");
});
