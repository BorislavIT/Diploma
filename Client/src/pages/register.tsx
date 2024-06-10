import { useShopMutation } from "@/shared/queries";
import { useRouter } from "next/router";
import { ENDPOINTS, MODULES } from "@/shared/constants";
import { useToast } from "@/contexts/ToastContext";
import { useEffect } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import FormikField from "@/components/formik/FormikField";
import Logo from "@/shared/pictures/Logo";
import Button from "@/components/Button";
import * as Yup from "yup";

type RegisterForm = {
  username: string;
  password: string;
  confirmPassword: string;
};

const initialRegisterFormValues: RegisterForm = {
  username: "",
  password: "",
  confirmPassword: "",
};

const registerSchema = Yup.object().shape({
  username: Yup.string()
    .required("Required field")
    .min(3, "Username should contain at least 3 characters")
    .max(40, "Username should not contain more than 40 characters."),
  password: Yup.string()
    .required("Required field")
    .min(3, "Password should contain at least 3 characters")
    .max(40, "Password should not contain more than 40 characters."),
  confirmPassword: Yup.string()
    .required("Required field")
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .min(3, "Password should contain at least 3 characters")
    .max(40, "Password should not contain more than 40 characters."),
});

const Register = () => {
  const router = useRouter();
  const toast = useToast();
  const mutation = useShopMutation<{ success: boolean }, RegisterForm>(
    `${ENDPOINTS.ACCOUNT.PATH}${ENDPOINTS.ACCOUNT.REGISTER}`
  );

  const onSubmit = async (
    { username, password, confirmPassword }: RegisterForm,
    actions: FormikHelpers<RegisterForm>
  ) => {
    try {
      const res = await mutation.mutateAsync({
        username,
        password,
        confirmPassword,
      });

      toast.success(`Welcome ${username}`);
      global.isAuthorized = true;
      router.push("/");
    } catch (error) {
      toast.error((error as any).response?.data?.error as string);
    }
    actions.setSubmitting(false);
  };

  useEffect(() => {
    if (global.isAuthorized) {
      router.push("/");
    }
  }, []);

  return (
    <div className="w-full flex justify-center items-center h-full">
      <div className="flex h-auto w-1/2 items-center justify-center flex-col">
        <Logo />
        <Formik
          initialValues={{ ...initialRegisterFormValues }}
          validationSchema={registerSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="w-full flex flex-col flex-wrap gap-4">
              <FormikField
                name="username"
                label="Username"
                errors={errors}
                touched={touched}
              />
              <FormikField
                name="password"
                type="password"
                label="Password"
                errors={errors}
                touched={touched}
              />
              <FormikField
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                errors={errors}
                touched={touched}
              />
              <div className="w-full text-center text-theme-text mt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full justify-center h-11"
                >
                  REGISTER
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <span className="text-theme-text mt-4">
          Already have an account?&nbsp;
          <span
            className="underline cursor-pointer"
            onClick={() => router.push(MODULES.ACCOUNT.LOGIN)}
          >
            LOGIN
          </span>
          &nbsp;here.
        </span>
      </div>
    </div>
  );
};

export default Register;
