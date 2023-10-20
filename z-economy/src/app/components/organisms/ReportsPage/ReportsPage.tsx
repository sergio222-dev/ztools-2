import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import styles from './ReportsPage.module.scss';
import { useLayoutEffect } from 'react';

export function ReportsPageView() {
  useLayoutEffect(() => {
    let root = am5.Root.new('chartdiv');

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        innerRadius: am5.percent(60),
      }),
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: 'Budget',
        categoryField: 'categoryName',
        valueField: 'totalOutflow',
      }),
    );

    // Define data
    let data = [
      {
        categoryName: 'Research',
        totalOutflow: 500,
      },
      {
        categoryName: 'Marketing',
        totalOutflow: 1200,
      },
      {
        categoryName: 'Sales',
        totalOutflow: 850,
      },
    ];

    series.data.setAll(data);
    series.ticks.template.set('visible', false);
    series.labels.template.set('visible', false);

    series.slices.template.set(
      'tooltipText',
      "{categoryName}:\n[bold]${totalOutflow}\n[/]{valuePercentTotal.formatNumber('0.00')}% of Total",
    );

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div className={styles.reports_page}>
      <div id="chartdiv" style={{ width: '100%', height: '500px' }} />
    </div>
  );
}
