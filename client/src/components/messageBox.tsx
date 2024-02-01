import { FC } from "react";
import dynamic from "next/dynamic";

const MessageContent = dynamic(() => import("./messageContent"));

type MessageBoxProps = {
  isVisible: boolean;
  message: string;
};

const MessageBox: FC<MessageBoxProps> = ({ isVisible, message }) => {
  return <>{isVisible && <MessageContent message={message} />}</>;
};

export default MessageBox;
