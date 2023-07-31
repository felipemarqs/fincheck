import { httpClient } from "../httpClient";

export interface SignupParams {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  accessToken: string;
}

export const signup = async (params: SignupParams) => {
  //await timeout(1500);
  const { data } = await httpClient.post<SignupResponse>("/auth/signup", params);

  return data;
};
