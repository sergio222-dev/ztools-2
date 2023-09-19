import { $, component$ } from '@builder.io/qwik';
import Button from '~/components/atom/Button/Button';
import styles from './EntityListItem.module.scss';
import { useLocation, useNavigate } from '@builder.io/qwik-city';

interface EntityListItemProperties {
  name: string;
  id: string;
}

export default component$<EntityListItemProperties>(props => {
  const navigate = useNavigate();
  const { params } = useLocation();
  const { name, id } = props;

  const handleClick = $(() => {
    if (id !== params.id) {
      navigate(`/guard/entity/${id}`);
    }
  });

  return (
    <div class={[styles['entity-list-item']]}>
      <Button onClick$={handleClick} class={[styles['entity-list-button']]}>
        {name}
      </Button>
    </div>
  );
});
