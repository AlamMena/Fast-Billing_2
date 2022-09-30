import auth from "./FirebaseAuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function useAuth() {
  const router = useRouter();

  const LogIn = async (data) => {
    const { email, password } = data;
    const response = await signInWithEmailAndPassword(auth, email, password);
    router.push("/");
    return response;
  };

  const LogOut = async () => {
    await auth.signOut();
    router.reload("/login");
  };

  return { LogIn, LogOut };
}
