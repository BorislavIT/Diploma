import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { fetchAllInvestmentsAsync } from "./investmentsSlice";
import IndividualInvestmentCard from "./IndividualInvestmentCard";

const InvestmentsCards = () => {
  const dispatch = useAppDispatch();

  const { data, isLoading } = useSelector(
    (state: RootState) => state.investments
  );

  useEffect(() => {
    dispatch(fetchAllInvestmentsAsync());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="flex flex-row flex-wrap gap-4 w-full">
      {data.map((i) => (
        <IndividualInvestmentCard card={i} key={i.id} />
      ))}
    </section>
  );
};

export default InvestmentsCards;
