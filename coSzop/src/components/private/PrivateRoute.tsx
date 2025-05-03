// components/PrivateRoute.tsx
import { ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../paths/authcontext";
import { paths } from '../../config/path';

interface Props {
  children: ReactNode;
}

function PrivateRoute({ children }: Props) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user);

  if (user == null) {
    navigate(paths.login.getHref())
  }

  return <>{children}</>;
} 
export default PrivateRoute