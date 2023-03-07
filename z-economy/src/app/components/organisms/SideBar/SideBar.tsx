import { Button } from '../../atoms';
import styles from './SideBar.module.scss';
import { IconButton } from '../../atoms/Button/IconButton';
import { TbLayoutSidebarLeftCollapse } from 'react-icons/all';
import { SidebarButton } from '../../atoms/Button/SidebarButton';
import { useState } from 'react';

const handleAddAccountClick = () => {};

type SidebarActiveValues = 'All Accounts' | 'Budget' | 'Reports';

export function SideBar() {
  const [activeButton, setActiveButton] = useState<SidebarActiveValues>('Budget');

  const handleButtonClick = (buttonName: SidebarActiveValues) => {
    setActiveButton(buttonName);
  };

  return (
    <nav className={styles.side_bar}>
      {/*<div>*/}
      {/*  <LeftSidebarCollapsible></LeftSidebarCollapsible>*/}
      {/*</div>*/}
      <div>
        <SidebarButton active={activeButton === 'Budget'} onClick={() => handleButtonClick('Budget')}>
          Budget
        </SidebarButton>
        <SidebarButton active={activeButton === 'Reports'} onClick={() => handleButtonClick('Reports')}>
          Reports
        </SidebarButton>
        <SidebarButton
          active={activeButton === 'All Accounts'}
          onClick={() => handleButtonClick('All Accounts')}
        >
          All Accounts
        </SidebarButton>
      </div>
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
