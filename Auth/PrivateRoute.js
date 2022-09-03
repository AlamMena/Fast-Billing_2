import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import login from "../pages/login";
import axios from "axios";
import auth from "../FireBase/FireBaseAuth";
import Loading from "../Components/Loading/Loading";
import Index from "../pages/index";

export default function PrivateRouter({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Router

  const { pathname } = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      setTimeout(() => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setUser(user);
        }, 1000);
      }, 1000);

      axios.create({
        baseURL: "http://localhost:8080/",
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
    });
  }, []);
  if (user) {
    if (pathname === "/login") {
      return <Login />;
    }
    return children;
  } else if (!isLoading && !user) {
    return <Login />;
  }
  return <Loading />;
}
