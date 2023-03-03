import { SideButton, SideButtonSmall } from '../../atoms';
import {LeftSidebarCollapsible} from '../../molecules';
import styles from './SideBar.module.scss'

const handleAddAccountClick = () => {};

export function SideBar() {
  return (
    <div>
      <div className="side-button">
        <SideButton>
          <span>&#9783;</span>Budget
        </SideButton>
      </div>
      <div className="side-button">
        <SideButton>
          <span>&#10064;</span>Reports
        </SideButton>
      </div>
      <div className="side-button">
        <SideButton>
          <span>&#9878;</span>All Accounts
        </SideButton>
      </div>
      <div><LeftSidebarCollapsible></LeftSidebarCollapsible></div>
      <div>
        <SideButtonSmall className="add-btn" onClick={handleAddAccountClick}>
          <span className={styles.add_account_btn_icon}>&#43;</span>Add Account
        </SideButtonSmall>
      </div>
    </div>
  );
}
