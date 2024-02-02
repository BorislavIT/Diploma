import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import { useTheme } from "@/contexts/ThemeContext";
import { THEME } from "@/constants";
import { FC } from "react";

// apparently this is a known issue, because the code execution happens twice with next.js (ssr and csr)
if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

interface InvestmentsDistributionPieChartProps {
  data: { name: string; y: number }[];
}

const InvestmentsDistributionPieChart: FC<
  InvestmentsDistributionPieChartProps
> = ({ data }) => {
  const { theme } = useTheme()!;

  const options: Highcharts.Options = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
      height: 380,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          style: {
            color: `${theme === THEME.DARK ? "white" : "black"}`,
          },
        },
      },
    },
    title: {
      text: "Distribution",
      style: {
        color: "var(--theme-text-color)",
      },
    },
    tooltip: { pointFormat: "{point.y}$" },
    series: [
      {
        type: "pie",
        data: data,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default InvestmentsDistributionPieChart;
