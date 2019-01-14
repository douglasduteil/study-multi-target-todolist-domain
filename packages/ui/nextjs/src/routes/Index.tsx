//

import { NextContext } from "next";
import Head from "next/head";
import React, { Component, Fragment } from "react";
import { TodoList } from "../todolist";

//

export class TodoListRoute extends Component<NextContext, {}> {
  render(): JSX.Element {
    return (
      <Fragment>
        <Head>
          <title>Todo List</title>
        </Head>
        <TodoList />
      </Fragment>
    );
  }
}
