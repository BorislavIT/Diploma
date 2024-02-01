import { FC } from "react";
import { InvestmentCard } from "./constants";

type IndividualInvestmentCard = {
  card: InvestmentCard;
};

const IndividualInvestmentCard: FC<IndividualInvestmentCard> = ({
  card: { name, date, status, type, value },
}) => {
  return (
    <article className="min-w-40 w-full sm:w-[calc(50%-12px)] md:w-[calc(33%-12px)] lg:w-[calc(25%-12px)] border border-theme-border border-solid rounded-md flex flex-col flex-wrap items-center text-theme-text p-2">
      <section className="w-full text-center border-b border-theme-border border-solid pb-2">
        Name: {name}
      </section>
      <section className="w-full text-center border-b border-theme-border border-solid py-2">
        Type: {type}
      </section>
      <section className="w-full text-center border-b border-theme-border border-solid py-2">
        Status: {status}
      </section>
      <section className="w-full text-center border-b border-theme-border border-solid py-2">
        Date: {date}
      </section>
      <section className="w-full text-center pt-2">Value: {value}</section>
    </article>
  );
};

export default IndividualInvestmentCard;
