import { BankAccount } from "../../entities/BankAccount";
import { httpClient } from "../httpClient";

type BannkAccountResponse = Array<BankAccount>;

export const getAll = async () => {
  //await timeout(1500);
  const { data } = await httpClient.get<BannkAccountResponse>("/bank-accounts");

  return data;
};
