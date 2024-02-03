import { FC } from "react";
import { useSideNav } from "@/contexts/SideNavigationContext";
import { investmentSummary } from "../bottom-section/investmentsSlice";
import InvestmentsWidget from "./InvestmentsWidget";

type InvestmentsCountWidget = {
  summary: investmentSummary;
};

const InvestmentsTotal: FC<InvestmentsCountWidget> = ({ summary }) => {
  const { isExpanded } = useSideNav();
  return (
    <InvestmentsWidget
      width={`${
        isExpanded ? "x2l:w-[calc(33%-6px)]" : "xl:w-[calc(33%-6px)]"
      } lg:w-[calc(50%-8px)] w-full`}
    >
      <div className="flex flex-row flex-wrap w-full h-full font-bold text-xl sm:text-4xl text-theme-text">
        <section className="label-row w-full flex flex-col flex-wrap border-2 border-theme-border border-solid rounded-md">
          <div className="w-full flex h-1/2 justify-center items-center border-b-2 border-theme-border border-solid">
            <span
              className="overflow-hidden text-ellipsis whitespace-nowrap px-4"
              title={`${summary.total} $`}
            >
              {summary.total}&nbsp;$
            </span>
          </div>
          <div className="w-full flex h-1/2 justify-center items-center">
            TOTAL
          </div>
        </section>
      </div>
    </InvestmentsWidget>
  );
};

export default InvestmentsTotal;
