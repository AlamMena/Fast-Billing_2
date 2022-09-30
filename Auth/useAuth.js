import auth from "./FirebaseAuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Store/UserSlice";

export default function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.user);
  useEffect(() => {
    auth.onAuthStateChanged(function (response) {
      if (response) {
        dispatch(setUser(response));
      }
    });
  }, [user]);
  const LogIn = async (data) => {
    const { email, password } = data;
    const response = await signInWithEmailAndPassword(auth, email, password);
    dispatch(setUser(response.user));
    alert(JSON.stringify({ login: true, response: response.user }));
    return response;
  };

  const LogOut = async () => {
    await auth.signOut();
    router.reload("/login");
  };

  return { LogIn, LogOut, setUser };
}
