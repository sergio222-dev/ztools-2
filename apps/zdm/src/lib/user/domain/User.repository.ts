import type { UserNameObject } from "~/lib/user/domain/UserName.object";
import type { PasswordObject } from "~/lib/user/domain/Password.object";

export interface UserRepository {
  signIn(username: UserNameObject, password: PasswordObject): Promise<string>;
}
