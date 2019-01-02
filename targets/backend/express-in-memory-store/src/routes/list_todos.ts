//

import { Router } from "express";

import { addTodo, getTodos, removeTodo, updateTodo } from "src/dal/todos";
import { asyncMiddleware } from "src/utils/async_handler";

//

const route = Router();

route.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const list = await getTodos();
    res.status(200).send(list);
  })
);

route.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const todo = await addTodo({ completed: false, ...req.body });
    res.status(200).send(todo);
  })
);

route.delete(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const todo = await removeTodo(req.params.id);
    res.status(200).send(todo);
  })
);

route.patch(
  "/:id/completed",
  asyncMiddleware(async (req, res) => {
    const todo = await updateTodo(req.params.id, { completed: true });
    res.status(200).send(todo);
  })
);

export default route;
