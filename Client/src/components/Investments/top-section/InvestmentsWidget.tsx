import { FC, ReactNode } from "react";

type InvestmentsWidgetProps = {
  children: ReactNode;
  width: string;
};

const InvestmentsWidget: FC<InvestmentsWidgetProps> = ({ children, width }) => {
  return <article className={`h-96 flex ${width}`}>{children}</article>;
};

export default InvestmentsWidget;
