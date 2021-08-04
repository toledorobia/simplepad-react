import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const AuthPublic = (props) => {
  const { auth } = useContext(AuthContext);

  if (auth.loaded === false) {
    return null;
  }

  if (auth.logged === true) {
    return null;
  }

  return props.children;
};

export default AuthPublic;