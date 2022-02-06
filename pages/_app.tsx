import React, { useEffect } from "react";
import { AppProps } from "next/app";
import "@styles/app.scss";
import "@styles/global.scss";
import { Provider } from "react-redux";
import store from "../src/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Header from "./layouts/Header/Header";
// import Footer from "./layouts/Footer/Footer";
// import { ScrollToTop } from "./components/Scroll/ScrollToTop";
// import "../public/admin/assets/css/bootstrap.min.css";
// import "../public/admin/assets/css/LineIcons.css";
// import "../public/admin/assets/css/materialdesignicons.min.css";
// import "../public/admin/assets/css/fullcalendar.css";
// import "../public/assets/css/jquery-ui.min.css";
// import "../public/admin/assets/css/main.css";
// import "../public/assets/css/bootstrap.min.css";
// import "../public/assets/css/font-awesome.min.css";
// import "../public/assets/css/themify-icons.css";
// import "../public/assets/css/owl.carousel.min.css";
// import "../public/assets/css/nice-select.css";

// import "../public/assets/css/slicknav.min.css";
// import "../public/assets/css/elegant-icons.css";
// import "../public/assets/css/style.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const notify = () => {
        const messageUser = localStorage.getItem("message-user");
        if (messageUser) toast.success(JSON.parse(messageUser)?.message);
    };

    const clearMess = () => {
        localStorage.removeItem("message-user");
    };
    useEffect(() => {
        let timeoutClear: NodeJS.Timeout;
        if (localStorage.getItem("message-user")) {
            notify();
            timeoutClear = setTimeout(clearMess, 5000);
        }
        return () => {
            clearTimeout(timeoutClear);
        };
    }, []);
    return (
        <Provider store={store}>
            <Component {...pageProps} />
            <ToastContainer />
        </Provider>
    );
}

export default MyApp;
