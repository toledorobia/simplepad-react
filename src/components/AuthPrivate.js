import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const AuthPrivate = (props) => {
  const { auth } = useContext(AuthContext);

  if (auth.loaded === false) {
    return null;
  }

  if (auth.logged === false) {
    return null;
  }

  return props.children;
};

export default AuthPrivate;