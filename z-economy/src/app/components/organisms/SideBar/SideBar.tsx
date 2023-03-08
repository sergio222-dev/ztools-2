import { Button } from '../../atoms';
import styles from './SideBar.module.scss';
import { IconButton } from '../../atoms/Button/IconButton';
import { TbLayoutSidebarLeftCollapse, BsBank2, IoMdCash, RiBarChart2Fill } from 'react-icons/all';
import { SidebarButton } from '../../atoms/Button/SidebarButton';
import { useState } from 'react';
import { LeftSidebarCollapsible } from '../../molecules';

const SIDEBAR_BUTTON_NAMES: Array<SidebarActiveValues> = ['Budget', 'Reports', 'All Accounts'];

const SIDEBAR_BUTTON_ICONS = [<IoMdCash />, <RiBarChart2Fill /> ,<BsBank2 />];

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
    <nav className={toggleSidebar ? styles.side_bar : styles.side_bar_contracted}>
      <div>
        {SIDEBAR_BUTTON_NAMES.map(
          (name, index) => {
            return (
              <SidebarButton
                key={name}
                className={!toggleSidebar ? styles.z_sidebar_button_contracted :''}
                active={activeButton === name}
                onClick={() => handleSidebarButtonClick(name)}
              >
                <span className={styles.side_bar_button_icon}> {SIDEBAR_BUTTON_ICONS[index]} </span>
                <span className={styles.side_bar_button_label}>{name}</span>
              </SidebarButton>
            )
          }
        )}
      </div>
      {/* <div>
          <LeftSidebarCollapsible></LeftSidebarCollapsible>
      </div> */}
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
