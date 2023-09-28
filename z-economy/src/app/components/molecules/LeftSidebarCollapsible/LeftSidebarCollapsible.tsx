import styles from './LeftSidebarCollapsible.module.scss';
import { CollapsibleButton } from '../../atoms';
import { MouseEvent, ReactNode, useRef, useState } from 'react';
import { SidebarButton } from '@atoms/Button/SidebarButton';
import cls from 'classnames';
import { Typography } from '@atoms/Typography/Typography';
import { Account } from '@core/budget/account/domain/Account';
import currency from 'currency.js';
import { MdEdit } from 'react-icons/md';
import Modal from 'react-modal';
import { useSignal } from '@preact/signals-react';
import { EditAccountForm } from '../../forms/EditAccount/EditAccountForm';
import { useNavigate } from 'react-router';

interface Collapsible {
  className?: string | undefined;
  Icon?: ReactNode | undefined;
  accounts: Account[];
}

export function LeftSidebarCollapsible({ className, Icon, accounts }: Collapsible) {
  // STATE
  const [isContentVisible, setIsContentVisible] = useState(true);
  const modalIsOpen = useSignal('');
  const overlayReference = useRef<HTMLDivElement>();

  // SERVICES
  const navigate = useNavigate();

  // FUNCTIONS
  const totalBudget = accounts
    // eslint-disable-next-line unicorn/no-array-reduce
    .reduce((total, account) => {
      return currency(total).add(currency(account.balance).value);
    }, currency(0))
    .format();

  const handleContentVisible = () => {
    setIsContentVisible(!isContentVisible);
  };

  const handleAccountButtonClick = (
    accountId: string,
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    if (event.target === overlayReference.current) return;
    navigate('/accounts/' + accountId);
  };

  const handleAccountEditOnCLick = (event: MouseEvent<HTMLAnchorElement>, accountId: string) => {
    event.preventDefault();
    modalIsOpen.value = accountId;
    event.stopPropagation();
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
              onClick={event => {
                handleAccountButtonClick(account.id, event);
              }}
            >
              <a
                className={styles.edit_icon}
                onClick={event => {
                  handleAccountEditOnCLick(event, account.id);
                }}
              >
                <MdEdit />
              </a>
              {modalIsOpen.value === account.id && (
                <Modal
                  isOpen={modalIsOpen.value === account.id}
                  className={styles.edit_account_modal_content}
                  overlayClassName={styles.edit_account_modal_overlay}
                  overlayRef={node => (overlayReference.current = node)}
                  shouldCloseOnEsc={true}
                  shouldCloseOnOverlayClick={false}
                  onRequestClose={() => {
                    modalIsOpen.value = '';
                  }}
                >
                  <div onClick={event => event.stopPropagation()}>
                    <EditAccountForm isOpen={modalIsOpen} account={account} />
                  </div>
                </Modal>
              )}
              <span className={styles.bank_name}>
                <Typography>{account.name}</Typography>
              </span>
              <span className={styles.amount}>
                <Typography>{currency(account.balance).format()}</Typography>
              </span>
            </SidebarButton>
          ))}
        </div>
      )}
    </div>
  );
}
