import { useForm } from "react-hook-form";

export const useLoginController = () => {
  const { handleSubmit: hookFormHandleSubmit, register } = useForm();

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log("Data: ", data);
  });

  return { handleSubmit, register };
};
