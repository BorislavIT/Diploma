export enum INVESTMENT_STATUS {
  CLOSED,
  ACTIVE,
}

export const INVESTMENT_STATUS_VALUES = {
  0: "Closed",
  1: "Active",
};

export type Investment = {
  type: string;
  status: INVESTMENT_STATUS;
  dateOfCreation?: string;
  name: string;
  value: number;
  id?: string;
};

export const INVESTMENTS_API_URLS = {
  BASE: "/investments",
  SUMMARY: "/summary",
};
