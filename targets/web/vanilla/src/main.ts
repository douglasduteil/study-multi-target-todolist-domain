//

import { Container } from "inversify";
import { IDENTIFIER } from "./app/identifiers";
import { AppModule } from "./app/module";

//

export async function bootstrap(): Promise<void> {
  const container = new Container();
  container.load(AppModule);

  // MUST auto bootstrap on "postConstruct"
  container.get(IDENTIFIER.ROOT_COMPONENT);
}
