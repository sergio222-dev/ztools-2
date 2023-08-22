import type { UserRepository } from "~/lib/user/domain/User.repository";
import type * as Fetcher from "~/lib/shared/domain/Fetcher";
import type { UserNameObject } from "~/lib/user/domain/UserName.object";
import type { PasswordObject } from "~/lib/user/domain/Password.object";
import { USER_ROUTES } from "~/lib/user/infrastructure/routes";

export class FetchUserRepository implements UserRepository {
  public static inject = ['fetcherInstance'] as const;

  constructor(
    private fetcherInstance: Fetcher.Fetcher
  ) {
  }

  async signIn(username: UserNameObject, password: PasswordObject): Promise<string> {
    const route = USER_ROUTES.signIn;
    const response = await this.fetcherInstance.fetch(route, {
      method: 'POST',
      body: JSON.stringify({
        username: username.value,
        password: password.value
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(response.statusText, { cause: data });
    }

    const data = await response.json();
    return await data.accessToken as string;
  }
}
