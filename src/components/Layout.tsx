import type { ReactNode } from "react";
import Header from "./Header/Header";
import Head from "next/head";
import Footer from "./Footer/Footer";

type LayoutProps = {
    readonly children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => (
    <div>
        <Head>
            <meta charSet="utf-8" />
            <link rel="icon" href="assets/img/logo-png.png" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta name="theme-color" content="#000000" />
            <meta
                name="description"
                content="Web site created using create-react-app"
            />
            <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
            <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
            <title>Thời Trang Nam Nữ Fashi</title>

            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
                integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
            />
            <base href="/" />

            <link
                rel="stylesheet"
                type="text/css"
                href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"
            />
            <script
                type="text/javascript"
                src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"
            ></script>
            <link
                href="https://fonts.googleapis.com/css?family=Muli:300,400,500,600,700,800,900&display=swap"
                rel="stylesheet"
            />
            <link rel="stylesheet" href="admin/assets/css/bootstrap.min.css" />
            <link rel="stylesheet" href="admin/assets/css/LineIcons.css" />
            <link
                rel="stylesheet"
                href="admin/assets/css/materialdesignicons.min.css"
            />
            <link rel="stylesheet" href="admin/assets/css/fullcalendar.css" />
            <link rel="stylesheet" href="admin/assets/css/main.css" />
            <link
                rel="stylesheet"
                href="assets/css/bootstrap.min.css"
                type="text/css"
            />
            <link
                rel="stylesheet"
                href="assets/css/font-awesome.min.css"
                type="text/css"
            />
            <link
                rel="stylesheet"
                href="assets/css/themify-icons.css"
                type="text/css"
            />
            <link
                rel="stylesheet"
                href="assets/css/elegant-icons.css"
                type="text/css"
            />
            <link
                rel="stylesheet"
                href="assets/css/owl.carousel.min.css"
                type="text/css"
            />
            <link
                rel="stylesheet"
                href="assets/css/nice-select.css"
                type="text/css"
            />
            <link
                rel="stylesheet"
                href="assets/css/jquery-ui.min.css"
                type="text/css"
            />
            <link
                rel="stylesheet"
                href="assets/css/slicknav.min.css"
                type="text/css"
            />
            <link
                rel="stylesheet"
                href="assets/css/style.css"
                type="text/css"
            />
            <script src="assets/js/jquery-3.3.1.min.js"></script>
            <script src="assets/js/jquery-ui.min.js"></script>
            <script src="assets/js/jquery.countdown.min.js"></script>
            <script src="assets/js/jquery.nice-select.min.js"></script>
            <script src="assets/js/jquery.zoom.min.js"></script>
            <script src="assets/js/jquery.dd.min.js"></script>
            <script src="assets/js/jquery.slicknav.js"></script>
            <script src="assets/js/owl.carousel.min.js"></script>
            <script src="assets/js/main.js"></script>
            <script src="assets/js/bootstrap.min.js"></script>
            <script src="admin/assets/js/bootstrap.bundle.min.js"></script>
            <script src="admin/assets/js/Chart.min.js"></script>
            <script src="admin/assets/js/dynamic-pie-chart.js"></script>
            <script src="admin/assets/js/moment.min.js"></script>
            <script src="admin/assets/js/fullcalendar.js"></script>
            <script src="admin/assets/js/jvectormap.min.js"></script>
            <script src="admin/assets/js/world-merc.js"></script>
            <script src="admin/assets/js/polyfill.js"></script>
            <script src="admin/assets/js/main.js"></script>
        </Head>
        <body>
            <div id="root">
                <Header />
                <main>{children}</main>
                <Footer />
            </div>
        </body>
    </div>
);
