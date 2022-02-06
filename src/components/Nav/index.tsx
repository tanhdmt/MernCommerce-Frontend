import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import style from "./nav.module.scss";
import { Category, RootState } from "type";

interface NavProps {
    listCate: Category[];
}

const Nav = (props: NavProps) => {
    const [childCate, setChildCate] = useState<Category[]>([]);
    const [grandChildCate, setGrandChildCate] = useState<Category[]>([]);
    const [userInfo, setUserInfo] = useState<string | null>(null);
    const lstCate = props.listCate;
    const lstParentCate = lstCate.filter((value) => value.parentCate === "");

    const getChild = (id: string) => {
        setChildCate([]);
        lstCate.forEach((value, key) => {
            if (value.deleted === false && value.status === "1") {
                if (value.parentCate.includes(id)) {
                    setChildCate((oldVal: any) => [...oldVal, value]);
                }
            }
        });
    };
    const getGrandChild = (id: string, parentType: string) => {
        setGrandChildCate([]);
        lstCate.forEach((value, key) => {
            if (value.deleted === false && value.status === "1") {
                if (value.parentCate.includes(id)) {
                    if (value.type === parentType || value.type === "0") {
                        setGrandChildCate((oldVal) => [...oldVal, value]);
                    } else if (
                        value.type === "4" &&
                        (parentType === "1" || parentType === "2")
                    ) {
                        setGrandChildCate((oldVal) => [...oldVal, value]);
                    } else if (
                        value.type === "5" &&
                        (parentType === "2" || parentType === "3")
                    ) {
                        setGrandChildCate((oldVal) => [...oldVal, value]);
                    }
                }
            }
        });
    };
    useEffect(() => {
        const userInfoLocal = localStorage.getItem("userInfo");
        if (userInfoLocal) setUserInfo(JSON.parse(userInfoLocal));
    }, []);
    const role = useSelector((state: RootState) => state.user.isAdmin);
    return (
        <div className="nav-item">
            <div className="container">
                <div className="nav-depart">
                    <div className="depart-btn">
                        <i className="ti-menu"></i>
                        <span>All category</span>
                        <ul className={`depart-hover ${style["depart-hover"]}`}>
                            {lstParentCate.map((cate, key) => {
                                return (
                                    <li
                                        key={key}
                                        onMouseEnter={() => {
                                            getChild(cate._id);
                                        }}
                                    >
                                        <Link href={`/category/${cate.slug}`}>
                                            {cate.name}
                                        </Link>
                                        <ul
                                            className={`depart-hover ${style["depart-hover"]} ${style["sub-menu"]}`}
                                        >
                                            {childCate !== undefined
                                                ? childCate.map(
                                                      (value, key) => {
                                                          return (
                                                              <li
                                                                  key={key}
                                                                  onMouseEnter={() =>
                                                                      getGrandChild(
                                                                          value._id,
                                                                          cate.type
                                                                      )
                                                                  }
                                                              >
                                                                  <Link
                                                                      href={`/category/${cate.slug}/${value.slug}`}
                                                                  >
                                                                      {
                                                                          value.name
                                                                      }
                                                                  </Link>
                                                                  <ul
                                                                      className={`depart-hover ${style["depart-hover"]} ${style["sub-menu"]}`}
                                                                  >
                                                                      {grandChildCate !==
                                                                      undefined
                                                                          ? grandChildCate.map(
                                                                                (
                                                                                    index,
                                                                                    key
                                                                                ) => {
                                                                                    return (
                                                                                        <li
                                                                                            key={
                                                                                                key
                                                                                            }
                                                                                        >
                                                                                            <Link
                                                                                                href={`/category/${cate.slug}/${value.slug}/${index.slug}`}
                                                                                            >
                                                                                                {
                                                                                                    index.name
                                                                                                }
                                                                                            </Link>
                                                                                        </li>
                                                                                    );
                                                                                }
                                                                            )
                                                                          : null}
                                                                      ;
                                                                  </ul>
                                                              </li>
                                                          );
                                                      }
                                                  )
                                                : null}
                                            ;
                                        </ul>
                                    </li>
                                );
                            })}
                            ;
                        </ul>
                    </div>
                </div>
                <nav className="nav-menu mobile-menu">
                    <ul>
                        <li className="active">
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <Link href="/blog">Blog</Link>
                        </li>
                        <li>
                            <Link href="/contact">Contact</Link>
                        </li>
                        <li>
                            <a href="/#">Pages</a>
                            <ul className="dropdown">
                                <li>
                                    <Link href="/view-cart">Shopping Cart</Link>
                                </li>
                                <li>
                                    <Link href="/view-cart/check-out">
                                        Checkout
                                    </Link>
                                </li>
                                {userInfo ? (
                                    <li>
                                        <Link href="/order-history">
                                            Order History
                                        </Link>
                                    </li>
                                ) : null}
                                {userInfo === null ? (
                                    <li>
                                        <Link href="/register">Register</Link>
                                    </li>
                                ) : null}
                                {userInfo === null ? (
                                    <li>
                                        <Link href="/login">Login</Link>
                                    </li>
                                ) : null}
                                {/* {JSON.parse(localStorage.getItem("userInfo")) !== null ? (
                                <li>
                                    <Link href="/login">Dashboard</Link>
                                </li>
                                ) : null} */}
                                {role === 1 ? (
                                    <li>
                                        <Link href="/admin">Dashboard</Link>
                                    </li>
                                ) : null}
                            </ul>
                        </li>
                        {userInfo !== null ? (
                            <li>
                                <Link href="/logout">Logout</Link>
                            </li>
                        ) : null}
                    </ul>
                </nav>
                <div id="mobile-menu-wrap"></div>
            </div>
        </div>
    );
};

export default Nav;
