import { Button as PrimeReactButton, ButtonProps } from "primereact/button";
import { FC } from "react";

const Button: FC<ButtonProps> = (props) => {
  return (
    <PrimeReactButton
      {...props}
      className={`focus:shadow-none bg-theme-primary border border-theme-border border-solid text-theme-text p-2 ${props.className}`}
    />
  );
};

export default Button;
