import { type UserRepository } from "~/lib/user/domain/User.repository";
import { UserNameObject } from "~/lib/user/domain/UserName.object";
import { PasswordObject } from "~/lib/user/domain/Password.object";

interface SignInRequest {
  username: string;
  password: string;
}

export class SignIn {
  public static inject = ['userRepository'] as const;
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async execute(request: SignInRequest) {
    const username = new UserNameObject(request.username);
    const password = new PasswordObject(request.password);
    return await this.userRepository.signIn(username, password);
  }
}
