import { component$, Slot, useContextProvider, useStore } from '@builder.io/qwik';
import type { UserAggregate } from '~/lib/user/domain/User.aggregate';
import { UserContext } from '~/lib/user/application/adapters/context';

export default component$(() => {
  const emptyUser = useStore<UserAggregate>({
    username: '',
    token: '',
  });

  useContextProvider(UserContext, emptyUser);
  return <Slot />;
});
