//

import { Database } from "../database";

//

test("should read test.txt file", () => {
  const database = new Database({ filename: "test.txt", path: __dirname });
});
