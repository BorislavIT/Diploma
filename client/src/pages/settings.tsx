import Head from "next/head";
import Button from "@/components/Button";
import { User } from "@/constants";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useToast } from "@/contexts/ToastContext";

export const SettingsPage = () => {
  const [user, setUser] = useState<User>();

  const toast = useToast()!;

  const onSaveSettingsClicked = () => {
    toast.success("Successfully saved your settings");
  };

  return (
    <>
      <Head>
        <title>User Settings Page</title>
        <meta
          name="description"
          content="In this page you can view and edit your settings."
        />
      </Head>
      <div className="flex flex-col flex-wrap gap-4 w-full">
        <h1 className="text-theme-text font-bold text-4xl mb-8 mt-8 flex w-full flex-col sm:flex-row flex-wrap sm:flex-nowrap sm:justify-between sm:text-4xl">
          User Settings
        </h1>
        <div className="w-full h-auto">
          <div className="w-full flex flex-col flex-wrap gap-4">
            <section className="w-full text-theme-text">
              <label>First Name</label>
              <span className="p-float-label w-full">
                <InputText
                  className="w-full"
                  onChange={(e) => {
                    setUser({
                      ...user!,
                      firstName: e.target.value,
                    });
                  }}
                />
              </span>
            </section>
            <section className="w-full text-theme-text">
              <label>Last Name</label>
              <span className="p-float-label w-full">
                <InputText
                  className="w-full"
                  onChange={(e) => {
                    setUser({
                      ...user!,
                      lastName: e.target.value,
                    });
                  }}
                />
              </span>
            </section>
            <section className="w-full text-theme-text">
              <label>Age</label>
              <span className="p-float-label w-full">
                <InputNumber
                  className="w-full"
                  onChange={(e) => {
                    setUser({
                      ...user!,
                      age: e.value!,
                    });
                  }}
                />
              </span>
            </section>
            <section className="w-full text-theme-text text-right">
              <Button onClick={onSaveSettingsClicked}>Save</Button>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
