import { MODULES } from "@/shared/constants";
import Link from "next/link";

export const metadata = {
  title: "404 - Not Found",
  description: "This page is shown when the requested page is not found.",
};

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="flex flex-col gap-4 items-center">
        <div className="text-3xl">Page not found!</div>
        <div className="text-2xl">
          <Link href={MODULES.HOME} className="underline text-pink-500">
            Click here to go to the home page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
