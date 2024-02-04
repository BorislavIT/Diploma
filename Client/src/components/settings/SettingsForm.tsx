import { useToast } from "@/contexts/ToastContext";
import { Form, Formik, FormikHelpers } from "formik";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Settings } from "./constants";
import { RootState, useAppDispatch } from "@/redux/store";
import { fetchSettingsAsync, updateSettingsAsync } from "./settingsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Button from "@/components/Button";
import FormikField from "@/components/formik/FormikField";
import * as Yup from "yup";

const initialFormValues: Settings = {
  firstName: "",
  lastName: "",
  age: 0,
};

const investmentSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Required Field")
    .min(3, "First name should contain at least 3 characters")
    .max(40, "First name should not contain more than 40 characters."),
  lastName: Yup.string()
    .required("Required Field")
    .min(3, " Last name should contain at least 3 characters")
    .max(40, "Last name should not contain more than 40 characters."),
  age: Yup.number()
    .min(18, "The minimum age is 18 years old.")
    .max(100, "YOU ARE NOT A VAMPIRE, CMON NOW!")
    .required("Required Field"),
});

const SettingsForm = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSettingsAsync());
  }, [dispatch]);

  const { settings, error } = useSelector((state: RootState) => state.settings);

  const onSubmit = async (
    values: Settings,
    actions: FormikHelpers<Settings>
  ) => {
    try {
      const investmentData: Settings = {
        ...values,
        age: Number(values.age),
      };

      const actionResult = await dispatch(updateSettingsAsync(investmentData));
      unwrapResult(actionResult);

      toast.success("Successfully saved your settings");
    } catch (error) {
      toast.error("Failed to save settings");
    }
    actions.setSubmitting(false);
  };

  if (error) return <span>{error}</span>;

  return (
    <>
      <Formik
        initialValues={{ ...initialFormValues, ...settings }}
        validationSchema={investmentSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="w-full flex flex-col flex-wrap gap-4">
            <FormikField
              name="firstName"
              label="First Name"
              errors={errors}
              touched={touched}
            />
            <FormikField
              name="lastName"
              label="Last Name"
              errors={errors}
              touched={touched}
            />
            <FormikField
              name="age"
              label="Age"
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
    </>
  );
};

export default SettingsForm;
