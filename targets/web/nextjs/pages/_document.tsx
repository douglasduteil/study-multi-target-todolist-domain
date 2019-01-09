//

import Document, { Head, Main, NextScript } from "next/document";

//

export default class MyDocument extends Document {
  public render(): JSX.Element {
    return (
      <html>
        <Head>
          <link
            rel="stylesheet"
            href="https://unpkg.com/normalize.css@8.0.1/normalize.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
