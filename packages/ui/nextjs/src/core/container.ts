//

import { Container } from "inversify";
import { createContext } from "react";

//

export const container = new Container();
export const ContainerContext = createContext<Container>(container);
