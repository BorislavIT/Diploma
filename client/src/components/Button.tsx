import { FC, MouseEventHandler } from "react";

type ButtonProps = {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="p-2 border border-sky-500 rounded mb-4"
    >
      {label}
    </button>
  );
};

export default Button;
