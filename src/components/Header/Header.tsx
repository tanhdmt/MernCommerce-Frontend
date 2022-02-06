import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import Nav from "../Nav";
import { getCategories } from "../../redux/actions/categoryActions";
import { deleteCart } from "../../redux/actions/cartActions";
import { getSearch } from "../../redux/actions/productActions";
import { RootState } from "type";
const Header = () => {
    const dispatch = useDispatch();
    let router = useRouter();
    const lstCate = useSelector(
        (state: RootState) => state.category.categories
    );
    const numberCart = useSelector((state: RootState) => state.cart.numberCart);
    const proCart = useSelector((state: RootState) => state.cart.carts);
    const [search, setSearch] = useState("");
    // const [find, setFind] = useState(false);
    const [userInfo, setUserInfo] = useState<string | null>(null);

    useEffect(() => {
        if (localStorage) {
            const localUserInfo = localStorage.getItem("userInfo");
            setUserInfo(localUserInfo);
        }
    }, []);

    const handleFind = () => {
        if (search.length !== 0) {
            dispatch(getSearch(search));
            router.push(`/search?key=${search}`);
        }
    };

    var total = 0;

    const ToTalPro = (price: number, quantity: number) => {
        total += price * quantity;
    };

    const checkImage = (key: number) => {
        let arr: string[] = [];
        proCart.forEach((value) => {
            const imageArr = value.image.split(",");
            arr.push(imageArr[0]);
        });
        return arr[key];
    };

    const formatVND = (value: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(value);
    };

    function handleClick() {
        router.push("/");
    }

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <header className="header-section">
            <div className="header-top">
                <div className="container">
                    <div className="ht-left">
                        <div className="mail-service">
                            <i className=" fa fa-envelope"></i>
                            hello.colorlib@gmail.com
                        </div>
                        <div className="phone-service">
                            <i className=" fa fa-phone"></i>
                            +65 11.188.888
                        </div>
                    </div>
                    <div className="ht-right">
                        {userInfo ? (
                            <Link href="/">
                                <a
                                    onClick={handleClick}
                                    className="login-panel"
                                >
                                    <i className="fa fa-user"></i>
                                    {JSON.parse(userInfo).lastName}
                                </a>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <a className="login-panel">
                                    {" "}
                                    <i className="fa fa-user"></i>login
                                </a>
                            </Link>
                        )}

                        <div className="top-social">
                            <a href="/#">
                                <i className="ti-facebook"></i>
                            </a>
                            <a href="/#">
                                <i className="ti-twitter-alt"></i>
                            </a>
                            <a href="/#">
                                <i className="ti-linkedin"></i>
                            </a>
                            <a href="/#">
                                <i className="ti-pinterest"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="inner-header">
                    <div className="row">
                        <div className="col-lg-2 col-md-2">
                            <div className="logo">
                                <a href="/">
                                    <img src="assets/img/logo.png" alt="" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-7">
                            <div className="advanced-search">
                                {/* <button type="button" className="category-btn">All Categories</button> */}
                                <div className="input-group">
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setSearch(
                                                e.target.value.toLowerCase()
                                            )
                                        }
                                        placeholder="What do you need?"
                                    />
                                    <button
                                        type="submit"
                                        onClick={() => handleFind()}
                                    >
                                        <i className="ti-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 text-right col-md-3">
                            <ul className="nav-right">
                                <li className="heart-icon">
                                    <a href="/#">
                                        <i className="icon_heart_alt"></i>
                                        <span>0</span>
                                    </a>
                                </li>
                                <li className="cart-icon">
                                    <Link href="/view-cart">
                                        <a>
                                            <i className="icon_bag_alt"></i>
                                            <span>{numberCart}</span>
                                        </a>
                                    </Link>
                                    {numberCart !== 0 ? (
                                        <div className="cart-hover">
                                            <div className="select-items">
                                                <table>
                                                    <tbody>
                                                        {proCart.map(
                                                            (item, key) => {
                                                                ToTalPro(
                                                                    item.price,
                                                                    item.quantity
                                                                );
                                                                return (
                                                                    <tr
                                                                        key={
                                                                            key
                                                                        }
                                                                    >
                                                                        <td className="si-pic">
                                                                            <img
                                                                                src={`${
                                                                                    process
                                                                                        .env
                                                                                        .NEXT_PUBLIC_API_BASE_ENDPOINT
                                                                                }/products/${checkImage(
                                                                                    key
                                                                                )}`}
                                                                                alt=""
                                                                            />
                                                                        </td>
                                                                        <td className="si-text">
                                                                            <div className="product-selected">
                                                                                <p>
                                                                                    {formatVND(
                                                                                        item.price
                                                                                    )}{" "}
                                                                                    x{" "}
                                                                                    {
                                                                                        item.quantity
                                                                                    }
                                                                                </p>
                                                                                <h6>
                                                                                    {
                                                                                        item.name
                                                                                    }
                                                                                </h6>
                                                                            </div>
                                                                        </td>
                                                                        <td className="si-close">
                                                                            <i
                                                                                className="ti-close"
                                                                                onClick={() =>
                                                                                    dispatch(
                                                                                        deleteCart(
                                                                                            key
                                                                                        )
                                                                                    )
                                                                                }
                                                                            ></i>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            }
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="select-total">
                                                <span>total:</span>
                                                <h5>{formatVND(total)}</h5>
                                            </div>
                                            <div className="select-button">
                                                <Link href="/view-cart">
                                                    <a className="primary-btn view-card">
                                                        VIEW CARD
                                                    </a>
                                                </Link>
                                                <Link href="/view-cart/check-out">
                                                    <a className="primary-btn checkout-btn">
                                                        CHECK OUT
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                </li>
                                <li className="cart-price">
                                    {formatVND(total)}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {lstCate.Categories ? (
                <Nav listCate={lstCate.Categories} />
            ) : (
                <Nav listCate={[]} />
            )}
        </header>
    );
};

export default Header;
