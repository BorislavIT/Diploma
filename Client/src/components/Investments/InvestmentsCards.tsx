import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import IndividualInvestmentCard from "./IndividualInvestmentCard";

const InvestmentsCards = () => {
  const investmentCards = useSelector(
    (state: RootState) => state.investmentCards
  );

  return (
    <section className="flex flex-row flex-wrap gap-4 w-full">
      {investmentCards.map((ic) => (
        <IndividualInvestmentCard card={ic} key={ic.id} />
      ))}
    </section>
  );
};

export default InvestmentsCards;
