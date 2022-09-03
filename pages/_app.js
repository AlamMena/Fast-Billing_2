import "../styles/globals.css";
import SideBar from "../components/SideBar/Index";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { StyledEngineProvider } from "@mui/material";
import { AuthProvider } from "firebase/auth";
import PrivateRouter from "../Auth/PrivateRoute";
import AuthContext from "../Auth/AuthContext";
import useAuth from "../Auth/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  const { user } = useAuth();
  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "#11cb5f",
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#11cb5f",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="flex flex-col">
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
            rel="stylesheet"
          />
        </div>

        <AuthContext.Provider value={user}>
          <PrivateRouter>
            <StyledEngineProvider injectFirst>
              <SideBar />
              <div className="md:ml-72">
                <Component {...pageProps} />
                <ToastContainer />
              </div>
            </StyledEngineProvider>
          </PrivateRouter>
        </AuthContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
