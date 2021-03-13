import { User } from "../domain/User";
import { IUserRepository } from "../reposiroty/IUserRepository";
import { ISignInUseCase } from "./ISignIn.usecase";
import { IUserDto } from "./IUserDto";

export class SignInUseCase implements ISignInUseCase {

  constructor (private userRepository: IUserRepository) {}
  async signIn(userDto: IUserDto): Promise<IUserDto> {
    const user = new User(userDto.id, userDto.name, userDto.email, userDto.type)
    return await this.userRepository.fetch(user)
  }

}
