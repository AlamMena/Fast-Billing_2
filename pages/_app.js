import "../styles/globals.css";
import { StyledEngineProvider } from "@mui/material";
import { AuthProvider } from "firebase/auth";
import PrivateRouter from "../Auth/PrivateRoute";
import AuthContext from "../Auth/AuthContext";
import useAuth from "../Auth/useAuth";

function MyApp({ Component, pageProps }) {
  const { user } = useAuth();

  return (
    <AuthContext.Provider value={user}>
      <PrivateRouter>
        <StyledEngineProvider injectFirst>
          <Component {...pageProps} />
        </StyledEngineProvider>
      </PrivateRouter>
    </AuthContext.Provider>
  );
}

export default MyApp;
