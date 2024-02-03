import { useState } from "react";
import Head from "next/head";
import Button from "@/components/Button";
import InvestmentsCards from "@/components/investments/bottom-section/InvestmentsCards";
import NewInvestmentDialog from "@/components/investments/bottom-section/NewInvestmentDialog";
import InvestmentPanel from "@/components/investments/top-section/InvestmentPanel";

export const InvestmentsPage = () => {
  const [isCreationModalVisible, setIsCreationModalVisible] =
    useState<boolean>(false);

  const onNewInvestmentClicked = () => {
    setIsCreationModalVisible(true);
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
      <NewInvestmentDialog
        isVisible={isCreationModalVisible}
        setIsCreationModalVisible={setIsCreationModalVisible}
      />
      <div className="w-full h-auto">
        <section className="w-full flex justify-center flex-row flex-wrap">
          <h1 className="w-full text-theme-text font-bold text-2xl sm:text-4xl mb-8">
            Investments summary
          </h1>
          <InvestmentPanel />
          <h1 className="text-theme-text font-bold text-4xl mb-8 mt-8 flex w-full flex-col sm:flex-row flex-wrap sm:flex-nowrap sm:justify-between">
            <div className="sm:mb-0 mb-4 text-2xl sm:text-4xl">
              All Investments
            </div>
            <div>
              <Button onClick={onNewInvestmentClicked}>
                <span className="hidden md:inline">
                  Create New Investment&nbsp;
                </span>
                <span className="text-lg md:hidden">+</span>
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
