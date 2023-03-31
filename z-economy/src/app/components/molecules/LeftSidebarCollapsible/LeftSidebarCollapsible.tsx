import styles from './LeftSidebarCollapsible.module.scss';
import { CollapsibleButton } from '../../atoms';
import { ReactNode, useState } from 'react';
import { SidebarButton } from '@atoms/Button/SidebarButton';
import cls from 'classnames';
import { Typography } from '@atoms/Typography/Typography';

type AccountType = {
  name: string;
  total: number;
};

interface Collapsible {
  className?: string | undefined;
  Icon?: ReactNode | undefined;
  accounts: AccountType[];
}

export function LeftSidebarCollapsible({ className, Icon, accounts }: Collapsible) {
  const [isContentVisible, setIsContentVisible] = useState(true);
  const total = accounts.reduce((a, c) => {
    return a + c.total;
  }, 0);

  const handleContentVisible = () => {
    setIsContentVisible(!isContentVisible);
  };

  const containerClassname = isContentVisible
    ? styles.collapsible_container
    : styles.collapsible_container_contracted;

  return (
    <div className={cls(containerClassname, className)}>
      <CollapsibleButton onClick={handleContentVisible}>
        <div className="z_flex z_flex_ai_center z_col_gap_1">
          <span className={cls('z_flex_inline', styles.icon)}>{Icon}</span>
          <div>
            <Typography size="large">BUDGET</Typography>
          </div>
          <div className={styles.amount}>
            <Typography size="large">${total}</Typography>
          </div>
        </div>
      </CollapsibleButton>
      {isContentVisible && (
        <div>
          {accounts.map(a => (
            <SidebarButton
              key={a.name}
              className="z_stack_margin_bottom_item_1 z_padding_left_5"
              variant="base"
            >
              <span className={styles.bank_name}>
                <Typography>{a.name}</Typography>
              </span>
              <span className={styles.amount}>
                <Typography>${a.total}</Typography>
              </span>
            </SidebarButton>
          ))}
        </div>
      )}
    </div>
  );
}
