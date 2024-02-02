import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dispatch, FC, SetStateAction } from "react";
import { INVESTMENT_STATUS, InvestmentCard } from "./constants";
import { addInvestment } from "./investmentsSlice";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

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
