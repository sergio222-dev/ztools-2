import { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5percent from '@amcharts/amcharts5/percent';
import { Signal } from '@preact/signals-react';
import { CategoryAnalytics } from '@core/budget/category/domain/CategoryAnalytics';

interface SpendingPieChartProperties {
  analyticsData: Signal<CategoryAnalytics[]>;
}
export function SpendingPieChart({ analyticsData }: SpendingPieChartProperties) {
  useLayoutEffect(() => {
    const root = am5.Root.new('SpendingPieChartDiv');

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        innerRadius: am5.percent(60),
        tooltip: am5.Tooltip.new(root, {
          autoTextColor: false,
          getFillFromSprite: false,
        }),
      }),
    );

    const tooltip = chart.getTooltip();

    // TOOLTIP STYLE
    tooltip?.get('background')?.setAll({
      fill: am5.color('#fff'),
      fillOpacity: 1,
      shadowColor: am5.color('#000'),
      shadowBlur: 15,
      shadowOffsetX: 0,
      shadowOffsetY: 5,
      shadowOpacity: 0.2,
    });

    tooltip?.label.setAll({
      fill: am5.color('#000'),
    });

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: 'Budget',
        categoryField: 'categoryName',
        valueField: 'totalOutflow',
      }),
    );

    // set data
    const data: { categoryName: string; totalOutflow: string }[] = analyticsData.value.map(analytics => {
      return {
        categoryName: analytics.categoryName,
        totalOutflow: analytics.totalOutflow,
      };
    });

    series.data.setAll(data);
    series.ticks.template.set('visible', false);
    series.labels.template.set('visible', false);

    series.slices.template.set(
      'tooltipText',
      "{categoryName}:\n[bold]${totalOutflow.formatNumber('#,###.00')}\n[/]{valuePercentTotal.formatNumber('0.00')}% of Total",
    );

    series.children.push(
      am5.Label.new(root, {
        text: "All Categories\n${valueAbsoluteSum.formatNumber('#,###.00')}",
        fontSize: 16,
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        populateText: true,
        oversizedBehavior: 'fit',
      }),
    );

    return () => {
      root.dispose();
    };
  }, [analyticsData.value]);

  return <div id="SpendingPieChartDiv" style={{ width: '100%', height: '500px' }} />;
}
