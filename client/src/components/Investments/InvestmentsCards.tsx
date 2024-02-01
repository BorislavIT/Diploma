import { useState } from "react";
import { INVESTMENT_STATUS, InvestmentCard } from "./constants";
import IndividualInvestmentCard from "./IndividualInvestmentCard";

const InvestmentsCards = () => {
  const [investmentCards, setInvestmentCards] = useState<InvestmentCard[]>([
    {
      name: "CARD1",
      date: "a",
      status: INVESTMENT_STATUS.ACTIVE,
      type: "gold",
      value: "124",
      id: "a6sd",
    },
    {
      name: "CARD2",
      date: "a",
      status: INVESTMENT_STATUS.ACTIVE,
      type: "gold",
      value: "166",
      id: "5asd",
    },
    {
      name: "CARD3",
      date: "a",
      status: INVESTMENT_STATUS.ACTIVE,
      type: "gold",
      value: "178",
      id: "as4d",
    },
    {
      name: "CARD4",
      date: "a",
      status: INVESTMENT_STATUS.ACTIVE,
      type: "gold",
      value: "22",
      id: "asd2",
    },
    {
      name: "CARD5",
      date: "a",
      status: INVESTMENT_STATUS.ACTIVE,
      type: "gold",
      value: "444",
      id: "asd",
    },
    {
      name: "CARD6",
      date: "a",
      status: INVESTMENT_STATUS.ACTIVE,
      type: "gold",
      value: "666",
      id: "asd1",
    },
  ]);

  return (
    <section className="flex flex-row flex-wrap gap-4 w-full">
      {investmentCards.map((ic) => (
        <IndividualInvestmentCard card={ic} key={ic.id} />
      ))}
    </section>
  );
};

export default InvestmentsCards;
