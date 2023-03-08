import { Button } from '../../atoms';
import styles from './SideBar.module.scss';
import { IconButton } from '../../atoms/Button/IconButton';
import { TbLayoutSidebarLeftCollapse } from 'react-icons/all';
import { SidebarButton } from '../../atoms/Button/SidebarButton';
import { useState } from 'react';
import { LeftSidebarCollapsible } from '../../molecules';

const handleAddAccountClick = () => {};

const SIDEBAR_BUTTON_NAMES: Array<SidebarActiveValues> = ['Budget', 'Reports', 'All Accounts'];

type SidebarActiveValues = 'Budget' | 'Reports' | 'All Accounts';

export function SideBar() {
  const [activeButton, setActiveButton] = useState<SidebarActiveValues>('Budget');

  const handleButtonClick = (buttonName: SidebarActiveValues) => {
    setActiveButton(buttonName);
  };

  return (
    <nav className={styles.side_bar}>
      <div>
        {SIDEBAR_BUTTON_NAMES.map(
          (name) => {
            return (
              <SidebarButton
                key={name}
                active={activeButton === name}
                onClick={() => handleButtonClick(name)}
              >
                {name}
              </SidebarButton>
            )
          }
        )}
      </div>
      {/* <div>
          <LeftSidebarCollapsible></LeftSidebarCollapsible>
      </div> */}
      <div>
        <Button variant="primary" className="add-btn" onClick={handleAddAccountClick}>
          Add Account
        </Button>
      </div>
      <IconButton className={styles.z_collapsible_button}>
        <TbLayoutSidebarLeftCollapse />
      </IconButton>
    </nav>
  );
}
