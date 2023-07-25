import { component$ } from '@builder.io/qwik';
import InputHelper from '~/components/organism/InputHelper/InputHelper';
import EntityView from '~/components/organism/EntityView/EntityView';

export default component$(() => {
  return (
    <div>
      <InputHelper />
      <EntityView />
    </div>
  );
});
