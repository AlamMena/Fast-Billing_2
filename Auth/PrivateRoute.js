import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Login from "../pages/login";
import Loading from "../Components/Loading/Loading";
import AuthContext from "./AuthContext";
import { useContext } from "react";
import Auth from "./FirebaseAuthContext";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Store/UserSlice";

export default function PrivateRouter({ children }) {
  // Router
  const { pathname } = useRouter();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // const { data: user } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  // const user = useContext(AuthContext);
  useEffect(() => {
    Auth.onAuthStateChanged(function (userCredential) {
      if (userCredential) {
        setUser(userCredential);
      }
      setIsLoading(false);
    });
  }, [user]);

  if (user) {
    if (pathname === "/login") {
      return <Login />;
    }
    return children;
  } else if (!user && !isLoading) {
    return <Login />;
  }
  return <Loading />;
}
