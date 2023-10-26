import { useEffect, useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5percent from '@amcharts/amcharts5/percent';
import { useCategoryHook } from '@core/budget/category/application/adapter/useCategory.hook';
import { useSignal } from '@preact/signals-react';
import { CategoryAnalytics } from '@core/budget/category/domain/CategoryAnalytics';

export function SpendingPieChart() {
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
    const data: any[] = analyticsData.value.map(analytics => {
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

    return () => {
      root.dispose();
    };
  }, [analyticsData.value]);

  return <div id="SpendingPieChartDiv" style={{ width: '100%', height: '500px' }} />;
}
