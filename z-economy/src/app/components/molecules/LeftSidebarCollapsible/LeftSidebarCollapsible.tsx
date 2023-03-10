import styles from './LeftSidebarCollapsible.module.scss';
import { CollapsibleButton } from '../../atoms';
import { ReactNode, useState } from 'react';
import { SidebarButton } from '../../atoms/Button/SidebarButton';
import cls from 'classnames';

interface Collapsible {
  className?: string | undefined;
  Icon?: ReactNode | undefined;
}

export function LeftSidebarCollapsible({ className, Icon }: Collapsible) {
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [isActive, setIsActive] = useState('active');

  const handleClick = () => {
    setIsContentVisible(!isContentVisible);
    setIsActive(isActive === 'active' ? '' : 'active');
  };

  const containerClassname = isContentVisible
    ? styles.collapsible_container
    : styles.collapsible_container_contracted;

  return (
    <div className={cls(containerClassname, className)}>
      <CollapsibleButton onClick={handleClick}>
        <span className={styles.icon}>{Icon}</span> BUDGET <span className={styles.amount}>$300,000.00</span>
      </CollapsibleButton>
      {isContentVisible && (
        <div>
          <SidebarButton className={styles.collapsible_inside_button}>
            <span className={styles.bank_name}>Santander</span>
            <span className={styles.amount}>$300,000.00</span>
          </SidebarButton>
          <SidebarButton className={styles.collapsible_inside_button}>
            <span className={styles.bank_name}>Santander</span>{' '}
            <span className={styles.amount}>$300,000.00</span>
          </SidebarButton>
        </div>
      )}
    </div>
  );
}
