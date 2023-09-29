import { SidebarButton } from '@atoms/Button/SidebarButton';
import { Typography } from '@atoms/Typography/Typography';
import { Tooltip } from 'react-tooltip';
import { useSignal } from '@preact/signals-react';
import styles from './UserDropdownMenu.module.scss';
import { useRef } from 'react';
import { useOutsideClick } from '@utils/mouseUtils';
import { FaUser } from 'react-icons/fa';
import { Button } from '@atoms/Button/Button';
import { ImExit } from 'react-icons/all';

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

  // SIDE EFFECTS
  useOutsideClick(tooltipReference, () => {
    isOpen.value = false;
  });

  return (
    <div ref={tooltipReference}>
      <a data-tooltip-id="user-dropdown-menu">
        <SidebarButton onClick={() => (isOpen.value = !isOpen.value)} className={styles.user_menu_button}>
          <div className="z_text_a_left">
            <Typography variant="title" size="normal">
              My Budget
            </Typography>
          </div>
        </SidebarButton>
      </a>
      <div className={styles.user_menu_dropdown}>
        <Tooltip
          id="user-dropdown-menu"
          clickable
          noArrow
          place="bottom"
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
