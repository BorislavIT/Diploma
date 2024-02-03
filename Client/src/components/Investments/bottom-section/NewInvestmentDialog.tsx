import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { FC, SetStateAction, useState } from "react";
import { useToast } from "@/contexts/ToastContext";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/redux/store";
import { INVESTMENT_STATUS, Investment } from "../constants";
import { createInvestmentAsync } from "../investmentsSlice";
import { Form, Formik, FormikHelpers } from "formik";
import FormikField from "@/components/formik/FormikField";
import * as Yup from "yup";

type NewInvestmentDialogProps = {
  isVisible: boolean;
  setIsCreationModalVisible: (value: SetStateAction<boolean>) => void;
};

const initialFormValues: Investment = {
  type: "",
  name: "",
  status: INVESTMENT_STATUS.ACTIVE,
  value: 0,
};

const NewInvestmentDialog: FC<NewInvestmentDialogProps> = ({
  isVisible,
  setIsCreationModalVisible,
}) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [newInvestment, setNewInvestment] = useState<Investment | null>(null);

  const onCloseInvestmentsModal = () => {
    setIsCreationModalVisible(false);
    setNewInvestment(null);
  };

  const InvestmentSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required Field")
      .min(3, "Name should contain at least 3 characters")
      .max(40, "Name should not contain more than 40 characters."),
    type: Yup.string()
      .required("Required Field")
      .min(3, "Type should contain at least 3 characters")
      .max(40, "Type should not contain more than 40 characters."),
    value: Yup.number()
      .min(1, "Value must be greater than 0")
      .required("Required Field"),
  });

  const onSubmit = async (
    values: Investment,
    actions: FormikHelpers<Investment>
  ) => {
    try {
      const investmentData: Investment = {
        ...values,
        value: Number(values.value),
      };
      const actionResult = await dispatch(
        createInvestmentAsync(investmentData)
      );
      unwrapResult(actionResult);
      toast.success("Investment created successfully!");
      onCloseInvestmentsModal();
    } catch (error) {
      toast.error("Failed to create investment");
    }
    actions.setSubmitting(false);
  };

  return (
    <Dialog
      draggable={false}
      header="New Investment"
      resizable={false}
      visible={isVisible}
      className="w-screen max-w-lg"
      onHide={onCloseInvestmentsModal}
      contentClassName="bg-theme-primary"
      headerClassName="bg-theme-primary text-theme-text"
    >
      <Formik
        initialValues={initialFormValues}
        validationSchema={InvestmentSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="w-full flex flex-col flex-wrap gap-4">
            <FormikField
              name="name"
              label="Name"
              errors={errors}
              touched={touched}
            />
            <FormikField
              name="type"
              label="Type"
              errors={errors}
              touched={touched}
            />
            <FormikField
              name="value"
              label="Value"
              errors={errors}
              touched={touched}
            />
            <div className="w-full text-theme-text text-right mt-2">
              <Button type="submit" disabled={isSubmitting}>
                Create
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default NewInvestmentDialog;
