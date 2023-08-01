import { useAuth } from "../../../app/hooks/useAuth";
import { Button } from "../../components/Button";

export const Dashboard = () => {
  const { signout } = useAuth();
  return (
    <div>
      <Button onClick={signout}>Sair</Button>
    </div>
  );
};
