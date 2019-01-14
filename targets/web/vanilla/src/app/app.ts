//

import { AppComponent } from "@todolist/ui.vanilla";
import { decorate, inject, injectable, postConstruct } from "inversify";
import { IDENTIFIER } from "./identifiers";

//

decorate(injectable(), AppComponent);

//

decorate(
  inject(IDENTIFIER.ROOT_ELEMENT) as ParameterDecorator,
  AppComponent,
  0
);
decorate(inject(IDENTIFIER.DATA_SOURCE) as ParameterDecorator, AppComponent, 1);
decorate(inject(IDENTIFIER.CORE_FILTER) as ParameterDecorator, AppComponent, 2);

//

decorate(postConstruct() as MethodDecorator, AppComponent.prototype, "init");

export class App extends AppComponent {}
