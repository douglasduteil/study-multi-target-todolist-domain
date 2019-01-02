//

import { json } from "body-parser";
import express from "express";

import listRoute from "./routes/list_todos";

//

export class App {
  public express = express();

  constructor() {
    this.express.use(json());

    this.express.use("/todos", listRoute);
  }
}
