import { component$ } from '@builder.io/qwik';
import { useEntity } from '~/lib/entity/application/adapters/context';
import styles from './EntityList.module.scss';
import EntityListItem from '~/components/molecule/EntityListItem/EntityListItem';

export default component$(() => {
  const entity = useEntity();
  const { store } = entity;
  const { entities } = store;

  return (
    <div class={styles['entity-list-container']}>
      {entities.map(e => (
        <EntityListItem key={e.id} id={e.id} name={e.name} />
      ))}
    </div>
  );
});
