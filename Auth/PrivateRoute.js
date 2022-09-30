import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Login from "../pages/login";
import axios from "axios";
import auth from "../Firebase/FirebaseAuth";
import Loading from "../Components/Loading/Loading";
import AuthContext from "./AuthContext";
import { useContext } from "react";
import { useSelector } from "react-redux";

export default function PrivateRouter({ children }) {
  // const [user, setUser] = useState(null);

  const user = useSelector((state) => state.user);

  // Router
  const { pathname } = useRouter();

  // useEffect(() => {
  //   // auth.onAuthStateChanged(function (user) {
  //   //   setIsLoading(false);
  //   //   setUser(user);
  //   //   axios.create({
  //   //     baseURL: "https://fastbilling.azurewebsites.net/api/",
  //   //     headers: {
  //   //       Authorization: `Bearer ${user?.accessToken}`,
  //   //     },
  //   //   });
  //   //   alert(JSON.stringify(user));
  //   // });
  //   setIsLoading(false);
  //   alert(JSON.stringify(user));
  // }, [user]);
  if (user.data !== null) {
    if (pathname === "/login") {
      return <Login />;
    }
    return children;
  } else if (user.data === null) {
    return <Login />;
  }
  return <Loading />;
}
