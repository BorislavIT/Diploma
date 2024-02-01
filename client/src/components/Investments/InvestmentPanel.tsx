import InvestmentsCountWidget from "./InvestmentsCountWidget";
import InvestmentsDistribution from "./InvestmentsDistribution";
import InvestmentsTotal from "./InvestmentsTotal";

const InvestmentPanel = () => {
  return (
    <section className="flex flex-row flex-wrap gap-4 w-full border-b border-theme-border border-solid pb-8">
      <InvestmentsCountWidget />
      <InvestmentsTotal />
      <InvestmentsDistribution />
    </section>
  );
};

export default InvestmentPanel;
