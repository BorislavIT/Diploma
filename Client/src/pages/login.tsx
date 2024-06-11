import { useShopMutation } from "@/shared/queries";
import { useRouter } from "next/router";
import { ENDPOINTS, MODULES } from "@/shared/constants";
import { useToast } from "@/contexts/ToastContext";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormikField from "@/components/formik/FormikField";
import Logo from "@/shared/pictures/Logo";
import Button from "@/components/Button";

type LoginForm = {
  username: string;
  password: string;
};

const initialLoginFormValues: LoginForm = {
  username: "",
  password: "",
};

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Required field")
    .min(3, "Username should contain at least 3 characters")
    .max(40, "Username should not contain more than 40 characters."),
  password: Yup.string()
    .required("Required field")
    .min(3, "Password should contain at least 3 characters")
    .max(40, "Password should not contain more than 40 characters."),
});

const Login = () => {
  const router = useRouter();
  const toast = useToast();
  const { mutateAsync: signIn } = useShopMutation<
    { success: boolean },
    LoginForm
  >(`${ENDPOINTS.ACCOUNT.PATH}${ENDPOINTS.ACCOUNT.LOGIN}`);

  const onSubmit = async (
    { username, password }: LoginForm,
    actions: FormikHelpers<LoginForm>
  ) => {
    try {
      await signIn({ username, password });
      toast.success(`Welcome ${username}`);
      global.isAuthorized = true;
      router.push("/");
    } catch (error) {
      toast.error((error as any).response?.data?.error as string);
    }
    actions.setSubmitting(false);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex h-auto w-1/2 items-center justify-center flex-col">
        <Logo />
        <Formik
          initialValues={{ ...initialLoginFormValues }}
          validationSchema={loginSchema}
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
                label="Password"
                type="password"
                errors={errors}
                touched={touched}
              />
              <div className="w-full text-center text-theme-text mt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full justify-center h-11"
                >
                  LOGIN
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <span className="text-theme-text mt-4">
          Don't have an account?&nbsp;
          <span
            className="underline cursor-pointer"
            onClick={() => router.push(MODULES.ACCOUNT.REGISTER)}
          >
            REGISTER
          </span>
          &nbsp;here.
        </span>
      </div>
    </div>
  );
};

export default Login;
