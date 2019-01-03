//

import tempy from "tempy";
import { join } from "path";

import { bin, copyFixture } from "..";

//

const cwd = tempy.directory();
const todolist = bin(cwd, { TODOLIST_DB: join(cwd, ".todolist.db.json") });
const copyFixtureTo = copyFixture("todolist-list");

beforeAll(() => copyFixtureTo(cwd));

test("todolist list", async () => {
  const { stdout } = await todolist("list");
  expect(stdout).toMatchInlineSnapshot(`
"handler { _: [ 'list' ],
  all: false,
  a: false,
  json: false,
  long: false,
  l: false,
  '$0':
   '/home/x/zzz/github/douglasduteil/study-multi-target-todolist-domain/targets/cli/cli-file-based/dist/index.js' }"
`);
});

test("todolist ls", async () => {
  const { stdout } = await todolist("ls");
  expect(stdout).toMatchInlineSnapshot(`
"handler { _: [ 'ls' ],
  all: false,
  a: false,
  json: false,
  long: false,
  l: false,
  '$0':
   '/home/x/zzz/github/douglasduteil/study-multi-target-todolist-domain/targets/cli/cli-file-based/dist/index.js' }"
`);
});

test("todolist ls --long", async () => {
  const { stdout } = await todolist("ls", "--long");
  expect(stdout).toMatchInlineSnapshot(`
"handler { _: [ 'ls' ],
  all: false,
  a: false,
  json: false,
  long: true,
  l: true,
  '$0':
   '/home/x/zzz/github/douglasduteil/study-multi-target-todolist-domain/targets/cli/cli-file-based/dist/index.js' }"
`);
});

test("todolist ll", async () => {
  const { stdout } = await todolist("ll");
  expect(stdout).toMatchInlineSnapshot(`
"handler { _: [ 'll' ],
  all: false,
  a: false,
  json: false,
  long: true,
  l: false,
  '$0':
   '/home/x/zzz/github/douglasduteil/study-multi-target-todolist-domain/targets/cli/cli-file-based/dist/index.js' }"
`);
});

test("todolist ls --all", async () => {
  const { stdout } = await todolist("ls", "--all");
  expect(stdout).toMatchInlineSnapshot(`
"handler { _: [ 'ls' ],
  all: true,
  a: true,
  json: false,
  long: false,
  l: false,
  '$0':
   '/home/x/zzz/github/douglasduteil/study-multi-target-todolist-domain/targets/cli/cli-file-based/dist/index.js' }"
`);
});

test("todolist la", async () => {
  const { stdout } = await todolist("la");
  expect(stdout).toMatchInlineSnapshot(`
"handler { _: [ 'la' ],
  all: true,
  a: false,
  json: false,
  long: false,
  l: false,
  '$0':
   '/home/x/zzz/github/douglasduteil/study-multi-target-todolist-domain/targets/cli/cli-file-based/dist/index.js' }"
`);
});

test("todolist ls --all", async () => {
  const { stdout } = await todolist("ls", "--json");
  expect(stdout).toMatchInlineSnapshot(`
"handler { _: [ 'ls' ],
  all: false,
  a: false,
  json: true,
  long: false,
  l: false,
  '$0':
   '/home/x/zzz/github/douglasduteil/study-multi-target-todolist-domain/targets/cli/cli-file-based/dist/index.js' }"
`);
});
