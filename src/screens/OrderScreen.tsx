import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api";
import { detailsOrder, payOrder } from "../redux/actions/orderActions";
import { ORDER_PAY_RESET } from "../constants/orderConstant";
import MessageBox from "../components/Box/MessageBox";
import { RootState } from "type";

interface OrderScreenProps {
    slug: {
        slug: string;
    };
}

const OrderScreen = (props: OrderScreenProps) => {
    const dispatch = useDispatch();
    const orderId = props.slug?.slug;
    console.log(props.slug);
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector((state: RootState) => state.order);
    const { order } = orderDetails;

    const oderPay = useSelector((state: RootState) => state.order);
    const { success: successPay } = oderPay;

    const formatVND = (value: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(value);
    };

    // const successPaymentHandler = (paymentResult) => {
    //     dispatch(payOrder(order, paymentResult));
    // };

    useEffect(() => {
        // const addPayPalScript = async () => {
        //     const { data } = await api.get("/api/config/paypal");
        //     const script = document.createElement("script");
        //     script.type = "text/javascript";
        //     script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
        //     script.async = true;
        //     script.onload = () => {
        //         setSdkReady(true);
        //     };
        //     document.body.appendChild(script);
        // };
        if (!order || successPay || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(detailsOrder(orderId));
        } else {
            if (!order.isPaid) {
                setSdkReady(true);
            }
        }
    }, [dispatch, order, orderId, sdkReady, successPay]);

    return order ? (
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
                                <span>Order Status</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* !-- Breadcrumb Section End -- */}

            {/* !-- Checkout Section End -- */}
            <section className="checkout-section spad">
                <div className="container">
                    <form action="#" className="checkout-form">
                        <div className="row">
                            <div className="col-lg-6">
                                <h4>Biiling Details</h4>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <label htmlFor="fir">First Name</label>
                                        <p>
                                            <strong>
                                                {
                                                    order.shippingAddress
                                                        ?.firstName
                                                }
                                            </strong>
                                        </p>
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="last">Last Name</label>
                                        <p>
                                            <strong>
                                                {
                                                    order.shippingAddress
                                                        ?.lastName
                                                }
                                            </strong>
                                        </p>
                                    </div>
                                    <div className="col-lg-12">
                                        <label htmlFor="street">Address</label>
                                        <p>
                                            <strong>
                                                {order.shippingAddress?.address}
                                            </strong>
                                        </p>
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="email">
                                            Email Address
                                        </label>
                                        <p>
                                            <strong>
                                                {
                                                    order.shippingAddress
                                                        ?.emailAddress
                                                }
                                            </strong>
                                        </p>
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="phone">Phone</label>
                                        <p>
                                            <strong>
                                                {order.shippingAddress?.phone}
                                            </strong>
                                        </p>
                                    </div>
                                    {order.shippingAddress?.note?.length !==
                                    0 ? (
                                        <div className="col-lg-12">
                                            <label htmlFor="note">Note</label>
                                            <p>{order.shippingAddress?.note}</p>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}

                                    {order.delivered === "Delivered" ? (
                                        <MessageBox variant="success">
                                            Delivered at {order.deliveredAt}
                                        </MessageBox>
                                    ) : order.delivered === "Delivering" ? (
                                        <MessageBox variant="warning">
                                            Delivering
                                        </MessageBox>
                                    ) : (
                                        <MessageBox variant="danger">
                                            Preparing
                                        </MessageBox>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="place-order">
                                    <h4>Your Order</h4>
                                    <div className="order-total">
                                        <ul className="order-table">
                                            <li>
                                                Product <span>Total</span>
                                            </li>
                                            {order.orderItems?.map(
                                                (item, key) => {
                                                    return (
                                                        <li
                                                            key={key}
                                                            className="fw-normal"
                                                        >
                                                            {item.name} x{" "}
                                                            {item.quantity}
                                                            <span>
                                                                {formatVND(
                                                                    item.price *
                                                                        item.quantity
                                                                )}
                                                            </span>
                                                        </li>
                                                    );
                                                }
                                            )}
                                            <li className="fw-normal">
                                                Subtotal{" "}
                                                <span>
                                                    {formatVND(
                                                        order.totalPrice -
                                                            order.shippingFee
                                                    )}
                                                </span>
                                            </li>
                                            <li className="fw-normal">
                                                Shipping Fee
                                                <span>
                                                    {formatVND(
                                                        order.shippingFee
                                                    )}
                                                </span>
                                            </li>
                                            <li className="total-price">
                                                Total{" "}
                                                <span>
                                                    {formatVND(
                                                        order.totalPrice
                                                    )}{" "}
                                                    = $
                                                    {(
                                                        order.totalPrice / 25000
                                                    ).toFixed(2)}
                                                </span>
                                            </li>
                                        </ul>
                                        {order.isPaid ? (
                                            <MessageBox variant="success">
                                                Paid at {order.paidAt}
                                            </MessageBox>
                                        ) : (
                                            <MessageBox variant="danger">
                                                Not Paid
                                            </MessageBox>
                                        )}
                                        <div className="payment-check">
                                            <label>Payment: </label>
                                            <p>
                                                <strong>
                                                    {order.paymentMethod}
                                                </strong>
                                            </p>
                                        </div>
                                        {/* <div>
                                            {sdkReady &&
                                            order.paymentMethod === "paypal" &&
                                            order.isPaid === false ? (
                                                <PayPalButton
                                                    amount={(
                                                        order.totalPrice / 25000
                                                    ).toFixed(2)}
                                                    onSuccess={
                                                        successPaymentHandler
                                                    }
                                                ></PayPalButton>
                                            ) : (
                                                <></>
                                            )}
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            {/* !-- Checkout Section End -- */}
        </div>
    ) : (
        <div></div>
    );
};

export default OrderScreen;
