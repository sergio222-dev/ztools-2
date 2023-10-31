import { SidebarButton } from '@atoms/Button/SidebarButton';
import { Typography } from '@atoms/Typography/Typography';
import { Tooltip } from 'react-tooltip';
import { useSignal } from '@preact/signals-react';
import styles from './UserDropdownMenu.module.scss';
import { KeyboardEvent, useRef } from 'react';
import sidebarStyles from '../../organisms/SideBar/SideBar.module.scss';
import { useOutsideClick } from '@utils/mouseUtils';
import { FaUser } from 'react-icons/fa';
import { Button } from '@atoms/Button/Button';
import { ImExit, TfiMenuAlt } from 'react-icons/all';
import { AiFillCaretDown } from 'react-icons/ai';
import cls from 'classnames';

interface UserDropdownMenuProperties {
  handleLogout: () => void;
}

export function UserDropdownMenu({ handleLogout }: UserDropdownMenuProperties) {
  //STATE
  const isOpen = useSignal(false);
  const tooltipReference = useRef(null);

  const DROPDOWN_ACCOUNT_BUTTONS = [
    {
      name: 'Settings',
      icon: <FaUser />,
      onClick: undefined,
    },
  ];

  const DROPDOWN_LOGOUT_BUTTON = {
    name: 'Log Out',
    icon: <ImExit />,
    onClick: handleLogout,
  };

  // HANDLERS
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      isOpen.value = false;
    }
  };

  // SIDE EFFECTS
  useOutsideClick(tooltipReference, () => {
    isOpen.value = false;
  });

  return (
    <div ref={tooltipReference}>
      <div onKeyDown={event => handleKeyDown(event)}>
        <a data-tooltip-id="user-dropdown-menu">
          <SidebarButton
            StartIcon={<TfiMenuAlt />}
            onClick={() => (isOpen.value = !isOpen.value)}
            className={cls(styles.user_menu_button, sidebarStyles.user_menu_button)}
          >
            <div className="z_text_a_left">
              <Typography variant="title" size="normal">
                My Budget
              </Typography>
            </div>
            <div className={styles.user_menu_dropdown_caret}>
              <i style={{ fontSize: '1.1rem' }}>
                <AiFillCaretDown />
              </i>
            </div>
          </SidebarButton>
        </a>
      </div>
      <div className={styles.user_menu_dropdown} onKeyDown={event => handleKeyDown(event)}>
        <Tooltip
          id="user-dropdown-menu"
          clickable
          noArrow
          place="bottom-start"
          className={styles.user_menu_tooltip}
          isOpen={isOpen.value}
        >
          <div className={styles.user_menu_dropdown_buttons_container}>
            <ul className={styles.user_menu_dropdown_ul}>
              <li className={styles.user_menu_dropdown_list_header}>
                <Typography variant="bold" size="small">
                  Account
                </Typography>
              </li>
              {DROPDOWN_ACCOUNT_BUTTONS.map(button => {
                return (
                  <li key={button.name}>
                    <Button
                      variant="icon"
                      StartIcon={button.icon}
                      onClick={button.onClick}
                      className={styles.dropdown_buttons}
                    >
                      <Typography>{button.name}</Typography>
                    </Button>
                  </li>
                );
              })}
            </ul>
            <hr className={styles.user_menu_dropdown_hr} />
            <ul className={styles.user_menu_dropdown_ul}>
              <Button
                variant="icon"
                StartIcon={DROPDOWN_LOGOUT_BUTTON.icon}
                onClick={DROPDOWN_LOGOUT_BUTTON.onClick}
                className={styles.dropdown_buttons}
              >
                <Typography>{DROPDOWN_LOGOUT_BUTTON.name}</Typography>
              </Button>
            </ul>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
