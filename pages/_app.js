import "../styles/globals.css";
import SideBar from "../components/SideBar/Index";

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col">
      <SideBar />
      <div className="md:ml-72">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
