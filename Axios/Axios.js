import axios from "axios";
import { useContext, useState, useEffect } from "react";
import auth from "../Firebase/FirebaseAuth";
import AuthContext from "../Auth/AuthContext";
import { useSelector } from "react-redux";

export default function useAxios() {
  // const [user, setUser] = useState(null);
  const user = useSelector((state) => state.user);

  // const user = useContext(AuthContext);

  useEffect(() => {
    alert(JSON.stringify({ user, yo: "AXIOS" }));
  }, []);

  const axiosInstance = axios.create({
    baseURL: "https://fastbilling.azurewebsites.net/api/",
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
  });

  return { axiosInstance };
}
