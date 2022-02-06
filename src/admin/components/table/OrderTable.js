import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Pagination from 'react-js-pagination';
import { Link, useRouteMatch } from 'react-router-dom';

const OrderTable = (props) => {
    const list = props.list;
    let { url } = useRouteMatch();
    const [itemsChecked, setItemsChecked] = useState([]);
    const [activePage, setCurrentPage] = useState(1);
    const indexOfLastTodo = (activePage * 5);

    const indexOfFirstTodo = indexOfLastTodo - 5;

    var currentTodos = [];
    if (list && list.length !== 0) {
        currentTodos = list.slice(indexOfFirstTodo, indexOfLastTodo);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage((pageNumber))
    };

    const formatVND = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', }).format(value);
    };

    const isChecked = (e, id) => {
        const checked = e.target.checked;
        if (checked) {
            setItemsChecked((oldval) => [...oldval, id]);
        } else {
            setItemsChecked(
                itemsChecked.filter((item) => {
                    return item !== id;
                })
            );
        }
    }

    useEffect(() => {
        props.setDeleteItems(itemsChecked);
    }, [itemsChecked, props])

    return (

        <div className="tables-wrapper">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card-style mb-30">
                        <div className="table-wrapper table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>
                                            <h6>#</h6>
                                        </th>
                                        <th>
                                            <h6>Id</h6>
                                        </th>
                                        <th>
                                            <h6>Customer</h6>
                                        </th>
                                        <th>
                                            <h6>Payment status</h6>
                                        </th>
                                        <th>
                                            <h6>Shipping status</h6>
                                        </th>
                                        <th>
                                            <h6>Created At</h6>
                                        </th>
                                        <th>
                                            <h6>Order total</h6>
                                        </th>
                                        {url === '/admin/orders/trash' ?
                                            (
                                                <th>
                                                    <h6>Delete At</h6>
                                                </th>
                                            ) : (
                                                <>
                                                    <th>
                                                        <h6 style={{ textAlign: 'center' }}>Status</h6>
                                                    </th>
                                                    <th>
                                                        <h6>Options</h6>
                                                    </th>
                                                </>
                                            )
                                        }
                                    </tr>
                                    {/*-- end table row--*/}
                                </thead>
                                {currentTodos.length === 0 ? (
                                    <p className="text-center">No Orders</p>
                                ) : (
                                    <tbody>
                                        {currentTodos.map((value, key) => {
                                            return (
                                                <tr key={key} id={value._id}>
                                                    <td>
                                                        <div className="check-input-primary">
                                                            <input
                                                                className="form-check-input check-admin"
                                                                type="checkbox"
                                                                id="checkbox-1"
                                                                onClick={(e) => isChecked(e, value._id)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>{value._id}</p>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>{value.shippingAddress.firstName} {value.shippingAddress.lastName}</p>
                                                    </td>
                                                    <td className="min-width" style={{ textAlign: 'center' }}>
                                                        <p>{value.isPaid === true ? "Paid" : "No"}</p>
                                                    </td>
                                                    <td className="min-width" style={{ textAlign: 'center' }}>
                                                        <p>{value.delivered}</p>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>{moment(value.createdAt).utc().format("DD-MM-YYYY hh:ss")}</p>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>{formatVND(value.totalPrice)}</p>
                                                    </td>
                                                    {value.deleted === false ? (
                                                        <>
                                                            <td>
                                                                {value.status === "Pending"
                                                                    ? <span className="status-btn warning-btn">{value.status}</span>
                                                                    : value.status === "Processing"
                                                                        ? <span className="status-btn active-btn">{value.status}</span>
                                                                        : value.status === "Completed"
                                                                            ? <span className="status-btn success-btn">{value.status}</span>
                                                                            : <span className="status-btn close-btn">{value.status}</span>}
                                                            </td>
                                                            <td>
                                                                <div className="action" style={{ textAlign: 'center' }}>
                                                                    <Link
                                                                        to={`${url}/${value._id}`}
                                                                        className="text-primary"
                                                                        title="View"
                                                                    >
                                                                        <i className="fas fa-info-circle"></i>
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <td className="min-width">
                                                                <p>{moment(value.deletedAt).utc().format('DD-MM-YYYY HH:ss')}</p>
                                                            </td>
                                                        </>
                                                    )
                                                    }
                                                </tr>

                                            );
                                        })}
                                        {/*-- end table row --*/}
                                    </tbody>
                                )}

                            </table>
                            {/*-- end table --*/}
                            <Pagination
                                itemClass="page-item"
                                linkClass="page-link"
                                activePage={activePage}
                                itemsCountPerPage={5}
                                totalItemsCount={list ? list.length : 0}
                                pageRangeDisplayed={5}
                                onChange={handlePageChange}
                            />
                        </div>
                    </div>
                    {/*-- end card --*/}
                </div>
                {/*-- end col --*/}
            </div>
            {/*-- end row --*/}
        </div>
    )
}

export default OrderTable
