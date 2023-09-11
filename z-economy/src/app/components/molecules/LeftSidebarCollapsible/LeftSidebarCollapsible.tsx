import styles from './LeftSidebarCollapsible.module.scss';
import { CollapsibleButton } from '../../atoms';
import { ReactNode, useState } from 'react';
import { SidebarButton } from '@atoms/Button/SidebarButton';
import cls from 'classnames';
import { Typography } from '@atoms/Typography/Typography';
import { Account } from '@core/budget/account/domain/Account';
import currency from 'currency.js';

interface Collapsible {
  className?: string | undefined;
  Icon?: ReactNode | undefined;
  accounts: Account[];
}

export function LeftSidebarCollapsible({ className, Icon, accounts }: Collapsible) {
  const [isContentVisible, setIsContentVisible] = useState(true);
  // eslint-disable-next-line unicorn/no-array-reduce
  const total = accounts
    .reduce((total, account) => {
      return currency(total).add(currency(account.balance._amount).value);
    }, currency(0))
    .format();

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
            <Typography size="large">{total}</Typography>
          </div>
        </div>
      </CollapsibleButton>
      {isContentVisible && (
        <div>
          {accounts.map(account => (
            <SidebarButton
              key={account.name}
              className="z_stack_margin_bottom_item_1 z_padding_left_5"
              variant="base"
            >
              <span className={styles.bank_name}>
                <Typography>{account.name}</Typography>
              </span>
              <span className={styles.amount}>
                <Typography>{currency(account.balance._amount).format()}</Typography>
              </span>
            </SidebarButton>
          ))}
        </div>
      )}
    </div>
  );
}
