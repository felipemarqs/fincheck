import { httpClient } from "../httpClient";

export interface SigninParams {
  email: string;
  password: string;
}

interface SigninResponse {
  accessToken: string;
}

export const signin = async (params: SigninParams) => {
  //await timeout(1500);
  const { data } = await httpClient.post<SigninResponse>("/auth/signin", params);

  return data;
};
