import styles from './ReportsPage.module.scss';
import { SpendingPieChart } from '../../charts/SpendingPieChart';
import { Button } from '@atoms/Button/Button';
import { Typography } from '@atoms/Typography/Typography';
import { useCategoryHook } from '@core/budget/category/application/adapter/useCategory.hook';
import { useSignal } from '@preact/signals-react';
import { CategoryAnalytics } from '@core/budget/category/domain/CategoryAnalytics';
import { useEffect } from 'react';
import currency from 'currency.js';

export function ReportsPageView() {
  const { getAllCategoryAnalytics } = useCategoryHook(new Date());
  const analyticsData = useSignal<CategoryAnalytics[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        analyticsData.value = await getAllCategoryAnalytics();
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    }

    void fetchData();
  }, []);

  return (
    <div className={styles.reports_page}>
      <section className={styles.reports_page_header}>
        <Button variant={'transparent'} active={true}>
          <Typography variant={'normal'} size={'large'}>
            Spending
          </Typography>
        </Button>
      </section>
      <section className={styles.reports_page_spending}>
        <div className={styles.spending_container}>
          <div className={styles.spending_header}>
            <Typography variant={'title'} size={'large'} Component={'h1'}>
              Spending Totals
            </Typography>
          </div>
          <div className={styles.spending_sub_header}>
            <Typography variant={'info'} size={'normal'}>
              All Categories
            </Typography>
          </div>
          <div>
            <SpendingPieChart analyticsData={analyticsData} />
          </div>
        </div>
        <aside className={styles.reports_page_spending_aside}>
          <table className={styles.reports_page_spending_table} style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>
                  <Typography>Category</Typography>
                </th>
                <th style={{ textAlign: 'right' }}>
                  <Typography>Amount</Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.value.map(analytics => {
                return (
                  <tr key={analytics.categoryName}>
                    <td style={{ textAlign: 'left' }}>
                      <Typography>{analytics.categoryName}</Typography>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <Typography>{currency(analytics.totalOutflow).format()}</Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </aside>
      </section>
    </div>
  );
}
