import "../styles/globals.css";
import SideBar from "../components/SideBar/Index";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { StyledEngineProvider } from "@mui/material";
import { AuthProvider } from "firebase/auth";
import PrivateRouter from "../Auth/PrivateRoute";
import AuthContext from "../Auth/AuthContext";
import useAuth from "../Auth/useAuth";

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
    <ThemeProvider theme={theme}>
      <div className="flex flex-col">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
          rel="stylesheet"
        />
        <SideBar />
        <div className="md:ml-72">
          <AuthContext.Provider value={user}>
            <PrivateRouter>
              <StyledEngineProvider injectFirst>
                <Component {...pageProps} />
              </StyledEngineProvider>
            </PrivateRouter>
          </AuthContext.Provider>
          <div className="my-8"></div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
