import { FC } from "react";
import { Field, FormikErrors, FormikTouched } from "formik";

type FormikFieldProps = {
  name: string;
  label: string;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
};

const FormikField: FC<FormikFieldProps> = ({
  name,
  errors,
  label,
  touched,
}) => {
  const errorMessage =
    errors[name] && touched[name] && (errors[name] as string);

  return (
    <div className="w-full text-theme-text">
      <label htmlFor={name}>{label}</label>
      <Field name={name} id={name} className="w-full p-inputtext" />
      <p className="text-red-500">{errorMessage}</p>
    </div>
  );
};

export default FormikField;
