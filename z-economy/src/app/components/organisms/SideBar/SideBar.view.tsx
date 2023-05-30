import styles from './SideBar.module.scss';
import { IconButton } from '@atoms/Button/IconButton';
import { TbLayoutSidebarLeftCollapse, RiArrowDownSLine } from 'react-icons/all';
import { SidebarButton } from '@atoms/Button/SidebarButton';
import { LeftSidebarCollapsible } from '../../molecules';
import { Button } from '../../atoms';
import { useSideBarHooks } from './SideBar.hooks';
import { Typography } from '@atoms/Typography/Typography';

export function SideBarView() {
  const [model, operators] = useSideBarHooks();

  const { SIDEBAR_BUTTONS, activeButton, toggleSidebar } = model;

  const { handleSidebarButtonClick, handleSidebarCollapsibleClick, handleLogout } = operators;

  return (
    <nav className={`${styles.side_bar} ${toggleSidebar ? '' : styles.side_bar_contracted}`}>
      <div className={styles.side_bar_header}>
        <Button variant="primary" onClick={handleLogout} style={{ backgroundColor: 'indianred' }}>
          {' '}
          Log out
        </Button>
      </div>
      <div className={styles.menu_button_container}>
        {SIDEBAR_BUTTONS.map(button => {
          return (
            <SidebarButton
              key={button.name}
              aria-selected={activeButton === button.route}
              active={activeButton === button.route}
              onClick={() => {
                handleSidebarButtonClick(button.route);
              }}
              StartIcon={button.icon}
              className={styles.menu_button}
              variant="base"
            >
              <div className="z_text_a_left">
                <Typography size="large">{button.name}</Typography>
              </div>
            </SidebarButton>
          );
        })}
      </div>
      <div>
        <LeftSidebarCollapsible
          accounts={[
            {
              name: 'Santander el mejor banco du mundo',
              total: 300_000,
            },
            {
              name: 'BBVA',
              total: 125_000,
            },
          ]}
          className={styles.side_bar_collapsible_container}
          Icon={<RiArrowDownSLine />}
        />
      </div>
      <div>
        <Button className={styles.add_btn}>
          <Typography>Add Account</Typography>
        </Button>
      </div>
      <IconButton className={styles.z_collapsible_icon_button} onClick={handleSidebarCollapsibleClick}>
        <TbLayoutSidebarLeftCollapse />
      </IconButton>
    </nav>
  );
}
