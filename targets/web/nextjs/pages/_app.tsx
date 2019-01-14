//

import "src/polyfills";

import { ContainerContext } from "@todolist/ui.nextjs";
import App, { Container } from "next/app";
import React from "react";
import { container } from "src/container";

//

export default class MyApp extends App {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <ContainerContext.Provider value={container}>
          <Component {...pageProps} />
        </ContainerContext.Provider>
      </Container>
    );
  }
}
