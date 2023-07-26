import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div>
      <header className=" flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Entre em sua conta
        </h1>

        <p className="space-x-1">
          <span className="text-gray-700 tracking-[-0.5px]">
            {" "}
            Novo por aqui?{" "}
          </span>

          <Link
            to="/register"
            className="tracking-[-0.5px] font-medium text-teal-900"
          >
            Crie sua conta
          </Link>
        </p>
      </header>

      <form className="mt-[60px] flex flex-col gap-4">
        <input type="email" />
        <input type="password" />
        <button type="submit" className="mt-2">
          Entrar
        </button>
      </form>
    </div>
  );
};
