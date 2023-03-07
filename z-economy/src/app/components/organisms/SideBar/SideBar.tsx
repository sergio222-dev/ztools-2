import { Button2, Button, ButtonRound } from '../../atoms';
import { LeftSidebarCollapsible } from '../../molecules';
import styles from './SideBar.module.scss';

const handleAddAccountClick = () => {};

export function SideBar() {
  return (
    <div className={styles.side_bar}>
      <div className="side-button">
        <Button2>
          <span>&#9783;</span>Budget
        </Button2>
      </div>
      <div className="side-button">
        <Button2>
          <span>&#10064;</span>Reports
        </Button2>
      </div>
      <div className="side-button">
        <Button2>
          <span>&#9878;</span>All Accounts
        </Button2>
      </div>
      <div>
        <LeftSidebarCollapsible></LeftSidebarCollapsible>
      </div>
      <div>
        <Button variant="primary" className="add-btn" onClick={handleAddAccountClick}>
          Add Account
        </Button>
      </div>
    </div>
  );
}
