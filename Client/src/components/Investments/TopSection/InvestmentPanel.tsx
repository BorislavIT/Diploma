import { useAppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchInvestmentsSummary } from "../BottomSection/investmentsSlice";
import InvestmentsCountWidget from "./InvestmentsCountWidget";
import InvestmentsDistribution from "./InvestmentsDistribution";
import InvestmentsTotal from "./InvestmentsTotal";

const InvestmentPanel = () => {
  const dispatch = useAppDispatch();

  const { summary, error } = useSelector(
    (state: RootState) => state.investments
  );

  useEffect(() => {
    dispatch(fetchInvestmentsSummary());
  }, [dispatch]);

  if (error) return <span>{error}</span>;

  return (
    <section className="flex flex-row flex-wrap gap-4 w-full border-b border-theme-border border-solid pb-8">
      <InvestmentsCountWidget summary={summary} />
      <InvestmentsTotal summary={summary} />
      <InvestmentsDistribution summary={summary} />
    </section>
  );
};

export default InvestmentPanel;
