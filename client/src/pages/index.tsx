import Button from "@/components/Button";
import MessageBox from "@/components/messageBox";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [isMessageBoxVisible, setIsMessageBoxVisible] =
    useState<boolean>(false);

  const onShowMessageClick = () => {
    setIsMessageBoxVisible(!isMessageBoxVisible);
  };

  return (
    <>
      <Head>
        <title>Button clicking page</title>
        <meta name="description" content="le page of le clicking" />
      </Head>
      <div className="w-full h-full flex items-center justify-center flex-col bg-black min-h-[inherit]">
        <div>
          <Button label="Show message" onClick={onShowMessageClick} />
        </div>
        <div>
          <MessageBox message="i'm shown" isVisible={isMessageBoxVisible} />
        </div>
      </div>
    </>
  );
}
