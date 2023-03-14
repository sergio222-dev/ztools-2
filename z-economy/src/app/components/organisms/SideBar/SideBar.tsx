import styles from './SideBar.module.scss';
import { IconButton } from '../../atoms/Button/IconButton';
import {
  TbLayoutSidebarLeftCollapse,
  BsBank2,
  IoMdCash,
  RiBarChart2Fill,
  RiArrowDownSLine,
} from 'react-icons/all';
import { SidebarButton } from '../../atoms/Button/SidebarButton';
import { useState } from 'react';
import { LeftSidebarCollapsible } from '../../molecules';
import { Button } from '../../atoms';

const SIDEBAR_BUTTON_NAMES: Array<SidebarActiveValues> = ['Budget', 'Reports', 'All Accounts'];

const SIDEBAR_BUTTON_ICONS = [
  <IoMdCash key="icon1" />,
  <RiBarChart2Fill key="icon2" />,
  <BsBank2 key="icon3" />,
];

type SidebarActiveValues = 'Budget' | 'Reports' | 'All Accounts';

export function SideBar() {
  const [activeButton, setActiveButton] = useState<SidebarActiveValues>('Budget');
  const [toggleSidebar, setToggleSidebar] = useState(true);

  const handleSidebarButtonClick = (buttonName: SidebarActiveValues) => {
    setActiveButton(buttonName);
  };

  // const handleAddAccountClick = () => {};

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
              <span className="z_text_a_left">{name}</span>
            </SidebarButton>
          );
        })}
      </div>
      {/* <div>
          <LeftSidebarCollapsible></LeftSidebarCollapsible>
      </div> */}
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
        <Button className={styles.add_btn}>Add Account</Button>
      </div>
      <IconButton className={styles.z_collapsible_icon_button} onClick={handleSidebarCollapsibleClick}>
        <TbLayoutSidebarLeftCollapse />
      </IconButton>
    </nav>
  );
}
