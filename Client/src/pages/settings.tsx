import Settings from "@/components/settings/Settings";
import Head from "next/head";

export const SettingsPage = () => {
  return (
    <>
      <Head>
        <title>Settings Page</title>
        <meta
          name="description"
          content="In this page you can view and edit your settings."
        />
      </Head>
      <div className="flex flex-col flex-wrap gap-4 w-full">
        <h1 className="text-theme-text font-bold text-4xl flex w-full flex-col sm:flex-row flex-wrap sm:flex-nowrap sm:justify-between sm:text-4xl">
          Settings
        </h1>
        <Settings />
      </div>
    </>
  );
};

export default SettingsPage;
