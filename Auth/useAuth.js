import auth from "../Firebase/FirebaseAuth";
import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function useAuth() {
  const [user, setUser] = useState();
  const router = useRouter();

  const LogIn = async (data) => {
    const { email, password } = data;

    const response = await signInWithEmailAndPassword(auth, email, password);

    auth.onAuthStateChanged(function (user) {
      if (user) {
        setUser(user);
        router.push("/");
      }
    });

    return response;
  };

  const LogOut = async () => {
    await auth.signOut();
    router.reload("/login");
  };

  return { LogIn, LogOut, user };
}
