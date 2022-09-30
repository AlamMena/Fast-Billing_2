import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Login from "../pages/login";
import axios from "axios";
import auth from "../Auth/FirebaseAuthContext";
import Loading from "../Components/Loading/Loading";
import AuthContext from "./AuthContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { setUser } from "../Store/UserSlice";
import { useDispatch } from "react-redux";
import useAuth from "./useAuth";

export default function PrivateRouter({ children }) {
  // const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  // Router
  const { pathname } = useRouter();

  const { data: user } = useSelector((state) => state.user);
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
