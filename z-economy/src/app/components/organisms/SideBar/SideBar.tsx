import { Button, ButtonSmall } from '../../atoms';
import {LeftSidebarCollapsible} from '../../molecules';
import styles from './SideBar.module.scss'

const handleAddAccountClick = () => {};

export function SideBar() {
  return (
    <div>
      <div className="side-button">
        <Button>
          <span>&#9783;</span>Budget
        </Button>
      </div>
      <div className="side-button">
        <Button>
          <span>&#10064;</span>Reports
        </Button>
      </div>
      <div className="side-button">
        <Button>
          <span>&#9878;</span>All Accounts
        </Button>
      </div>
      <div><LeftSidebarCollapsible></LeftSidebarCollapsible></div>
      <div>
        <ButtonSmall className="add-btn" onClick={handleAddAccountClick}>
          <span className={styles.add_account_btn_icon}>&#43;</span>Add Account
        </ButtonSmall>
      </div>
    </div>
  );
}
