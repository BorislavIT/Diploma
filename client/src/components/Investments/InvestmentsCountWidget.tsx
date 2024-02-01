import InvestmentsWidget from "./InvestmentsWidget";

const InvestmentsCountWidget = () => {
  return (
    <InvestmentsWidget width="xl:w-[calc(33%-6px)] lg:w-[calc(50%-8px)] w-full">
      <div className="flex flex-row flex-wrap w-full h-full font-bold text-3xl sm:text-4xl text-theme-text">
        <section className="count-row w-full flex flex-row justify-between border-2 border-theme-border border-solid rounded-md rounded-b-none">
          <div className="w-1/2 flex justify-center items-center border-r border-theme-border border-solid">
            12
          </div>
          <div className="w-1/2 flex justify-center items-center">44</div>
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
