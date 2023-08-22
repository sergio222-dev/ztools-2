import { component$ } from '@builder.io/qwik';
import InputHelper from '~/components/organism/InputHelper/InputHelper';
import EntityView from '~/components/organism/EntityView/EntityView';
import type { RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = async ({ cookie }) => {
  const a = cookie;
  console.log('coockie', cookie.get('token'));
};

export default component$(() => {
  return (
    <div>
      <InputHelper />
      <EntityView />
    </div>
  );
});
