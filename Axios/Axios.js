import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../Store/UserSlice";
import auth from "../Auth/FirebaseAuthContext";
import AuthContext from "../Auth/AuthContext";
import Auth from "../Auth/FirebaseAuthContext";
import Router from "next/router";
import useAuth from "../Auth/useAuth";

export default function useAxios() {
  // const { data: user } = useSelector((state) => state.user);
  const router = Router;
  const { LogOut } = useAuth();

  const axiosInstance = axios.create({
    baseURL: "https://fastbilling.azurewebsites.net/api/",
  });

  axiosInstance.interceptors.request.use(
    function (config) {
      Auth.onAuthStateChanged(function (user) {
        if (user) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
      });
      return config;
    },
    function (error) {
      // Request error
      return console.log(error.response.status), "response error";
    }
  );

  axiosInstance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response) {
        if (error.response.status === 401) {
          LogOut();
          router.push("./login");
          console.log("401 0 404");
        }
      }
      return error;
    }
  );

  return { axiosInstance };
}
