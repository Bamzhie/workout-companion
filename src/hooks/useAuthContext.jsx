import { AuthContext } from "../context/Authcontext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("context must be used inside auth context provider");
  }

  return context;
};
