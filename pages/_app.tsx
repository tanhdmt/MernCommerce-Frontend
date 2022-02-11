import React from "react";
import { AppProps } from "next/app";
import "@styles/app.scss";
import "@styles/global.scss";
import { wrapper } from "../src/store";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
