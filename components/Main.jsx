import { NavigationContainer } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { authStateChangeUser } from "../reduxToolkit/auth/operations-auth";

import { useRoute } from "./router";
import { selectIsLogin } from "../reduxToolkit/auth/selectot-auth";

export const Main = () => {
  const isLogin = useSelector(selectIsLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(isLogin);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
