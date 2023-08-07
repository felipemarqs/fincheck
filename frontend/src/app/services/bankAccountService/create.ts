import { httpClient } from "../httpClient";

export interface BankAccountParams {
  name: string;
  initialBalance: number;
  color: string;
  type: "CHECKING" | "INVESTMENT" | "CASH";
}

export const create = async (params: BankAccountParams) => {
  //await timeout(1500);
  const { data } = await httpClient.post("/bank-accounts", params);

  return data;
};
