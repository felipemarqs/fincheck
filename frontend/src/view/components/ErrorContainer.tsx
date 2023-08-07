import { CrossCircledIcon } from "@radix-ui/react-icons";

interface ErrorContainerProps {
  error: string;
}

export const ErrorContainer = ({ error }: ErrorContainerProps) => {
  return (
    <div className="flex gap-2 items-center mt-2 text-red-900 ">
      <CrossCircledIcon />
      <span className="text-xs">{error}</span>
    </div>
  );
};
