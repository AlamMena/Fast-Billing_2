import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../Store/UserSlice";
import auth from "../Auth/FirebaseAuthContext";
import AuthContext from "../Auth/AuthContext";

export default function useAxios() {
  // const [user, setUser] = useState(null);
  const { data: user } = useSelector((state) => state.user);

  const axiosInstance = axios.create({
    baseURL: "https://fastbilling.azurewebsites.net/api/",
    headers: {
      Authorization: `Bearer ${user.stsTokenManager.accessToken}`,
    },
  });

  return { axiosInstance };
}
