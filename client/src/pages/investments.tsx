import Head from "next/head";
import Button from "@/components/Button";
import InvestmentPanel from "@/components/Investments/InvestmentPanel";
import InvestmentsCards from "@/components/Investments/InvestmentsCards";
import {
  INVESTMENT_STATUS,
  InvestmentCard,
} from "@/components/Investments/constants";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { addInvestment } from "@/components/Investments/investmentsSlice";
import { useDispatch } from "react-redux";

export const InvestmentsPage = () => {
  const [isCreationModalVisible, setIsCreationModalVisible] =
    useState<boolean>(false);

  const dispatch = useDispatch();

  const [newInvestment, setNewInvestment] = useState<InvestmentCard | null>(
    null
  );

  const onNewInvestmentClicked = () => {
    setIsCreationModalVisible(true);
  };

  const onCloseInvestmentsModal = () => {
    setIsCreationModalVisible(false);
    setNewInvestment(null);
  };

  const onCreateInvestmentClicked = () => {
    dispatch(
      addInvestment({
        ...newInvestment!,
        id: "asdokadfgkiadf" + Math.random(),
        date: new Date().toLocaleDateString(),
        status: INVESTMENT_STATUS.ACTIVE,
      })
    );
    onCloseInvestmentsModal();
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
      <Dialog
        draggable={false}
        header="New Investment"
        resizable={false}
        visible={isCreationModalVisible}
        className="w-screen max-w-96"
        onHide={onCloseInvestmentsModal}
        contentClassName="bg-theme-primary"
        headerClassName="bg-theme-primary text-theme-text"
      >
        <div className="w-full flex flex-col flex-wrap gap-4">
          <section className="w-full text-theme-text">
            <label>Name</label>
            <span className="p-float-label w-full">
              <InputText
                className="w-full"
                onChange={(e) => {
                  setNewInvestment({
                    ...newInvestment!,
                    name: e.target.value,
                  });
                }}
              />
            </span>
          </section>
          <section className="w-full text-theme-text">
            <label>Type</label>
            <span className="p-float-label w-full">
              <InputText
                className="w-full"
                onChange={(e) => {
                  setNewInvestment({
                    ...newInvestment!,
                    type: e.target.value,
                  });
                }}
              />
            </span>
          </section>
          <section className="w-full text-theme-text">
            <label>Value</label>
            <span className="p-float-label w-full">
              <InputNumber
                className="w-full"
                onChange={(e) => {
                  setNewInvestment({
                    ...newInvestment!,
                    value: e.value + "",
                  });
                }}
              />
            </span>
          </section>
          <section className="w-full text-theme-text text-right">
            <Button onClick={onCreateInvestmentClicked}>Create</Button>
          </section>
        </div>
      </Dialog>
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
