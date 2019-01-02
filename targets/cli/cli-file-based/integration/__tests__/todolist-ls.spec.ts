//

import tempy from "tempy";

import { bin, copyFixture } from "..";

//

const cwd = tempy.directory();
const todolist = bin(cwd);
const copyFixtureTo = copyFixture("todolist-list");

beforeAll(() => copyFixtureTo(cwd));

test("todolist list", async () => {
  const { stdout } = await todolist("list");
  expect(stdout).toMatchInlineSnapshot(`
package-1
@test/package-2
package-3
`);
});

test("todolist ls", async () => {
  const { stdout } = await todolist("ls");
  expect(stdout).toMatchInlineSnapshot(`
package-1
@test/package-2
package-3
`);
});

test("todolist ls --all", async () => {
  const { stdout } = await todolist("ls", "--all");
  expect(stdout).toMatchInlineSnapshot(`
package-1
@test/package-2
package-3
package-4       (PRIVATE)
`);
});

test("todolist ls --long", async () => {
  const { stdout } = await todolist("ls", "--long");
  expect(stdout).toMatchInlineSnapshot(`
package-1        v1.0.0 packages/pkg-1
@test/package-2  v2.0.0 packages/pkg-2
package-3       MISSING packages/pkg-3
`);
});

test("todolist ls --parseable", async () => {
  const { stdout } = await todolist("ls", "--parseable");
  expect(stdout).toMatchInlineSnapshot(`
__TEST_ROOTDIR__/packages/pkg-1
__TEST_ROOTDIR__/packages/pkg-2
__TEST_ROOTDIR__/packages/pkg-3
`);
});

test("todolist ls --all --long --parseable", async () => {
  const { stdout } = await todolist("ls", "-alp");
  expect(stdout).toMatchInlineSnapshot(`
__TEST_ROOTDIR__/packages/pkg-1:package-1:1.0.0
__TEST_ROOTDIR__/packages/pkg-2:@test/package-2:2.0.0
__TEST_ROOTDIR__/packages/pkg-3:package-3:MISSING
__TEST_ROOTDIR__/packages/pkg-4:package-4:4.0.0:PRIVATE
`);
});

test("todolist la", async () => {
  const { stdout } = await todolist("la");
  expect(stdout).toMatchInlineSnapshot(`
package-1        v1.0.0 packages/pkg-1
@test/package-2  v2.0.0 packages/pkg-2
package-3       MISSING packages/pkg-3
package-4        v4.0.0 packages/pkg-4 (PRIVATE)
`);
});

test("todolist ll", async () => {
  const { stdout } = await todolist("ll");
  expect(stdout).toMatchInlineSnapshot(`
package-1        v1.0.0 packages/pkg-1
@test/package-2  v2.0.0 packages/pkg-2
package-3       MISSING packages/pkg-3
`);
});
