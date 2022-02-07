import { FastField, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import InputField from "../components/InputField/InputField";
import TextareaField from "../components/InputField/TextareaField";
import { ORDER_CREATE_RESET } from "../constants/orderConstant";
import { createOrder } from "../redux/actions/orderActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "type";
import { useRouter } from "next/router";

const CheckOutScreen = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const proCart = useSelector((state: RootState) => state.cart.carts);
    const orderCreate = useSelector((state: RootState) => state.order);
    const { success, order } = orderCreate;
    const [subTotal, setSubTotal] = useState(0);
    const [totalCart, setTotalCart] = useState(0);
    const [shippingFee, setShippingFee] = useState(0);
    const [checkCash, setCheckCash] = useState(true);
    const [checkPaypal, setCheckPaypal] = useState(false);
    const [payment, setPayment] = useState("cash");

    let initialValues = {
        id: "61b6de8cb6cd4976d4f59b83",
        firstName: "",
        lastName: "",
        address: "",
        emailAddress: "",
        phone: "",
        note: "",
    };

    useEffect(() => {
        const localUserInfo = localStorage.getItem("userInfo");
        if (localUserInfo) {
            const userInfo = JSON.parse(localUserInfo);
            if (userInfo) {
                initialValues = {
                    id: JSON.parse(userInfo)?._id,
                    firstName: JSON.parse(userInfo)?.firstName,
                    lastName: JSON.parse(userInfo)?.lastName,
                    address: JSON.parse(userInfo)?.address,
                    emailAddress: JSON.parse(userInfo)?.email,
                    phone: JSON.parse(userInfo)?.phone,
                    note: "",
                };
            }
        }
    }, []);

    const notifySize = (data: string, qty: number) => {
        toast.error("Vui lòng chọn size cho " + qty + " sản phẩm, là " + data, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const notifyColor = (data: string, qty: number) => {
        toast.error("Vui lòng chọn màu cho " + qty + " sản phẩm, là " + data, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("Bạn phải nhập họ"),
        lastName: Yup.string().required("Bạn phải nhập Tên"),
        address: Yup.string().required("Bạn phải nhập địa chỉ"),
        phone: Yup.string()
            .min(10, "Số điện thoại không hợp lệ")
            .max(11, "Số điện thoại không hợp lệ")
            .required("Bạn phải nhập Số ĐT"),
        emailAddress: Yup.string()
            .email("Email không hợp lệ")
            .required("Bạn phải nhập Email"),
    });

    const checkedPayment = (id: string) => {
        if (id === "pc-paypal") {
            setCheckPaypal(true);
            setCheckCash(false);
            setPayment("paypal");
        } else {
            setCheckPaypal(false);
            setCheckCash(true);
            setPayment("cash");
        }
    };

    const formatVND = (value: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(value);
    };

    useEffect(() => {
        if (success === true && order?._id) {
            router.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
        const getTotal = () => {
            const total = proCart.reduce((prev, item) => {
                return prev + item.price * item.quantity;
            }, 0);
            setSubTotal(total);
            if (total !== 0) {
                setShippingFee(total > 5000000 ? 0 : 50000);
            }
            setTotalCart(total + shippingFee);
        };
        getTotal();
    }, [dispatch, order, proCart, shippingFee, success]);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(value) => {
                var sizes = proCart.filter((value) => value.size === "");
                var colors = proCart.filter((value) => value.color === "");
                if (sizes.length !== 0) {
                    var temp1 = "";
                    sizes.forEach((element) => {
                        temp1 += element.name + " và ";
                    });
                    notifySize(temp1.slice(0, -4), sizes.length);
                } else if (colors.length !== 0) {
                    var temp2 = "";
                    colors.forEach((element) => {
                        temp2 += element.name + " và ";
                    });
                    notifyColor(temp2.slice(0, -4), colors.length);
                } else {
                    console.log(true);
                    dispatch(
                        createOrder({
                            orderItems: proCart,
                            shippingFee: shippingFee,
                            totalPrice: totalCart,
                            shippingAddress: {
                                firstName: value.firstName,
                                lastName: value.lastName,
                                address: value.address,
                                emailAddress: value.emailAddress,
                                phone: value.phone,
                                note: value.note,
                            },
                            paymentMethod: payment,
                            user: value.id,
                        })
                    );
                }
            }}
        >
            {(FormikProps) => {
                return (
                    <div>
                        {/* !-- Breadcrumb Section Begin -- */}
                        <div className="breacrumb-section">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="breadcrumb-text product-more">
                                            <a href="/">
                                                <i className="fa fa-home"></i>{" "}
                                                Home
                                            </a>
                                            <a href="/view-cart">Cart</a>
                                            <span>Check Out</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* !-- Breadcrumb Section End -- */}

                        {/* !-- Checkout Section End -- */}
                        <section className="checkout-section spad">
                            <div className="container">
                                <Form className="checkout-form">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="checkout-content">
                                                <a
                                                    href="/#"
                                                    className="content-btn"
                                                >
                                                    Click Here To Login
                                                </a>
                                            </div>
                                            <h4>Biiling Details</h4>
                                            <div className="row">
                                                <FastField
                                                    type="firstName"
                                                    name="firstName"
                                                    label="First Name"
                                                    component={InputField}
                                                    className="col-lg-6"
                                                    id="firstName"
                                                    placeholder="Input Firstname"
                                                />
                                                <FastField
                                                    type="lastName"
                                                    name="lastName"
                                                    label="Last Name"
                                                    component={InputField}
                                                    className="col-lg-6"
                                                    id="lastName"
                                                    placeholder="Input Lastname"
                                                />
                                                <FastField
                                                    type="address"
                                                    name="address"
                                                    label="Address"
                                                    component={InputField}
                                                    className="col-lg-12"
                                                    id="address"
                                                    placeholder="Input Address"
                                                />
                                                <FastField
                                                    type="email"
                                                    name="emailAddress"
                                                    label="Email Address"
                                                    component={InputField}
                                                    className="col-lg-6"
                                                    id="emailAddress"
                                                    placeholder="Input Email Address"
                                                />
                                                <FastField
                                                    type="phone"
                                                    name="phone"
                                                    label="Phone"
                                                    component={InputField}
                                                    className="col-lg-6"
                                                    id="phone"
                                                    placeholder="Input Phone"
                                                />
                                                <FastField
                                                    type="textarea"
                                                    name="note"
                                                    label="Note"
                                                    component={TextareaField}
                                                    rows="6"
                                                    className="col-lg-12"
                                                    id="note"
                                                    placeholder="Input Note"
                                                />

                                                {/* <div className="col-lg-12">
                                                        <div className="create-item">
                                                            <label htmlFor="acc-create">
                                                                Create an account?
                                                                <input type="checkbox" id="acc-create" />
                                                                <span className="checkmark"></span>
                                                            </label>
                                                        </div>
                                                    </div> */}
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="checkout-content">
                                                <input
                                                    type="text"
                                                    placeholder="Enter Your Coupon Code"
                                                />
                                            </div>
                                            <div className="place-order">
                                                <h4>Your Order</h4>
                                                <div className="order-total">
                                                    <ul className="order-table">
                                                        <li>
                                                            Product{" "}
                                                            <span>Total</span>
                                                        </li>
                                                        {proCart.length !==
                                                        0 ? (
                                                            proCart.map(
                                                                (item, key) => {
                                                                    return (
                                                                        <li
                                                                            key={
                                                                                key
                                                                            }
                                                                            className="fw-normal"
                                                                        >
                                                                            {
                                                                                item.name
                                                                            }{" "}
                                                                            x{" "}
                                                                            {
                                                                                item.quantity
                                                                            }
                                                                            <span>
                                                                                {formatVND(
                                                                                    item.price *
                                                                                        item.quantity
                                                                                )}
                                                                            </span>
                                                                        </li>
                                                                    );
                                                                }
                                                            )
                                                        ) : (
                                                            <li className="fw-normal">
                                                                Empty Product{" "}
                                                                <span>
                                                                    {formatVND(
                                                                        0
                                                                    )}
                                                                </span>
                                                            </li>
                                                        )}
                                                        <li className="fw-normal">
                                                            Subtotal({" "}
                                                            {proCart.reduce(
                                                                (a, c) =>
                                                                    a +
                                                                    c.quantity,
                                                                0
                                                            )}{" "}
                                                            items )
                                                            <span>
                                                                {formatVND(
                                                                    subTotal
                                                                )}
                                                            </span>
                                                        </li>
                                                        <li className="fw-normal">
                                                            Shipping Fee
                                                            <span>
                                                                {formatVND(
                                                                    shippingFee
                                                                )}
                                                            </span>
                                                        </li>
                                                        <li className="total-price">
                                                            Total{" "}
                                                            <span>
                                                                {formatVND(
                                                                    totalCart
                                                                )}
                                                            </span>
                                                        </li>
                                                    </ul>
                                                    <div className="payment-check">
                                                        <div className="pc-item">
                                                            <label htmlFor="pc-cash">
                                                                Cash
                                                                <input
                                                                    checked={
                                                                        checkCash
                                                                    }
                                                                    type="checkbox"
                                                                    id="pc-cash"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        checkedPayment(
                                                                            e
                                                                                .target
                                                                                .id
                                                                        )
                                                                    }
                                                                />
                                                                <span className="checkmark"></span>
                                                            </label>
                                                        </div>
                                                        <div className="pc-item">
                                                            <label htmlFor="pc-paypal">
                                                                Paypal
                                                                <input
                                                                    checked={
                                                                        checkPaypal
                                                                    }
                                                                    type="checkbox"
                                                                    id="pc-paypal"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        checkedPayment(
                                                                            e
                                                                                .target
                                                                                .id
                                                                        )
                                                                    }
                                                                />
                                                                <span className="checkmark"></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {proCart.length !== 0 ? (
                                                        <div className="order-btn">
                                                            <button
                                                                type="submit"
                                                                className="site-btn place-btn"
                                                            >
                                                                Place Order
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </section>
                        {/* !-- Checkout Section End -- */}
                    </div>
                );
            }}
        </Formik>
    );
};

export default CheckOutScreen;
