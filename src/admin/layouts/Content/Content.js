import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrder } from '../../../redux/actions/orderActions';
import { getProducts } from '../../../redux/actions/productActions';
import ChartPrice from '../../components/chart/ChartPrice';
import ChartProduct from '../../components/chart/ChartProduct';
import TopSaleTable from '../../components/table/TopSaleTable';
// import DateRagersPicker from '../../components/date/DateRagersPicker';

const Content = () => {
    const dispatch = useDispatch();
    const listOrders = useSelector(state => state.order.orders);
    var today = new Date();
    var orderYear = [];
    if (listOrders && listOrders.Orders) {
        orderYear = listOrders.Orders.filter(value => Number(value.createdAt.substring(0, 4)) === moment().year())
    }
    var orderMonth = orderYear.filter(value => value.createdAt.substring(5, 7) === (today.getMonth() + 1).toString());
    var orderLastMonth = orderYear.filter(value => value.createdAt.substring(5, 7) === today.getMonth().toString());
    const [reqOptionPrice, setReqOptionPrice] = useState(0);
    const [reqOptionPro, setReqOptionPro] = useState(1);
    const [reqOptionTopSale, setReqOptionTopSale] = useState(2);

    const handleChangePrice = () => {
        var e = document.getElementById("ddlViewBy").selectedIndex;
        setReqOptionPrice(e);
    }

    const handleChangePro = () => {
        var e = document.getElementById("ddlViewBy1").selectedIndex;
        setReqOptionPro(e);
    }

    const handleChangeTopSale = () => {
        var e = document.getElementById("ddlViewBy2").selectedIndex;
        setReqOptionTopSale(e);
    }

    const TotalYearly = () => {
        if (listOrders.Orders) {
            const total = listOrders.Orders.reduce((prev, item) => {
                return prev += item.totalPrice;
            }, 0);
            return total;
        } else {
            return 0;
        }
    }

    const TotalMonthly = () => {
        if (listOrders.Orders.length !== 0) {
            const total = orderYear.reduce((prev, item) => {
                return prev += item.totalPrice;
            }, 0);
            return total;
        } else {
            return 0;
        }
    }

    const TotalWeekly = () => {
        if (listOrders.Orders.length !== 0) {
            const total = orderMonth.reduce((prev, item) => {
                return prev += item.totalPrice;
            }, 0);
            return total;
        } else {
            return 0;
        }
    }

    const TotalIncome = () => {
        if (orderMonth && orderLastMonth) {
            const after = orderMonth.reduce((prev, item) => {
                return prev + item.totalPrice;
            }, 0);
            const before = orderLastMonth.reduce((prev, item) => {
                return prev + item.totalPrice;
            }, 0);
            return (
                <>
                    <h3 className="text-bold mb-10">${(after / 25000).toFixed(2)}</h3>
                    {after > before
                        ? <p className="text-sm text-success">
                            {percent(before, after)}
                            <span className="text-gray">Increased</span>
                        </p>
                        : after === before
                            ? <p className="text-sm">
                                {percent(before, after)}
                            </p>
                            : <p className="text-sm text-danger">
                                {percent(before, after)}
                                <span className="text-gray">Decrease</span>
                            </p>}
                </>
            )
        } else {
            return (
                <>
                    <h3 className="text-bold mb-10">$0</h3>
                    <p className="text-sm">
                        {percent(0, 0)}
                    </p>
                </>
            )
        }
    }

    const percent = (before, after) => {
        if (before > after) {
            return (
                <>
                    <i className="lni lni-arrow-down" /> -{((after * 100) / before).toFixed(2)}%
                </>
            )
        } else if (before === after) {
            return (
                <>
                    <b className="text-gray">{((after * 100) / before).toFixed(2)}%</b>
                </>
            )
        } else if (before < after) {
            if (before === 0) {
                return (
                    <>
                        <i className="lni lni-arrow-up" /> +{100.00.toFixed(2)}%
                    </>
                )
            } else {
                return (
                    <>
                        <i className="lni lni-arrow-up" /> +{((after * 100) / before).toFixed(2)}%
                    </>
                )
            }
        } else {
            <>
                <b className="text-gray">0%</b>
            </>
        }
    }

    useEffect(() => {
        dispatch(listOrder())
        dispatch(getProducts())
        document.title = "Dashboard";
    }, [dispatch]);

    return (
        <section className="section">
            <div className="container-fluid">
                {/* ========== title-wrapper start ========== */}
                <div className="title-wrapper pt-30">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="title mb-30">
                                <h2>eCommerce Dashboard</h2>
                            </div>
                        </div>
                        {/* end col */}
                        {/* <div className="col-md-6">
                            <div className="breadcrumb-wrapper mb-30">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="#0">Dashboard</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            eCommerce
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div> */}
                        {/* end col */}
                    </div>
                    {/* end row */}
                </div>
                {/* ========== title-wrapper end ========== */}
                <div className="row">
                    <div className="col-xl-6 col-lg-4 col-sm-6">
                        <div className="icon-card mb-30">
                            <div className="icon purple">
                                <i className="lni lni-cart-full" />
                            </div>
                            <div className="content">
                                <h6 className="mb-10">New Orders</h6>
                                <h3 className="text-bold mb-10">{orderMonth.length ? orderMonth.length : 0}</h3>
                                <p className="text-sm text-success">
                                    {percent(orderLastMonth.length, orderMonth.length)}
                                    {/* <i className="lni lni-arrow-up" /> +2.00% */}
                                    <span className="text-gray">(30 days)</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* End Col */}
                    <div className="col-xl-6 col-lg-4 col-sm-6">
                        <div className="icon-card mb-30">
                            <div className="icon success">
                                <i className="lni lni-dollar" />
                            </div>
                            <div className="content">
                                <h6 className="mb-10">Total Income</h6>
                                {TotalIncome()}
                            </div>
                        </div>
                    </div>
                    {/* End Col */}
                    {/* <div className="col-xl-3 col-lg-4 col-sm-6">
                        <div className="icon-card mb-30">
                            <div className="icon primary">
                                <i className="lni lni-credit-cards" />
                            </div>
                            <div className="content">
                                <h6 className="mb-10">Total Expense</h6>
                                <h3 className="text-bold mb-10">$24,567</h3>
                                <p className="text-sm text-danger">
                                    <i className="lni lni-arrow-down" /> -2.00%
                                    <span className="text-gray">Expense</span>
                                </p>
                            </div>
                        </div>
                    </div> */}
                    {/* End Col */}
                    {/* <div className="col-xl-3 col-lg-4 col-sm-6">
                        <div className="icon-card mb-30">
                            <div className="icon orange">
                                <i className="lni lni-user" />
                            </div>
                            <div className="content">
                                <h6 className="mb-10">New User</h6>
                                <h3 className="text-bold mb-10">34567</h3>
                                <p className="text-sm text-danger">
                                    <i className="lni lni-arrow-down" /> -25.00%
                                    <span className="text-gray"> Earning</span>
                                </p>
                            </div>
                        </div>
                    </div> */}
                    {/* End Col */}
                </div>
                {/* End Row */}
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card-style mb-30">
                            <div className="title d-flex flex-wrap justify-content-between">
                                <div className="left">
                                    <h6 className="text-medium mb-10">Income Statistics</h6>
                                    <h3 className="text-bold">
                                        ${reqOptionPrice === 0
                                            ? (TotalYearly() / 25000).toFixed(2)
                                            : reqOptionPrice === 1
                                                ? (TotalMonthly() / 25000).toFixed(2)
                                                : (TotalWeekly() / 25000).toFixed(2)}
                                    </h3>
                                </div>
                                <div className="right">
                                    <div className="select-style-1">
                                        <div className="select-position select-sm">
                                            <select className="light-bg" id="ddlViewBy" onChange={() => handleChangePrice()}>
                                                <option value='1' selected={true}>Yearly</option>
                                                <option value='2'>Monthly</option>
                                                <option value='3'>Weekly</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* end select */}
                                </div>
                            </div>
                            {/* End Title */}
                            <ChartPrice reqOptionPrice={reqOptionPrice} />
                            {/* End Chart */}
                        </div>
                    </div>
                    {/* End Col */}
                    <div className="col-lg-6">
                        <div className="card-style mb-30">
                            <div className="title d-flex flex-wrap align-items-center justify-content-between">
                                <div className="left">
                                    <h6 className="text-medium mb-30">Product Statistics</h6>
                                </div>
                                <div className="right">
                                    <div className="select-style-1">
                                        <div className="select-position select-sm">
                                            <select className="light-bg" id="ddlViewBy1" onChange={() => handleChangePro()}>
                                                <option value='1'>Yearly</option>
                                                <option value='2' selected={true}>Monthly</option>
                                                <option value='3'>Weekly</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* end select */}
                                </div>
                            </div>
                            {/* End Title */}
                            <ChartProduct reqOptionPro={reqOptionPro} />
                            {/* End Chart */}
                        </div>
                    </div>
                    {/* End Col */}
                </div>
                {/* End Row */}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card-style mb-30">
                            <div className="title d-flex flex-wrap justify-content-between align-items-center">
                                <div className="left">
                                    <h6 className="text-medium mb-30">Top Selling Products</h6>
                                </div>
                                <div className="right">
                                    <div className="select-style-1">
                                        <div className="select-position select-sm">
                                            <select className="light-bg" id="ddlViewBy2" onChange={() => handleChangeTopSale()}>
                                                <option value='1'>Year</option>
                                                <option value='2'>Month</option>
                                                <option value='3' selected={true}>Week</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* end select */}
                                </div>
                            </div>
                            {/* End Title */}
                            <TopSaleTable reqOptionTopSale={reqOptionTopSale} />
                        </div>
                    </div>
                    {/* End Col */}

                    <div className="col-lg-12">
                        <div className="card-style mb-30">
                            <div className="title d-flex flex-wrap align-items-center justify-content-between">
                                <div className="left">
                                    <h6 className="text-medium mb-30">Sales History</h6>
                                </div>
                                <div className="right">
                                    <div className="select-style-1">
                                        <div className="select-position select-sm">
                                            <select className="light-bg">
                                                <option value="">Today</option>
                                                <option value="">Yesterday</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table top-selling-table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <h6 className="text-sm text-medium">Products</h6>
                                            </th>
                                            <th className="min-width">
                                                <h6 className="text-sm text-medium">
                                                    Category <i className="lni lni-arrows-vertical"></i>
                                                </h6>
                                            </th>
                                            <th className="min-width">
                                                <h6 className="text-sm text-medium">
                                                    Revenue <i className="lni lni-arrows-vertical"></i>
                                                </h6>
                                            </th>
                                            <th className="min-width">
                                                <h6 className="text-sm text-medium">
                                                    Status <i className="lni lni-arrows-vertical"></i>
                                                </h6>
                                            </th>
                                            <th>
                                                <h6 className="text-sm text-medium text-end">
                                                    Actions <i className="lni lni-arrows-vertical"></i>
                                                </h6>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="product">
                                                    <div className="image">
                                                        <img src="admin/assets/images/products/product-mini-1.jpg" alt="" />
                                                    </div>
                                                    <p className="text-sm">Bedroom</p>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-sm">Interior</p>
                                            </td>
                                            <td>
                                                <p className="text-sm">$345</p>
                                            </td>
                                            <td>
                                                <span className="status-btn close-btn">Pending</span>
                                            </td>
                                            <td>
                                                <div className="action justify-content-end">
                                                    <button className="edit">
                                                        <i className="lni lni-pencil"></i>
                                                    </button>
                                                    <button className="more-btn ml-10 dropdown-toggle" id="moreAction1" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i className="lni lni-more-alt"></i>
                                                    </button>
                                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="moreAction1">
                                                        <li className="dropdown-item">
                                                            <a href="#0" className="text-gray">Remove</a>
                                                        </li>
                                                        <li className="dropdown-item">
                                                            <a href="#0" className="text-gray">Edit</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* End Col */}
                </div>
                {/* End Row */}

            </div>
            {/* end container */}
        </section>
    )
}

export default Content
