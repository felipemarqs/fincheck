import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const treatAxiosError = (error: Error | typeof AxiosError) => {
  if (error instanceof AxiosError && error.response) {
    toast.error(error.response.data.message);
  } else {
    toast.error('Ocorreu um erro!');
  }
};
