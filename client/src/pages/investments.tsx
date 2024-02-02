import Button from "@/components/Button";
import InvestmentPanel from "@/components/Investments/InvestmentPanel";
import InvestmentsCards from "@/components/Investments/InvestmentsCards";
import Head from "next/head";

export const InvestmentsPage = () => {
  const onNewInvestmentClicked = () => {
    console.log("yo");
  };

  return (
    <>
      <Head>
        <title>Investments Page</title>
        <meta
          name="description"
          content="In this page you can view your investments and interact with them."
        />
      </Head>
      <div className="w-full h-auto">
        <section className="w-full flex justify-center flex-row flex-wrap">
          <h1 className="w-full self-center text-theme-text font-bold text-4xl text-center mb-8">
            Investments summary
          </h1>
          <InvestmentPanel />
          <h1 className="text-theme-text font-bold text-4xl mb-8 mt-8 flex w-full flex-row flex-nowrap justify-between">
            <div className="self-center">All Investments</div>
            <div className="self-center">
              <Button onClick={onNewInvestmentClicked}>
                <span className="hidden md:inline">
                  Create New Investment&nbsp;
                </span>
                +
              </Button>
            </div>
          </h1>
          <InvestmentsCards />
        </section>
      </div>
    </>
  );
};

export default InvestmentsPage;
