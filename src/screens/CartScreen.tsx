/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "type";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    decreaseQuantity,
    deleteAllCart,
    deleteCart,
    increaseQuantity,
} from "../redux/actions/cartActions";
import { getColors, getSizes } from "../redux/actions/productActions";

const CartScreen = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const proCart = useSelector((state: RootState) => state.cart.carts);
    const lstCate = useSelector(
        (state: RootState) => state.category.categories
    );
    const lstColors = useSelector(
        (state: RootState) => state.product.colors_list
    );
    const lstSizes = useSelector(
        (state: RootState) => state.product.sizes_list
    );
    const [totalCart, setTotalCart] = useState(0);
    const [qtyPro, setQtyPro] = useState(0);

    const checkSlug = (id: string) => {
        var catArr: string[] = [];
        var catslug: string = "";
        if (lstCate.Categories) {
            lstCate.Categories.forEach((value) => {
                if (id.includes(value._id)) {
                    catArr.push(value.slug);
                }
            });
            catArr.forEach((value) => {
                catslug += value + "/";
            });
        }
        return catslug.slice(0, -1);
    };

    const QtyUpdateIncr = (key: number, quantity: number) => {
        dispatch(increaseQuantity(key));
        setQtyPro(quantity);
    };

    const QtyUpdatedecr = (key: number, quantity: number) => {
        dispatch(decreaseQuantity(key));
        setQtyPro(quantity);
    };

    const handleDelate = (key: number) => {
        dispatch(deleteCart(key));
        window.location.reload();
    };

    const handleDetail = (key: number) => {
        dispatch(deleteCart(key));
    };

    const deleteAll = () => {
        dispatch(deleteAllCart());
        window.location.reload();
    };

    const checkColor = (id: string) => {
        var colorArr: string[] = [];
        if (lstColors.Colors) {
            lstColors.Colors.forEach((value) => {
                if (id.includes(value._id)) {
                    colorArr.push(value.code);
                }
            });
        }
        return colorArr.toString();
    };

    const checkSize = (id: string) => {
        var sizeArr: string[] = [];
        if (lstSizes.Sizes) {
            lstSizes.Sizes.forEach((value) => {
                if (id.includes(value._id)) {
                    sizeArr.push(value.name);
                }
            });
        }
        return <b>{sizeArr.toString()}</b>;
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

    useEffect(() => {
        dispatch(getColors());
        dispatch(getSizes());

        const getTotal = () => {
            if (proCart.length !== 0) {
                const total = proCart.reduce((prev, item) => {
                    return prev + item.price * item.quantity;
                }, 0);
                setTotalCart(total);
            }
        };
        getTotal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [proCart]);

    return (
        <div>
            {/* !-- Breadcrumb Section Begin -- */}
            <div className="breacrumb-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-text product-more">
                                <a href="/">
                                    <i className="fa fa-home"></i> Home
                                </a>
                                <span>Shopping Cart</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* !-- Breadcrumb Section End -- */}

            {/* !-- Shopping Cart Section Begin -- */}
            <section className="shopping-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="cart-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th className="p-name">
                                                Product Name
                                            </th>
                                            <th>Size</th>
                                            <th>Color</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th>
                                                <i
                                                    onClick={() => deleteAll()}
                                                    className="ti-close"
                                                ></i>
                                            </th>
                                            <th>
                                                <i
                                                    onClick={() => deleteAll()}
                                                    className="ti-close"
                                                ></i>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {proCart.length !== 0 ? (
                                            proCart.map((item, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td className="cart-pic first-row">
                                                            <img
                                                                src={`${
                                                                    process.env
                                                                        .NEXT_PUBLIC_API_BASE_ENDPOINT
                                                                }/products/${checkImage(
                                                                    key
                                                                )}`}
                                                                alt=""
                                                            />
                                                        </td>
                                                        <td className="cart-title first-row">
                                                            <h5>{item.name}</h5>
                                                        </td>
                                                        {item.size.length !==
                                                        0 ? (
                                                            <td className="cart-size first-row">
                                                                <h5>
                                                                    {checkSize(
                                                                        item.size
                                                                    )}
                                                                </h5>
                                                            </td>
                                                        ) : (
                                                            <td
                                                                className="cart-size first-row"
                                                                style={{
                                                                    paddingLeft:
                                                                        "20px",
                                                                    paddingRight:
                                                                        "15px",
                                                                    fontStyle:
                                                                        "italic",
                                                                    opacity:
                                                                        "50%",
                                                                }}
                                                            >
                                                                <h5>None</h5>
                                                            </td>
                                                        )}

                                                        <td className="cart-color first-row">
                                                            {item.color
                                                                .length !==
                                                            0 ? (
                                                                <div
                                                                    className="code-color"
                                                                    style={{
                                                                        backgroundColor:
                                                                            checkColor(
                                                                                item.color
                                                                            ),
                                                                    }}
                                                                >
                                                                    {" "}
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    style={{
                                                                        paddingLeft:
                                                                            "15px",
                                                                        paddingRight:
                                                                            "15px",
                                                                        fontStyle:
                                                                            "italic",
                                                                        opacity:
                                                                            "50%",
                                                                        fontSize:
                                                                            "18px",
                                                                    }}
                                                                >
                                                                    <h5>
                                                                        None
                                                                    </h5>
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="p-price first-row">
                                                            {formatVND(
                                                                item.price
                                                            )}
                                                        </td>
                                                        <td className="qua-col first-row">
                                                            <div className="quantity">
                                                                <div className="pro-qty">
                                                                    <span
                                                                        onClick={() =>
                                                                            QtyUpdatedecr(
                                                                                key,
                                                                                item.quantity
                                                                            )
                                                                        }
                                                                        className="dec qtybtn"
                                                                    >
                                                                        -
                                                                    </span>
                                                                    <input
                                                                        type="text"
                                                                        value={
                                                                            item.quantity
                                                                                ? item.quantity
                                                                                : 1
                                                                        }
                                                                        readOnly
                                                                    />
                                                                    <span
                                                                        onClick={() =>
                                                                            QtyUpdateIncr(
                                                                                key,
                                                                                item.quantity
                                                                            )
                                                                        }
                                                                        className="inc qtybtn"
                                                                    >
                                                                        +
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="total-price first-row">
                                                            {formatVND(
                                                                item.price *
                                                                    item.quantity
                                                            )}
                                                        </td>
                                                        <td className="close-td first-row">
                                                            <i
                                                                onClick={() =>
                                                                    handleDelate(
                                                                        key
                                                                    )
                                                                }
                                                                className="ti-close"
                                                            ></i>
                                                        </td>
                                                        <td className="close-td first-row">
                                                            <Link
                                                                href={`/category/${checkSlug(
                                                                    item.categoryId
                                                                )}/product/${
                                                                    item.id
                                                                }`}
                                                            >
                                                                <a>
                                                                    <i
                                                                        onClick={() =>
                                                                            handleDetail(
                                                                                key
                                                                            )
                                                                        }
                                                                        className="far fa-edit"
                                                                    ></i>
                                                                </a>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan={5}>
                                                    <h2
                                                        style={{
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        Cart Empty
                                                    </h2>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="cart-buttons">
                                        <a
                                            href="/#"
                                            className="primary-btn continue-shop"
                                        >
                                            Continue shopping
                                        </a>
                                        <span
                                            className="primary-btn up-cart"
                                            onClick={() =>
                                                window.location.reload()
                                            }
                                        >
                                            Update cart
                                        </span>
                                    </div>
                                    <div className="discount-coupon">
                                        <h6>Discount Codes</h6>
                                        <form
                                            action="#"
                                            className="coupon-form"
                                        >
                                            <input
                                                type="text"
                                                placeholder="Enter your codes"
                                            />
                                            <button
                                                type="submit"
                                                className="site-btn coupon-btn"
                                            >
                                                Apply
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-4 offset-lg-4">
                                    <div className="proceed-checkout">
                                        <ul>
                                            <li className="subtotal">
                                                Subtotal({" "}
                                                {proCart.reduce(
                                                    (a, c) => a + c.quantity,
                                                    0
                                                )}{" "}
                                                items ){" "}
                                                <span>
                                                    {formatVND(totalCart)}
                                                </span>
                                            </li>
                                            <li className="cart-total">
                                                Total{" "}
                                                <span>
                                                    {formatVND(totalCart)}
                                                </span>
                                            </li>
                                        </ul>
                                        <Link
                                            href={`${router.pathname}/check-out`}
                                        >
                                            <a className="proceed-btn">
                                                PROCEED TO CHECK OUT
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* !-- Shopping Cart Section End -- */}
        </div>
    );
};

export default CartScreen;
