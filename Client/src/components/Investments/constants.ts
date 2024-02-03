export enum INVESTMENT_STATUS {
  ACTIVE,
  CLOSED,
}

export type Investment = {
  type: string;
  status: INVESTMENT_STATUS;
  dateOfCreation?: string;
  name: string;
  value: number;
  id?: string;
};

export const INVESTMENTS_API_URLS = {
  BASE: "/Investments",
};
