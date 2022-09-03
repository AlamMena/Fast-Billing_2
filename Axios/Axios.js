import axios from "axios";
import { useContext } from "react";

export default function useAxios() {
  const user = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
  });

  return { axiosInstance };
}
