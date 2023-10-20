import { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5percent from '@amcharts/amcharts5/percent';
export function SpendingPieChart() {
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

    // Mock data
    const data = [
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

  return <div id="SpendingPieChartDiv" style={{ width: '100%', height: '500px' }} />;
}
