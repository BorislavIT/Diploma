import { FC } from "react";
import { useSideNav } from "@/contexts/SideNavigationContext";
import { InvestmentsSummary } from "../investmentsSlice";
import InvestmentsWidget from "./InvestmentsWidget";

type InvestmentsCountWidget = {
  summary: InvestmentsSummary;
};

const InvestmentsCountWidget: FC<InvestmentsCountWidget> = ({ summary }) => {
  const { isExpanded } = useSideNav();

  return (
    <InvestmentsWidget
      width={`${
        isExpanded ? "x2l:w-[calc(33%-6px)]" : "xl:w-[calc(33%-6px)]"
      } lg:w-[calc(50%-8px)] w-full`}
    >
      <div className="flex flex-row flex-wrap w-full h-full font-bold text-xl sm:text-4xl text-theme-text">
        <section className="count-row w-full flex flex-row justify-between border-2 border-theme-border border-solid rounded-md rounded-b-none">
          <div className="w-1/2 flex justify-center items-center border-r border-theme-border border-solid overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
            <span
              className="overflow-hidden text-ellipsis whitespace-nowrap px-4"
              title="123123213123213123213213213"
            >
              {summary.activeInvestments}
            </span>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <span
              className="overflow-hidden text-ellipsis whitespace-nowrap px-4"
              title="123123213123213123213213213"
            >
              {summary.closedInvestments}
            </span>
          </div>
        </section>
        <section className="label-row w-full flex flex-row justify-between border-2 border-theme-border border-solid border-t-0 rounded-md rounded-t-none">
          <div className="w-1/2 flex justify-center items-center border-r border-theme-border border-solid">
            ACTIVE
          </div>
          <div className="w-1/2 flex justify-center items-center">CLOSED</div>
        </section>
      </div>
    </InvestmentsWidget>
  );
};

export default InvestmentsCountWidget;
