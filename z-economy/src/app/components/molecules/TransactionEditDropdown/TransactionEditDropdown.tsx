import { UtilityButton } from '@atoms/Button/UtilityButton';
import styles from '@molecules/TransactionEditDropdown/TransactionEditDropdown.module.scss';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { FaCopy } from 'react-icons/fa';
import { Typography } from '@atoms/Typography/Typography';
import { useState } from 'react';
import { Button } from '@atoms/Button/Button';

interface TransactionEditDropdownProperties {
  handleDelete: () => void;
  disableDelete: boolean;
  selectedQty: number;
}

export function TransactionEditDropdown(props: TransactionEditDropdownProperties) {
  const { handleDelete, disableDelete, selectedQty } = props;
  const [showDropdown, setShowDropdown] = useState(false);

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
      onClick: handleDelete,
      disabled: disableDelete,
    },
  ];

  // TODO: refactor with Tooltip

  return showDropdown ? (
    <div>
      <UtilityButton StartIcon={<MdEdit />} variant={'icon'} onClick={() => setShowDropdown(!showDropdown)}>
        <Typography>Edit {selectedQty !== 0 && `(${selectedQty})`}</Typography>
      </UtilityButton>
      <div className={styles.t_table_dropdown}>
        <ul>
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
    </div>
  ) : (
    <UtilityButton StartIcon={<MdEdit />} variant={'icon'} onClick={() => setShowDropdown(!showDropdown)}>
      <Typography>Edit {selectedQty !== 0 && `(${selectedQty})`}</Typography>
    </UtilityButton>
  );
}
