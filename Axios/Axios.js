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
      return Promise.reject(error);
    }
  );

  return { axiosInstance };
}
