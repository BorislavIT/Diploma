import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { fetchAllInvestmentsAsync } from "../investmentsSlice";
import IndividualInvestmentCard from "./IndividualInvestmentCard";

const InvestmentsCards = () => {
  const dispatch = useAppDispatch();

  const { data, error } = useSelector((state: RootState) => state.investments);

  useEffect(() => {
    dispatch(fetchAllInvestmentsAsync());
  }, [dispatch]);

  if (error) return <span>{error}</span>;

  return (
    <section className="flex flex-row flex-wrap gap-4 w-full">
      {data.map((i) => (
        <IndividualInvestmentCard card={i} key={i.id} />
      ))}
    </section>
  );
};

export default InvestmentsCards;
