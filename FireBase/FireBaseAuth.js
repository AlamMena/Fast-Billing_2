import app from "./FireBaseAppConfig";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);

export default auth;
