import styles from './LeftSidebarCollapsible.module.scss';
import { CollapsibleButton } from '../../atoms';
import { useState } from 'react';

export function LeftSidebarCollapsible() {
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [isActive, setIsActive] = useState('active')

  const handleClick = () => {
    setIsContentVisible(!isContentVisible)
    setIsActive(!(isActive === 'active') ? 'active' : '' )
  }
  
  const icon = isContentVisible ? '\u25BC' : '\u25B6'

  return (
    <div className={styles.collapsible_container}>
      <CollapsibleButton onClick={handleClick}><span className={styles.icon}>{icon}</span> BUDGET <span className={styles.amount}>$300000</span></CollapsibleButton>
      {isContentVisible && (
        <div>
          <p><span className={styles.bank_name}>Santander</span> <span className={styles.amount}>$300000</span><br />
          <span className={styles.bank_name}>Santaaaaander</span> <span className={styles.amount}>$300000</span><br />
          </p>
        </div>
      )}
    </div>
  );
}
