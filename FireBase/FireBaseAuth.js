import App from "./FirebaseAppConfig";
import { getAuth } from "firebase/auth";

const Auth = getAuth(App);

export default Auth;
