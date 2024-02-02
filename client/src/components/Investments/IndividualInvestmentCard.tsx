import { FC } from "react";
import { INVESTMENT_STATUS, InvestmentCard } from "./constants";
import { useDispatch } from "react-redux";
import { removeInvestment } from "./investmentsSlice";
import Button from "../Button";

type IndividualInvestmentCard = {
  card: InvestmentCard;
};

const IndividualInvestmentCard: FC<IndividualInvestmentCard> = ({
  card: { name, date, status, type, value, id },
}) => {
  const dispatch = useDispatch();

  const onCloseCardClicked = () => {
    dispatch(removeInvestment(id));
  };
  return (
    <article className="min-w-40 w-full sm:w-[calc(50%-12px)] md:w-[calc(33%-12px)] lg:w-[calc(25%-12px)] border h-fit border-theme-border border-solid rounded-md flex flex-col flex-wrap items-center text-theme-text p-2">
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
      <section
        className={`w-full text-center pt-2 ${
          status === INVESTMENT_STATUS.ACTIVE &&
          "border-b border-theme-border border-solid pb-2"
        }`}
      >
        Value: {value}
      </section>
      {status === INVESTMENT_STATUS.ACTIVE && (
        <section className="w-full text-center pt-2">
          <Button onClick={onCloseCardClicked}>Close</Button>
        </section>
      )}
    </article>
  );
};

export default IndividualInvestmentCard;
