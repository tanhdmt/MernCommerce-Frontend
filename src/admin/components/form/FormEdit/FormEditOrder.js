import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliveredOrder, detailsOrder, statusOrder } from '../../../../redux/actions/orderActions';
import { getColors, getSizes } from '../../../../redux/actions/productActions';
import '../style.scss';

const FormEditOrder = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.id;

    const get_order = useSelector((state) => state.order.order);
    const lstColors = useSelector((state) => state.product.colors_list);
    const lstSizes = useSelector((state) => state.product.sizes_list);

    const [changeStatus, setChangeStatus] = useState(0);
    const [saveStatus, setSaveStatus] = useState(get_order.status);

    const [changeDelivery, setChangeDelivery] = useState(0);
    const [saveDelivery, setSaveDelivery] = useState(get_order.delivered);

    const handleOnClickChange = (data) => {
        setChangeStatus(0);
        get_order.status = saveStatus;
        dispatch(statusOrder(data));
    }

    const handleClickChange = (data) => {
        setChangeDelivery(0);
        get_order.delivered = saveDelivery;
        dispatch(deliveredOrder(data));
    }

    const handleChangeStatus = () => {
        return (
            <div className="select-position">
                <select defaultValue={get_order.status} className='select_status' onChange={(e) => setSaveStatus(e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancel">Cancel</option>
                </select>
            </div>
        )
    }

    const handleChangeDelivery = () => {
        return (
            <div className="select-position">
                <select defaultValue={get_order.delivered} className='select_status' onChange={(e) => setSaveDelivery(e.target.value)}>
                    <option value="Preparing">Preparing</option>
                    <option value="Delivering">Delivering</option>
                    <option value="Delivered">Delivered</option>
                </select>
            </div>
        )
    }

    const checkColor = (id) => {
        var colorArr = [];
        if (lstColors.Colors) {
            lstColors.Colors.forEach((value) => {
                if (id.includes(value._id)) {
                    colorArr.push(value.code);
                }
            });
        }
        return colorArr.toString();
    }

    const checkSize = (id) => {
        var sizeArr = [];
        if (lstSizes.Sizes) {
            lstSizes.Sizes.forEach((value) => {
                if (id.includes(value._id)) {
                    sizeArr.push(value.name);
                }
            });
        }
        return <p>{sizeArr.toString()}</p>;
    }

    const checkImage = (key) => {
        let Arr = [];
        get_order.orderItems.forEach((value) => {
            const imageArr = value.image.split(',');
            Arr.push(imageArr[0]);
        });
        return Arr[key];
    }

    const formatVND = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', }).format(value);
    };

    useEffect(() => {
        document.title = "Manage Orders";
        if (id) dispatch(detailsOrder(id));
        dispatch(getColors());
        dispatch(getSizes());

        // notify();
        // setTimeout(clearMess, 5000);
        // history.push('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <section className="tab-components">
            <div className="container-fluid">
                {/* ========== title-wrapper start ========== */}
                <div className="title-wrapper pt-30">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="title mb-30">
                                <h2>Details Order</h2>
                            </div>
                        </div>
                        {/* end col */}
                        <div className="col-md-6">
                            <div className="breadcrumb-wrapper mb-30">
                                <nav aria-label="breadcrumb">
                                    <Link
                                        to={`/admin/orders`}
                                        className="main-btn active-btn btn-hover"
                                    >
                                        <i className="fas fa-chevron-circle-left"></i>&ensp;Back To List
                                    </Link>
                                </nav>
                            </div>
                        </div>
                        {/* end col */}
                    </div>
                    {/* end row */}
                </div>
                {/* ========== title-wrapper end ========== */}
                {get_order.length !== 0
                    ? <div className="row">
                        <div className="col-lg-12">
                            {/* input style start */}
                            <div className="card-style mb-30">
                                <div>
                                    <h4
                                        style={{
                                            fontSize: "25px",
                                            fontWeight: "700",
                                            color: "#595959",
                                            marginBottom: "5px"
                                        }}>
                                        <i className="fas fa-info"></i> Info Order
                                    </h4>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            {/* input style start */}
                                            <div className="card-style mb-30">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className='info_oder'>
                                                            <label htmlFor="id">Order Id:</label>
                                                            <p><strong>{get_order._id}</strong></p>
                                                        </div>
                                                        <div className='info_oder'>
                                                            <label htmlFor="cre">Created At:</label>
                                                            <p><strong>{moment(get_order.createdAt).utc().format("DD-MM-YYYY hh:ss")}</strong></p>
                                                        </div>
                                                        <div className='info_oder'>
                                                            <label htmlFor="fir">Payment Method:</label>
                                                            <p><strong>{get_order.paymentMethod}</strong></p>
                                                        </div>
                                                        <div className='info_oder'>
                                                            <label htmlFor="fir">Payment Status:</label>
                                                            <p><strong>{get_order.isPaid === true ? "Paid" : "No"}</strong></p>
                                                        </div>
                                                        <div className='info_oder'>
                                                            <label htmlFor="fir">Order Status:</label>
                                                            {changeStatus === 0
                                                                ? <p><strong>{get_order.status}</strong></p>
                                                                : handleChangeStatus()}
                                                        </div>
                                                        <div className='info_oder_button'>
                                                            {changeStatus === 0
                                                                ? <button
                                                                    onClick={() => setChangeStatus(1)}
                                                                    className="main-btn deactive-btn rounded-full btn-hover">
                                                                    Change Status
                                                                </button>
                                                                : <>
                                                                    <button
                                                                        onClick={() => handleOnClickChange({ id: get_order._id, saveStatus })}
                                                                        className="main-btn active-btn rounded-full btn-hover">
                                                                        Change
                                                                    </button>
                                                                    <button
                                                                        onClick={() => setChangeStatus(0)}
                                                                        className="main-btn light-btn rounded-full btn-hover">
                                                                        Cancel
                                                                    </button>
                                                                </>}
                                                        </div>
                                                        {/* end input */}
                                                    </div>
                                                    <div className="col-lg-6" style={{ textAlign: 'center' }} >
                                                        <div className='info_oder'>
                                                            <label htmlFor="cus">Customer:</label>
                                                            <p><strong>{get_order.shippingAddress.firstName + get_order.shippingAddress.lastName}</strong></p>
                                                        </div>
                                                        <div className='info_oder'>
                                                            <label htmlFor="fir">Total Price:</label>
                                                            <p><strong>{formatVND(get_order.orderItems.reduce((a, c) => a + c.price, 0))}</strong></p>
                                                        </div>
                                                        <div className='info_oder'>
                                                            <label htmlFor="fir">Shipping Fee:</label>
                                                            <p><strong>{get_order.shippingFee}</strong></p>
                                                        </div>
                                                        <div className='info_oder'>
                                                            <label htmlFor="fir">Total:</label>
                                                            <p><strong>{get_order.totalPrice}</strong></p>
                                                        </div>
                                                        <div className='info_oder'>
                                                            <label htmlFor="fir">Shipping Status:</label>
                                                            {changeDelivery === 0
                                                                ? <p><strong>{get_order.delivered}</strong></p>
                                                                : handleChangeDelivery()}
                                                        </div>
                                                        <div className='info_oder_button'>
                                                            {changeDelivery === 0
                                                                ? <button
                                                                    onClick={() => setChangeDelivery(1)}
                                                                    className="main-btn deactive-btn rounded-full btn-hover">
                                                                    Change Delivery
                                                                </button>
                                                                : <>
                                                                    <button
                                                                        onClick={() => handleClickChange({ id: get_order._id, saveDelivery })}
                                                                        className="main-btn active-btn rounded-full btn-hover">
                                                                        Change
                                                                    </button>
                                                                    <button
                                                                        onClick={() => setChangeDelivery(0)}
                                                                        className="main-btn light-btn rounded-full btn-hover">
                                                                        Cancel
                                                                    </button>
                                                                </>}
                                                        </div>
                                                    </div>
                                                    {/* end input */}
                                                </div>
                                                {/* end card */}
                                                {/* ======= input style end ======= */}
                                            </div>

                                        </div>
                                        {/* end col */}
                                    </div>
                                    {/* end row */}
                                </div>
                                <div style={{ marginTop: "20px" }}>
                                    <h4
                                        style={{
                                            fontSize: "25px",
                                            fontWeight: "700",
                                            color: "#595959",
                                            marginBottom: "5px"
                                        }}>
                                        <i className="fas fa-truck"></i> Billing & shipping
                                    </h4>
                                    <div className="row">
                                        <div className="col-lg-12" style={{ textAlign: 'center' }}>
                                            {/* input style start */}
                                            <div className="card-style mb-30">
                                                <div className="table-wrapper table-responsive">
                                                    <table className="table striped-table">
                                                        <tbody>
                                                            <tr>
                                                                <td>First Name</td>
                                                                <td><strong>{get_order.shippingAddress.firstName}</strong></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Last Name</td>
                                                                <td><strong>{get_order.shippingAddress.lastName}</strong></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Address</td>
                                                                <td><strong>{get_order.shippingAddress.address}</strong></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Email</td>
                                                                <td><strong>{get_order.shippingAddress.emailAddress}</strong></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Phone</td>
                                                                <td><strong>{get_order.shippingAddress.phone}</strong></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Note</td>
                                                                <td>{get_order.shippingAddress.note
                                                                    ? get_order.shippingAddress.note
                                                                    : <i style={{ opacity: "50%" }}>*Empty*</i>}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                {/* end card */}
                                                {/* ======= input style end ======= */}
                                            </div>

                                        </div>
                                        {/* end col */}
                                    </div>
                                    {/* end row */}
                                </div>
                                <div style={{ marginTop: "20px" }}>
                                    <h4
                                        style={{
                                            fontSize: "25px",
                                            fontWeight: "700",
                                            color: "#595959",
                                            marginBottom: "5px"
                                        }}>
                                        <i className="fas fa-th-list"></i> Products
                                    </h4>
                                    <div className="row">
                                        <div className="col-lg-12" style={{ textAlign: 'center' }}>
                                            {/* input style start */}
                                            <div className="card-style mb-30">
                                                <div className="table-wrapper table-responsive">
                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                    <h6>Image</h6>
                                                                </th>
                                                                <th>
                                                                    <h6>Product name</h6>
                                                                </th>
                                                                <th>
                                                                    <h6>Color</h6>
                                                                </th>
                                                                <th>
                                                                    <h6>Size</h6>
                                                                </th>
                                                                <th>
                                                                    <h6>Price</h6>
                                                                </th>
                                                                <th>
                                                                    <h6>Quantity</h6>
                                                                </th>
                                                                <th>
                                                                    <h6>Total</h6>
                                                                </th>
                                                                {/* <th>
                                                                    <h6>Options</h6>
                                                                </th> */}
                                                            </tr>
                                                            {/*-- end table row--*/}
                                                        </thead>
                                                        {get_order.orderItems.length === 0 ? (
                                                            <p className="text-center">No products</p>
                                                        ) : (
                                                            <tbody>
                                                                {get_order.orderItems.map((value, key) => {
                                                                    return (
                                                                        <tr key={key} id={value._id}>
                                                                            <td className="min-width th-admin">
                                                                                <img
                                                                                    src={`http://localhost:5000/products/${checkImage(key)}`}
                                                                                    alt=""
                                                                                />
                                                                            </td>
                                                                            <td className="min-width">
                                                                                <p>{value.name}</p>
                                                                            </td>
                                                                            <td className="min-width" style={{ width: '50px' }}>
                                                                                <div className="code-color" style={{ backgroundColor: checkColor(value.color) }}> </div>
                                                                            </td>
                                                                            <td className="min-width">
                                                                                {checkSize(value.size)}
                                                                            </td>
                                                                            <td className="min-width">
                                                                                <p>{formatVND(value.price)}</p>
                                                                            </td>
                                                                            <td className="min-width">
                                                                                <p>{value.quantity}</p>
                                                                            </td>
                                                                            <td className="min-width">
                                                                                <p>{formatVND(value.price * value.quantity)}</p>
                                                                            </td>
                                                                            {/* <td>
                                                                                <div className="action">
                                                                                    <Link
                                                                                        to={`${url}/${value._id}`}
                                                                                        className="text-primary"
                                                                                        title="Edit"
                                                                                    >
                                                                                        <i className="fas fa-pen-square"></i>
                                                                                    </Link>
                                                                                </div>
                                                                            </td> */}
                                                                        </tr>

                                                                    );
                                                                })}
                                                                {/*-- end table row --*/}
                                                            </tbody>
                                                        )}

                                                    </table>
                                                </div>
                                                {/* end card */}
                                                {/* ======= input style end ======= */}
                                            </div>

                                        </div>
                                        {/* end col */}
                                    </div>
                                    {/* end row */}
                                </div>
                                {/* end input */}
                            </div>
                            {/* end card */}
                            {/* ======= input style end ======= */}
                        </div>
                        {/* end col */}
                    </div>
                    : <></>}
                {/* end row */}
            </div>
            {/* end container */}
        </section>
    )
}

export default FormEditOrder
