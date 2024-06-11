import { useShopMutation } from "@/shared/queries";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { ENDPOINTS } from "@/shared/constants";
import { useToast } from "@/contexts/ToastContext";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormikField from "@/components/formik/FormikField";
import Button from "@/components/Button";
import useAccount from "@/shared/react-query-hooks/useAccount";
import { useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

export enum Mp3Type {
  Song,
  Podcast,
}

type Mp3Form = {
  name: string;
  price: number;
  mp3Type: Mp3Type;
  author: string;
  accountId: number;
  mp3File: File | null;
  thumbnail: File | null;
};

const initialMp3FormValues: Mp3Form = {
  name: "",
  price: 0,
  mp3Type: Mp3Type.Song,
  author: "",
  accountId: 0,
  mp3File: null,
  thumbnail: null,
};

const mp3Schema = Yup.object().shape({
  name: Yup.string()
    .required("Required field")
    .min(3, "Username should contain at least 3 characters")
    .max(40, "Username should not contain more than 40 characters."),
  author: Yup.string()
    .required("Required field")
    .min(1, "Username should contain at least 3 characters")
    .max(40, "Username should not contain more than 40 characters."),
  price: Yup.number().required().min(1).max(999),
  mp3File: Yup.mixed().required("An mp3 file is required"),
  thumbnail: Yup.mixed().required("A thumbnail is required"),
});

const Mp3 = () => {
  const router = useRouter();
  const toast = useToast();
  const { data } = useAccount();
  const queryClient = useQueryClient();
  const { mutateAsync: addMp3 } = useShopMutation<
    { success: boolean },
    FormData
  >(`${ENDPOINTS.MP3S.PATH}`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const mp3Types = [
    { label: "Song", value: Mp3Type.Song },
    { label: "Podcast", value: Mp3Type.Podcast },
  ];

  const [mp3Type, setMp3Type] = useState({
    label: "Song",
    value: Mp3Type.Song,
  });

  const onSubmit = async (
    { name, price, author, mp3File, thumbnail }: Mp3Form,
    actions: FormikHelpers<Mp3Form>
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price.toString());
      formData.append("mp3Type", mp3Type.value.toString());
      formData.append("author", author);
      formData.append("accountId", (data?.Id || 0).toString());
      if (mp3File) {
        formData.append("Mp3File", mp3File);
      }
      if (thumbnail) {
        formData.append("Thumbnail", thumbnail);
      }

      await addMp3(formData);
      queryClient.invalidateQueries({
        queryKey: ["getAllMp3s", global.isAuthorized],
      });

      toast.success(`Successfully created ${name}.`);
      router.push("/");
    } catch (error) {
      toast.error((error as any).response?.data?.error as string);
    }
    actions.setSubmitting(false);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex h-auto w-1/2 items-center justify-center flex-col">
        <Formik
          initialValues={{ ...initialMp3FormValues }}
          validationSchema={mp3Schema}
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
                name="price"
                label="Price"
                type="number"
                errors={errors}
                touched={touched}
              />
              <FormikField
                name="author"
                label="Author"
                errors={errors}
                touched={touched}
              />
              <div className="w-full h-auto">
                <label>Mp3 Type</label>
                <Dropdown
                  className="mt-0 w-full"
                  value={mp3Type}
                  options={mp3Types}
                  onChange={(e: DropdownChangeEvent) => setMp3Type(e.value)}
                />
              </div>
              <FormikField
                name="mp3File"
                label="Mp3 File"
                type="file"
                errors={errors}
                touched={touched}
              />
              <FormikField
                name="thumbnail"
                label="Thumbnail"
                type="file"
                errors={errors}
                touched={touched}
              />
              <div className="w-full text-center text-theme-text mt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full justify-center h-11"
                >
                  Add song
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Mp3;
