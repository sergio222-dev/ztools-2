import { Button } from '../../atoms';
import styles from './SideBar.module.scss';
import { IconButton } from '../../atoms/Button/IconButton';
import { TbLayoutSidebarLeftCollapse } from 'react-icons/all';
import { SidebarButton } from '../../atoms/Button/SidebarButton';
import { useState } from 'react';
import React from 'react';

const handleAddAccountClick = () => {};

export function SideBar() {
  const [activeButton, setActiveButton] = useState('All Accounts');

  const handleButtonClick = (buttonName: any) => {
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
        <SidebarButton active={activeButton === 'Graph'} onClick={() => handleButtonClick('Graph')}>
          Graph
        </SidebarButton>
        <SidebarButton active={activeButton === 'Quesito'} onClick={() => handleButtonClick('Quesito')}>
          Quesito
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
