import Head from "next/head";
import Button from "@/components/Button";
import InvestmentPanel from "@/components/Investments/InvestmentPanel";
import InvestmentsCards from "@/components/Investments/InvestmentsCards";
import NewInvestmentDialog from "@/components/Investments/NewInvestmentDialog";
import { InvestmentCard } from "@/components/Investments/constants";
import { useState } from "react";

export const InvestmentsPage = () => {
  const [isCreationModalVisible, setIsCreationModalVisible] =
    useState<boolean>(false);

  const [newInvestment, setNewInvestment] = useState<InvestmentCard | null>(
    null
  );

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
        setNewInvestment={setNewInvestment}
        newInvestment={newInvestment}
      />
      <div className="w-full h-auto">
        <section className="w-full flex justify-center flex-row flex-wrap">
          <h1 className="w-full self-center text-theme-text font-bold text-2xl sm:text-4xl text-center mb-8">
            Investments summary
          </h1>
          <InvestmentPanel />
          <h1 className="text-theme-text font-bold text-4xl mb-8 mt-8 flex w-full flex-col sm:flex-row flex-wrap sm:flex-nowrap sm:justify-between">
            <div className="sm:mb-0 mb-4 text-2xl">All Investments</div>
            <div>
              <Button onClick={onNewInvestmentClicked}>
                <span className="hidden md:inline">
                  Create New Investment&nbsp;
                </span>
                <span className="text-lg">+</span>
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
