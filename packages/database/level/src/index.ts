//

import leveldown from "leveldown";
import levelup from "levelup";

//

const db = levelup(leveldown("./mydb"));

(async () => {
  await db.put("index", "0");
  {
    const index = Number(await db.get("index"));
    console.log({ index });
    await db.put("todo:" + index, "milk");
    await db.put("index", `${index + 1}`);
  }
  {
    const index = Number(await db.get("index"));
    console.log({ index });
    await db.put("todo:" + index, "chocolate");
    await db.put("index", `${index + 1}`);
  }
  {
    const key = "todo:";
    db.createValueStream({
      gte: key,
      lte: String.fromCharCode(key.charCodeAt(0) + 1)
    }).on("data", function(data) {
      console.log("value=", String(data));
    });
  }
})();
