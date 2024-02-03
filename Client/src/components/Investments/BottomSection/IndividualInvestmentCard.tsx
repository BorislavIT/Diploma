import { FC } from "react";
import { useAppDispatch } from "@/redux/store";
import { closeInvestmentAsync } from "./investmentsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useToast } from "@/contexts/ToastContext";
import { Button } from "primereact/button";
import {
  Investment,
  INVESTMENT_STATUS,
  INVESTMENT_STATUS_VALUES,
} from "../constants";

type IndividualInvestmentCard = {
  card: Investment;
};

const IndividualInvestmentCard: FC<IndividualInvestmentCard> = ({
  card: { name, dateOfCreation, status, type, value, id },
}) => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const localeDate = new Date(dateOfCreation!).toLocaleDateString();

  const onInvestmentClose = async (id: string) => {
    try {
      const actionResult = await dispatch(closeInvestmentAsync(id));
      unwrapResult(actionResult);
      toast.success("Investment closed successfully!");
    } catch (error: any) {
      toast.error(`Failed to close investment`);
    }
  };

  return (
    <article className="min-w-40 w-full sm:w-[calc(50%-12px)] md:w-[calc(33%-12px)] lg:w-[calc(25%-12px)] border h-fit border-theme-border border-solid rounded-md flex flex-col flex-wrap items-center text-theme-text p-2">
      <section className="w-full  border-b border-theme-border border-solid pb-2 overflow-hidden text-ellipsis whitespace-nowrap px-4">
        Name: {name}
      </section>
      <section className="w-full  border-b border-theme-border border-solid py-2 overflow-hidden text-ellipsis whitespace-nowrap px-4">
        Type: {type}
      </section>
      <section className="w-full  border-b border-theme-border border-solid py-2 overflow-hidden text-ellipsis whitespace-nowrap px-4">
        Status: {INVESTMENT_STATUS_VALUES[status]}
      </section>
      <section className="w-full  border-b border-theme-border border-solid py-2 overflow-hidden text-ellipsis whitespace-nowrap px-4">
        Date: {localeDate}
      </section>
      <section
        className={`w-full px-4 pt-2 overflow-hidden text-ellipsis whitespace-nowrap ${
          status === INVESTMENT_STATUS.ACTIVE &&
          "border-b border-theme-border border-solid pb-2"
        }`}
        title={value + ""}
      >
        Value: {value}
      </section>
      {status === INVESTMENT_STATUS.ACTIVE && (
        <section className="w-full text-center pt-4">
          <Button onClick={() => onInvestmentClose(id!)}>Close</Button>
        </section>
      )}
    </article>
  );
};

export default IndividualInvestmentCard;
