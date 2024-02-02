import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dispatch, FC, SetStateAction } from "react";
import { InvestmentCard } from "./constants";
import { useToast } from "@/contexts/ToastContext";
import { addInvestmentAsync } from "./investmentsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/redux/store";

type NewInvestmentDialogProps = {
  isVisible: boolean;
  newInvestment: InvestmentCard | null;
  setNewInvestment: Dispatch<SetStateAction<InvestmentCard | null>>;
  setIsCreationModalVisible: (value: SetStateAction<boolean>) => void;
};

const NewInvestmentDialog: FC<NewInvestmentDialogProps> = ({
  isVisible,
  newInvestment,
  setNewInvestment,
  setIsCreationModalVisible,
}) => {
  const dispatch = useAppDispatch();
  const toast = useToast()!;

  const onCloseInvestmentsModal = () => {
    setIsCreationModalVisible(false);
    setNewInvestment(null);
  };

  const onInvestmentCreate = async (investmentData: InvestmentCard) => {
    try {
      const actionResult = await dispatch(addInvestmentAsync(investmentData));
      unwrapResult(actionResult);
      toast.success("Investment added successfully!");
    } catch (error: any) {
      toast.error(`Failed to add investment`);
    }
  };

  const onCreateInvestmentClicked = () => {
    onInvestmentCreate(newInvestment!);
    onCloseInvestmentsModal();
  };

  return (
    <Dialog
      draggable={false}
      header="New Investment"
      resizable={false}
      visible={isVisible}
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
  );
};

export default NewInvestmentDialog;
