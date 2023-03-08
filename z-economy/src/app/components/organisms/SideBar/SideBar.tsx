import { Button } from '../../atoms';
import styles from './SideBar.module.scss';
import { IconButton } from '../../atoms/Button/IconButton';
import { BsBank2, IoMdCash, RiBarChart2Fill, TbLayoutSidebarLeftCollapse } from 'react-icons/all';
import { SidebarButton } from '../../atoms/Button/SidebarButton';
import { useState } from 'react';

const SIDEBAR_BUTTON_NAMES: Array<SidebarActiveValues> = ['Budget', 'Reports', 'All Accounts'];

const SIDEBAR_BUTTON_ICONS = [<IoMdCash />, <RiBarChart2Fill />, <BsBank2 />];

type SidebarActiveValues = 'Budget' | 'Reports' | 'All Accounts';

export function SideBar() {
  const [activeButton, setActiveButton] = useState<SidebarActiveValues>('Budget');
  const [toggleSidebar, setToggleSidebar] = useState(true);

  const handleSidebarButtonClick = (buttonName: SidebarActiveValues) => {
    setActiveButton(buttonName);
  };

  const handleAddAccountClick = () => {};

  const handleSidebarCollapsibleClick = () => {
    setToggleSidebar(!toggleSidebar);
  };

  return (
    <nav className={`${styles.side_bar} ${toggleSidebar ? '' : styles.side_bar_contracted}`}>
      <div className={styles.menu_button_container}>
        {SIDEBAR_BUTTON_NAMES.map((name, index) => {
          return (
            <SidebarButton
              key={name}
              aria-selected={activeButton === name}
              active={activeButton === name}
              onClick={() => handleSidebarButtonClick(name)}
              StartIcon={SIDEBAR_BUTTON_ICONS[index]}
              className={styles.menu_button}
            >
              <span>{name}</span>
            </SidebarButton>
          );
        })}
      </div>
      <div>
        <Button variant="primary" className={styles.add_btn} onClick={handleAddAccountClick}>
          Add Account
        </Button>
      </div>
      <IconButton className={styles.z_collapsible_button} onClick={handleSidebarCollapsibleClick}>
        <TbLayoutSidebarLeftCollapse />
      </IconButton>
    </nav>
  );
}
