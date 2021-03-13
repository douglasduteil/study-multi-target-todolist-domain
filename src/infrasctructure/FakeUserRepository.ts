import { User } from "../domain/User";
import { IUserRepository } from "../reposiroty/IUserRepository";

export class FakeUserRepository implements IUserRepository{
  constructor() {

  }
  fetch(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
