import { FC } from "react";

type MessageContentProps = {
  message: string;
};

const MessageContent: FC<MessageContentProps> = ({ message }) => {
  return (
    <>
      <p>{message}</p>
    </>
  );
};

export default MessageContent;
