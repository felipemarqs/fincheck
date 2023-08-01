import { Spinner } from "./Spinner";

export const PageLoader = () => {
  return (
    <div className="bg-gray-0 top-0 left-0 h-full w-full grid place-content-center">
      <Spinner />
    </div>
  );
};
