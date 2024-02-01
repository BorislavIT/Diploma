import InvestmentsWidget from "./InvestmentsWidget";

const InvestmentsTotal = () => {
  return (
    <InvestmentsWidget width="xl:w-[calc(33%-6px)] lg:w-[calc(50%-8px)] w-full">
      <div className="flex flex-row flex-wrap w-full h-full font-bold text-3xl sm:text-4xl text-theme-text">
        <section className="label-row w-full flex flex-col flex-wrap border-2 border-theme-border border-solid rounded-md">
          <div className="w-full flex h-1/2 justify-center items-center border-b-2 border-theme-border border-solid">
            40504&nbsp;$
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
