import PieChart from "../Charts/PieChart";
import InvestmentsWidget from "./InvestmentsWidget";

const InvestmentsDistribution = () => {
  const pieChartData = [
    { name: "Land", y: 30 },
    { name: "Gold", y: 60 },
    { name: "Cash", y: 2 },
    { name: "Stocks", y: 12 },
    { name: "Crypto", y: 120 },
  ];

  return (
    <InvestmentsWidget width="xl:w-[calc(33%-6px)] w-full">
      <div className="flex flex-row flex-wrap w-full h-full font-bold text-3xl sm:text-4xl text-theme-text">
        <section className="label-row w-full flex-wrap border-2 border-theme-border border-solid rounded-md justify-center items-center">
          <PieChart data={pieChartData} />
        </section>
      </div>
    </InvestmentsWidget>
  );
};

export default InvestmentsDistribution;
