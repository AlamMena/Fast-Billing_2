import axios from "axios";
import { useContext } from "react";
import AuthContext from "../Auth/AuthContext";

export default function useAxios() {
  const user = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: "https://",
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
  });

  return { axiosInstance };
}
