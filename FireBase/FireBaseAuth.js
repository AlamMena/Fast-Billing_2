import App from "./FireBaseAppConfig";
import { getAuth } from "firebase/auth";

const Auth = getAuth(App);

export default Auth;
