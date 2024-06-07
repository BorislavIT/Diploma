import { FC } from "react";
import { Field, FieldProps, FormikErrors, FormikTouched } from "formik";

type FormikFieldProps = {
  name: string;
  label: string;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  type?: string;
};

const FormikField: FC<FormikFieldProps> = ({
  name,
  errors,
  label,
  touched,
  type = "text",
}) => {
  const errorMessage =
    errors[name] && touched[name] && (errors[name] as string);

  return (
    <div className="w-full">
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ form }: FieldProps) => (
          <input
            type={type}
            id={name}
            className={`w-full p-inputtext h-11 text-theme-value pl-2 text-black ${
              type === "file" && "input-file"
            }`}
            onChange={(event) => {
              if (type === "file") {
                form.setFieldValue(name, event?.currentTarget?.files?.[0]);
              } else {
                form.handleChange(event);
              }
            }}
          />
        )}
      </Field>
      <p className="text-red-500 mt-1">{errorMessage}</p>
    </div>
  );
};

export default FormikField;
