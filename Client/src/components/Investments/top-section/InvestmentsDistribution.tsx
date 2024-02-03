import { investmentSummary } from "../bottom-section/investmentsSlice";
import { FC } from "react";
import { useSideNav } from "@/contexts/SideNavigationContext";
import InvestmentsDistributionPieChart from "@/components/Charts/InvestmentsDistributionPieChart";
import InvestmentsWidget from "./InvestmentsWidget";

type InvestmentsCountWidget = {
  summary: investmentSummary;
};

const InvestmentsDistribution: FC<InvestmentsCountWidget> = ({ summary }) => {
  const { isExpanded } = useSideNav();

  const pieChartData = summary.distributedValues.map((dv) => {
    return {
      name: dv.type,
      y: dv.value,
    };
  });

  return (
    <InvestmentsWidget
      width={`${
        isExpanded ? "x2l:w-[calc(33%-6px)]" : "xl:w-[calc(33%-6px)]"
      } w-full`}
    >
      <div className="flex flex-row flex-wrap w-full h-full font-bold text-xl sm:text-4xl text-theme-text">
        <section className="label-row w-full flex-wrap border-2 border-theme-border border-solid rounded-md justify-center items-center">
          <InvestmentsDistributionPieChart data={pieChartData} />
        </section>
      </div>
    </InvestmentsWidget>
  );
};

export default InvestmentsDistribution;
