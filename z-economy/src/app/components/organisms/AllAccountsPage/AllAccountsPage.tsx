import styles from './AllAccountsPage.module.scss'
import cls from 'classnames';
export function AllAccountsPage() {
    return (
        <div className={cls(styles.all_accounts_page)}>
            <section className={cls('z_flex', styles.all_accounts_page_title)}>
                <h2>All Accounts</h2>
            </section>
            <section className={cls('z_flex', styles.balances)}>
                <div className={styles.balances_contents}>
                    <span className={styles.amount}>$299,000.00</span>
                    <span className={styles.balance_text}>Cleared Balance</span>
                </div>
                <div className={styles.balances_contents}>
                    <h3 className={styles.balances_h3}>+</h3>
                </div>
                <div className={styles.balances_contents}>
                    <span className={styles.amount}>$0.00</span>
                    <span className={styles.balance_text}>Uncleared Balance</span>
                </div>
                <div className={styles.balances_contents}>
                    <h3 className={styles.balances_h3}>=</h3>
                </div>
                <div className={styles.balances_contents}>
                    <span className={styles.amount}>$299,000.00</span>
                    <span className={styles.balance_text}>Working Balance</span>
                </div>
            </section>
            <section className={cls('z_flex',styles.all_accounts_table)}>
                <div>Aca hay tabla</div>
            </section>
        </div>
    );
}