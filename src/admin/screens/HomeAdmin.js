import React, { useEffect } from "react";
import {
    Route,
    Switch,
    Link,
    useRouteMatch,
    useHistory,
} from "react-router-dom";
import Content from "../layouts/Content/Content";
import Footer from "../layouts/Footer/Footer";
import Product from "./ProductsScreen";
import Color from "./ColorsScreen";
import Size from "./SizesScreen";
import Category from "./CategoriesScreen";
import Topic from "./TopicsScreen";
import Post from "./PostsScreen";
import Image from "./ImagesScreen";
import User from "./UsersScreen";
import Order from "./OrdersScreen";
import Contact from "./ContactsScreen";
import Page from "./PagesScreen";
import { ScrollToTop } from "../../components/Scroll/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const HomeAdmin = () => {
    const dispatch = useDispatch();
    const contact = useSelector((state) => state.contact.contacts);
    var send = [];
    if (contact.Contacts) {
        send = contact.Contacts.filter((value) => value.status === false);
    }
    let { path } = useRouteMatch();
    let history = useHistory();
    const animateSidabar = () => {
        const sidebarNavWrapper = document.querySelector(
            ".sidebar-nav-wrapper"
        );
        const mainWrapper = document.querySelector(".main-wrapper");
        const menuToggleButton = document.querySelector("#menu-toggle");
        const menuToggleButtonIcon = document.querySelector("#menu-toggle i");

        menuToggleButton.addEventListener("click", () => {
            sidebarNavWrapper.classList.toggle("active");
            mainWrapper.classList.toggle("active");

            if (document.body.clientWidth > 1200) {
                if (
                    menuToggleButtonIcon.classList.contains("lni-chevron-left")
                ) {
                    menuToggleButtonIcon.classList.remove("lni-chevron-left");
                    menuToggleButtonIcon.classList.add("lni-menu");
                } else {
                    menuToggleButtonIcon.classList.remove("lni-menu");
                    menuToggleButtonIcon.classList.add("lni-chevron-left");
                }
            } else {
                if (
                    menuToggleButtonIcon.classList.contains("lni-chevron-left")
                ) {
                    menuToggleButtonIcon.classList.remove("lni-chevron-left");
                    menuToggleButtonIcon.classList.add("lni-menu");
                }
            }
        });
    };

    function handleClick() {
        history.push("/");
    }

    useEffect(() => {
        dispatch(listContact());
        if (!window.location.hash) {
            window.location = window.location + "#admin";
        }
        animateSidabar();
    }, [dispatch]);
    return (
        <>
            <div>
                {/* -- ======== sidebar-nav start =========== -- */}
                <aside className="sidebar-nav-wrapper">
                    <div className="navbar-logo">
                        <a href="/admin" onClick={() => history.push("/admin")}>
                            <img
                                src="admin/assets/images/logo/logo.svg"
                                alt="logo"
                            />
                        </a>
                    </div>
                    <nav className="sidebar-nav">
                        <ul>
                            <li className="nav-item__admin">
                                <a href="/" onClick={handleClick}>
                                    <span className="icon">
                                        <i className="lni lni-home"></i>
                                    </span>
                                    <span className="text">Home Fashi</span>
                                </a>
                            </li>
                            <li className="nav-item__admin nav-item-has-children">
                                <a
                                    href="#0"
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#ddmenu_1"
                                    aria-controls="ddmenu_1"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="icon">
                                        <i className="lni lni-dropbox"></i>
                                    </span>
                                    <span className="text">Products</span>
                                </a>
                                <ul
                                    id="ddmenu_1"
                                    className="collapse dropdown-nav"
                                >
                                    <li>
                                        <Link to="/admin/products">
                                            <i className="lni lni-arrow-right"></i>{" "}
                                            Manage Products
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/admin/colors">
                                            <i className="lni lni-arrow-right"></i>{" "}
                                            Manage Colors
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/admin/sizes">
                                            <i className="lni lni-arrow-right"></i>{" "}
                                            Manage Sizes
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item__admin nav-item-has-children">
                                <a
                                    href="#0"
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#ddmenu_2"
                                    aria-controls="ddmenu_2"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="icon">
                                        <i className="lni lni-layout"></i>
                                    </span>
                                    <span className="text">Categories</span>
                                </a>
                                <ul
                                    id="ddmenu_2"
                                    className="collapse dropdown-nav"
                                >
                                    <li>
                                        <Link to="/admin/categories">
                                            <i className="lni lni-arrow-right"></i>{" "}
                                            Manage Categories
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item__admin nav-item-has-children">
                                <a
                                    href="#0"
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#ddmenu_3"
                                    aria-controls="ddmenu_3"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="icon">
                                        <i className="lni lni-blogger"></i>
                                    </span>
                                    <span className="text">Blog</span>
                                </a>
                                <ul
                                    id="ddmenu_3"
                                    className="collapse dropdown-nav"
                                >
                                    <li>
                                        <Link to="/admin/topics">
                                            <i className="lni lni-arrow-right"></i>{" "}
                                            Manage Topics
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/posts">
                                            <i className="lni lni-arrow-right"></i>{" "}
                                            Manage Posts
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item__admin nav-item-has-children">
                                <a
                                    href="#0"
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#ddmenu_4"
                                    aria-controls="ddmenu_4"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="icon">
                                        <i className="lni lni-image"></i>
                                    </span>
                                    <span className="text">Images</span>
                                </a>
                                <ul
                                    id="ddmenu_4"
                                    className="collapse dropdown-nav"
                                >
                                    <li>
                                        <Link to="/admin/images">
                                            <i className="lni lni-arrow-right"></i>{" "}
                                            Manage Images
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item__admin nav-item-has-children">
                                <a
                                    href="#0"
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#ddmenu_5"
                                    aria-controls="ddmenu_5"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="icon">
                                        <i className="lni lni-users"></i>
                                    </span>
                                    <span className="text">Accounts </span>
                                </a>
                                <ul
                                    id="ddmenu_5"
                                    className="collapse dropdown-nav"
                                >
                                    <li>
                                        <Link to="/admin/users">
                                            <i className="lni lni-arrow-right"></i>{" "}
                                            Manage Accounts
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item__admin nav-item-has-children">
                                <a
                                    href="#0"
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#ddmenu_6"
                                    aria-controls="ddmenu_6"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="icon">
                                        <i className="lni lni-package"></i>
                                    </span>
                                    <span className="text">Orders</span>
                                </a>
                                <ul
                                    id="ddmenu_6"
                                    className="collapse dropdown-nav"
                                >
                                    <li>
                                        <Link to="/admin/orders">
                                            <i className="lni lni-arrow-right"></i>{" "}
                                            Manage Orders
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item__admin nav-item-has-children">
                                <a
                                    href="#0"
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#ddmenu_7"
                                    aria-controls="ddmenu_7"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="icon">
                                        <i className="lni lni-check-box"></i>
                                    </span>
                                    <span className="text"> Contacts </span>
                                </a>
                                <ul
                                    id="ddmenu_7"
                                    className="collapse dropdown-nav"
                                >
                                    <li>
                                        <Link to="/admin/contacts">
                                            <i className="lni lni-arrow-right"></i>{" "}
                                            Manage Contacts
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item__admin nav-item-has-children">
                                <a
                                    href="#0"
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#ddmenu_8"
                                    aria-controls="ddmenu_8"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="icon">
                                        <i className="lni lni-grid-alt"></i>
                                    </span>
                                    <span className="text"> Pages </span>
                                </a>
                                <ul
                                    id="ddmenu_8"
                                    className="collapse dropdown-nav"
                                >
                                    <li>
                                        <Link to="/admin/pages">
                                            <i className="lni lni-arrow-right"></i>{" "}
                                            Manage Pages
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            {/* <li className="nav-item__admin">
                                <a href="tables.html">
                                    <span className="icon"><i className="lni lni-grid-alt"></i></span>
                                    <span className="text">Tables</span>
                                </a>
                            </li>
                            <span className="divider"><hr /></span>

                            <li className="nav-item__admin">
                                <a href="notification.html">
                                    <span className="icon"><i className="lni lni-alarm"></i></span>
                                    <span className="text">Notifications</span>
                                </a>
                            </li> */}
                        </ul>
                    </nav>
                </aside>
                <div className="overlay"></div>
                {/* -- ======== sidebar-nav end =========== -- */}

                {/* -- ======== main-wrapper start =========== -- */}
                <main className="main-wrapper">
                    {/* -- ========== header start ========== -- */}
                    <header className="header__admin">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-5 col-md-5 col-6">
                                    <div className="header-left d-flex align-items-center">
                                        <div className="menu-toggle-btn mr-20">
                                            <button
                                                id="menu-toggle"
                                                className="main-btn primary-btn__admin btn-hover"
                                            >
                                                <i className="lni lni-chevron-left me-2"></i>{" "}
                                                Menu
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7 col-md-7 col-6">
                                    <div className="header-right">
                                        {/* -- notification start -- */}
                                        {/* <div className="notification-box ml-15 d-none d-md-flex">
                                            <button
                                                className="dropdown-toggle"
                                                type="button"
                                                id="notification"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <i className="lni lni-alarm"></i>
                                                <span>2</span>
                                            </button>
                                            <ul
                                                className="dropdown-menu dropdown-menu-end"
                                                aria-labelledby="notification"
                                            >
                                                <li>
                                                    <a href="#0">
                                                        <div className="image">
                                                            <img src="admin/assets/images/lead/lead-6.png" alt="" />
                                                        </div>
                                                        <div className="content">
                                                            <h6>
                                                                John Doe
                                                                <span className="text-regular">
                                                                    comment on a product.
                                                                </span>
                                                            </h6>
                                                            <p>
                                                                Lorem ipsum dolor sit amet, consect etur adipiscing
                                                                elit Vivamus tortor.
                                                            </p>
                                                            <span>10 mins ago</span>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#0">
                                                        <div className="image">
                                                            <img src="admin/assets/images/lead/lead-1.png" alt="" />
                                                        </div>
                                                        <div className="content">
                                                            <h6>
                                                                Jonathon
                                                                <span className="text-regular">
                                                                    like on a product.
                                                                </span>
                                                            </h6>
                                                            <p>
                                                                Lorem ipsum dolor sit amet, consect etur adipiscing
                                                                elit Vivamus tortor.
                                                            </p>
                                                            <span>10 mins ago</span>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div> */}
                                        {/* -- notification end -- */}
                                        {/* -- message start -- */}
                                        <div className="header-message-box ml-15 d-none d-md-flex">
                                            <button
                                                className="dropdown-toggle"
                                                type="button"
                                                id="message"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <i className="lni lni-envelope"></i>
                                                <span>{send.length}</span>
                                            </button>
                                            <ul
                                                className="dropdown-menu dropdown-menu-end"
                                                aria-labelledby="message"
                                            >
                                                {send.length !== 0 ? (
                                                    send.map((value) => {
                                                        return (
                                                            <li
                                                                key={value._id}
                                                                onClick={() =>
                                                                    dispatch(
                                                                        activeContacts(
                                                                            value._id
                                                                        )
                                                                    )
                                                                }
                                                            >
                                                                <Link
                                                                    to={`/admin/contacts/${value._id}`}
                                                                >
                                                                    <div className="image">
                                                                        <img
                                                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp0xKoXUryp0JZ1Sxp-99eQiQcFrmA1M1qbQ&usqp=CAU"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                    <div className="content">
                                                                        <h6>
                                                                            {
                                                                                value.name
                                                                            }
                                                                        </h6>
                                                                        <p>
                                                                            {
                                                                                value.message
                                                                            }
                                                                        </p>
                                                                        <span>
                                                                            {moment(
                                                                                value.createAt
                                                                            )
                                                                                .utc()
                                                                                .format(
                                                                                    "MMM DD, YYYY hh:ss"
                                                                                )}
                                                                        </span>
                                                                    </div>
                                                                </Link>
                                                            </li>
                                                        );
                                                    })
                                                ) : (
                                                    <li>
                                                        <div className="content">
                                                            <p>Message Empty</p>{" "}
                                                        </div>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                        {/* -- message end -- */}
                                        {/* -- filter start -- */}
                                        {/* <div className="filter-box ml-15 d-none d-md-flex">
                                            <button className="" type="button" id="filter">
                                                <i className="lni lni-funnel"></i>
                                            </button>
                                        </div> */}
                                        {/* -- filter end -- */}
                                        {/* -- profile start -- */}
                                        <div className="profile-box ml-15">
                                            <button
                                                className="dropdown-toggle bg-transparent border-0"
                                                type="button"
                                                id="profile"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <div className="profile-info">
                                                    <div className="info">
                                                        <h6>
                                                            {localStorage.getItem(
                                                                "userInfo"
                                                            )
                                                                ? JSON.parse(
                                                                      localStorage.getItem(
                                                                          "userInfo"
                                                                      )
                                                                  ).lastName
                                                                : "Admin"}
                                                        </h6>
                                                        <div className="image">
                                                            <img
                                                                src="https://cdn-icons-png.flaticon.com/512/1421/1421222.png"
                                                                alt=""
                                                            />
                                                            <span className="status"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <i className="lni lni-chevron-down"></i>
                                            </button>
                                            <ul
                                                className="dropdown-menu dropdown-menu-end"
                                                aria-labelledby="profile"
                                            >
                                                <li>
                                                    <a href="#0">
                                                        <i className="lni lni-user"></i>{" "}
                                                        View Profile
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#0">
                                                        <i className="lni lni-alarm"></i>{" "}
                                                        Notifications
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#0">
                                                        {" "}
                                                        <i className="lni lni-inbox"></i>{" "}
                                                        Messages{" "}
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#0">
                                                        {" "}
                                                        <i className="lni lni-cog"></i>{" "}
                                                        Settings{" "}
                                                    </a>
                                                </li>
                                                <li>
                                                    <Link to="/logout">
                                                        <i className="lni lni-exit"></i>
                                                        Logout
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* -- profile end -- */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <Switch>
                        <Route exact path={path} component={Content} />
                        <Route path={`${path}/products`} component={Product} />
                        <Route path={`${path}/colors`} component={Color} />
                        <Route path={`${path}/sizes`} component={Size} />
                        <Route
                            path={`${path}/categories`}
                            component={Category}
                        />
                        <Route path={`${path}/topics`} component={Topic} />
                        <Route path={`${path}/posts`} component={Post} />
                        <Route path={`${path}/images`} component={Image} />
                        <Route path={`${path}/users`} component={User} />
                        <Route path={`${path}/orders`} component={Order} />
                        <Route path={`${path}/contacts`} component={Contact} />
                        <Route path={`${path}/pages`} component={Page} />
                    </Switch>
                    {/* -- ========== footer start =========== -- */}
                    <Footer />
                    {/* -- ========== footer end =========== -- */}
                </main>
            </div>
            <ScrollToTop />
        </>
    );
};

export default HomeAdmin;
