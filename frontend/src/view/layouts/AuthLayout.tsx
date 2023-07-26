//import { Outlet } from "react-router-dom";
import { Outlet } from "react-router-dom";
import illustration from "../../assets/illustration.png";
import { Logo } from "../components/Logo";
export const AuthLayout = () => {
  return (
    <div className="flex w-full h-full">
      {/* Left Side */}
      <div className=" w-full h-full flex justify-center items-center flex-col gap-16 lg:w-1/2">
        <Logo className="h-6 text-gray-500" />

        <div className="w-full max-w-[504px] px-8">
          <Outlet />
        </div>
      </div>
      {/* End Left Side */}

      {/* Right Side */}
      <div className="w-1/2 h-full justify-center items-center p-8 relative hidden lg:flex">
        {/* Background Image */}
        <img
          src={illustration}
          className="object-cover w-full h-full max-w-[656px] max-h-[960px] select-none rounded-[32px]"
        />

        {/* Bottom Div Image */}
        <div className=" max-w-[656px] bottom-8 p-10 bg-white absolute rounded-b-[32px]">
          <Logo className="text-teal-900 h-8" />
          <p className="text-gray-700 font-medium text-xl mt-6">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck,
            e o melhor, totalmente de graça!
          </p>
        </div>
        {/* End Bottom Div Image */}
      </div>
      {/* End Right Side */}
    </div>
  );
};
