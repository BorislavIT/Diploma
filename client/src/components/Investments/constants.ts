export enum INVESTMENT_STATUS {
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
}

export type InvestmentCard = {
  type: string;
  status: INVESTMENT_STATUS;
  date: string;
  name: string;
  value: string;
  id: string;
};
