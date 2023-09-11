import styles from './LeftSidebarCollapsible.module.scss';
import { CollapsibleButton } from '../../atoms';
import { ReactNode, useState } from 'react';
import { SidebarButton } from '@atoms/Button/SidebarButton';
import cls from 'classnames';
import { Typography } from '@atoms/Typography/Typography';
import { Account } from '@core/budget/account/domain/Account';
import currency from 'currency.js';
import { MdEdit } from 'react-icons/md';
import Modal from 'react-modal';
import { useSignal } from '@preact/signals-react';
import { EditAccountForm } from '../../forms/EditAccount/EditAccountForm';

interface Collapsible {
  className?: string | undefined;
  Icon?: ReactNode | undefined;
  accounts: Account[];
}

export function LeftSidebarCollapsible({ className, Icon, accounts }: Collapsible) {
  const [isContentVisible, setIsContentVisible] = useState(true);
  const modalIsOpen = useSignal('');
  const totalBudget = accounts
    // eslint-disable-next-line unicorn/no-array-reduce
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
            <Typography size="large">{totalBudget}</Typography>
          </div>
        </div>
      </CollapsibleButton>
      {isContentVisible && (
        <div>
          {accounts.map(account => (
            <SidebarButton
              key={account.id}
              className={cls(styles.sidebar_button, 'z_stack_margin_bottom_item_1 z_padding_left_2')}
              variant="base"
            >
              <a className={styles.edit_icon} onClick={() => (modalIsOpen.value = account.id)}>
                <MdEdit />
              </a>
              <Modal
                isOpen={modalIsOpen.value === account.id}
                className={styles.edit_account_modal_content}
                overlayClassName={styles.edit_account_modal_overlay}
              >
                <EditAccountForm isOpen={modalIsOpen} account={account} />
              </Modal>
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
