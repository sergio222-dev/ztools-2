import type { RequestHandler } from '@builder.io/qwik-city';
import { guardAuthenticationHandler } from '~/middleware/guardAuthenticationHandler';
import { component$, Slot } from '@builder.io/qwik';
import EntityList from '~/components/organism/EntityList/EntityList';
import Navbar from '~/components/organism/Navbar/Navbar';
import Drawer from '~/components/organism/Drawer/Drawer';
import { useEntityProvider } from '~/lib/entity/application/adapters/context';

export const onGet: RequestHandler = guardAuthenticationHandler;

export default component$(() => {
  useEntityProvider();

  return (
    <div class="main-screen">
      <Navbar />
      <div class="main-view">
        <Drawer>
          <EntityList />
        </Drawer>
        <div class="container mx-auto pt-2">
          <Slot />
        </div>
      </div>
    </div>
  );
});
