import { UtilityButton } from '@atoms/Button/UtilityButton';
import styles from '@molecules/TransactionEditDropdown/TransactionEditDropdown.module.scss';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { FaCopy } from 'react-icons/fa';
import { Typography } from '@atoms/Typography/Typography';
import { Button } from '@atoms/Button/Button';
import { Tooltip } from 'react-tooltip';
import { useSignal } from '@preact/signals-react';
import { useRef } from 'react';
import { useOutsideClick } from '@utils/mouseUtils';

interface TransactionEditDropdownProperties {
  handleDelete: () => void;
  disableDelete: boolean;
  selectedQty: number;
}

export function TransactionEditDropdown(props: TransactionEditDropdownProperties) {
  const { handleDelete, disableDelete, selectedQty } = props;
  const isOpen = useSignal(false);
  const tooltipReference = useRef(null);
  const handleEditClick = () => {
    isOpen.value = !isOpen.value;
    return;
  };

  useOutsideClick(tooltipReference, () => {
    isOpen.value = false;
  });

  const localHandleDelete = () => {
    handleDelete();
    isOpen.value = false;
  };

  const DROPDOWN_BUTTONS = [
    {
      name: 'Duplicate',
      icon: <FaCopy />,
      onClick: undefined,
      disabled: disableDelete,
    },
    {
      name: 'Delete',
      icon: <MdDeleteForever />,
      onClick: localHandleDelete,
      disabled: disableDelete,
    },
  ];

  return (
    <div>
      <a data-tooltip-id="edit-tooltip">
        <UtilityButton StartIcon={<MdEdit />} variant={'icon'} onClick={handleEditClick}>
          <Typography>Edit {selectedQty !== 0 && `(${selectedQty})`}</Typography>
        </UtilityButton>
      </a>
      <div className={styles.t_table_dropdown} ref={tooltipReference}>
        <Tooltip
          id="edit-tooltip"
          clickable
          place="bottom"
          className={styles.t_table_tooltip}
          isOpen={isOpen.value}
        >
          <div className={styles.t_edit_dropdown_buttons_container}>
            <ul className={styles.edit_ul}>
              {DROPDOWN_BUTTONS.map(button => (
                <li key={button.name}>
                  <Button
                    variant={'icon'}
                    StartIcon={button.icon}
                    disabled={button.disabled}
                    onClick={button.onClick}
                    className={styles.dropdown_buttons}
                  >
                    <Typography>{button.name}</Typography>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
