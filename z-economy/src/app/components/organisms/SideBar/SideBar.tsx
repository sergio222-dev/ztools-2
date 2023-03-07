import { Button } from '../../atoms';
import styles from './SideBar.module.scss';
import { IconButton } from '../../atoms/Button/IconButton';
import { TbLayoutSidebarLeftCollapse } from 'react-icons/all';
import { SidebarButton } from '../../atoms/Button/SidebarButton';

const handleAddAccountClick = () => {};

export function SideBar() {
  return (
    <nav className={styles.side_bar}>
      {/*<div className="side-button">*/}
      {/*  <Button2>*/}
      {/*    <span>&#9783;</span>Budget*/}
      {/*  </Button2>*/}
      {/*</div>*/}
      {/*<div className="side-button">*/}
      {/*  <Button2>*/}
      {/*    <span>&#10064;</span>Reports*/}
      {/*  </Button2>*/}
      {/*</div>*/}
      {/*<div className="side-button">*/}
      {/*  <Button2>*/}
      {/*    <span>&#9878;</span>All Accounts*/}
      {/*  </Button2>*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <LeftSidebarCollapsible></LeftSidebarCollapsible>*/}
      {/*</div>*/}
      <div>
        <SidebarButton active> Budget </SidebarButton>
        <SidebarButton active> Banks </SidebarButton>
        <SidebarButton active> Transfers </SidebarButton>
        <SidebarButton active> Graph </SidebarButton>
      </div>
      <div>
        <Button variant="primary" className="add-btn" onClick={handleAddAccountClick}>
          Add Account
        </Button>
      </div>
      <IconButton className={styles.z_collapsable_button}>
        <TbLayoutSidebarLeftCollapse />
      </IconButton>
    </nav>
  );
}
