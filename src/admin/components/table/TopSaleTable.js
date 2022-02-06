import moment from 'moment';
import React from 'react'
import { useSelector } from 'react-redux';

const TopSaleTable = (props) => {
    var optionTopSale = props.reqOptionTopSale;
    const order = useSelector(state => state.order.orders);
    const products = useSelector(state => state.product.products_list);
    if (optionTopSale === 0) {
        var data = [];
        let pro ={};
        var temp = order.filter(value => Number(value.createdAt.substring(0, 4)) === moment().year());
        products.forEach(element => {
            let s = 0;
            temp.forEach(index => {
                index.orderItems.forEach(value => {
                    if (element._id === value.id) {
                        s += value.quantity;
                    }
                })
            })
            console.log(s)
        });
    }

    return (
        <div className="table-responsive">
            <table className="table top-selling-table">
                <thead>
                    <tr>
                        <th>
                            <h6 className="text-sm text-medium">Products</h6>
                        </th>
                        <th className="min-width">
                            <h6 className="text-sm text-medium">Category</h6>
                        </th>
                        <th className="min-width">
                            <h6 className="text-sm text-medium">Price</h6>
                        </th>
                        <th className="min-width">
                            <h6 className="text-sm text-medium">Sold</h6>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className="product">
                                <div className="image">
                                    <img
                                        src="admin/assets/images/products/product-mini-1.jpg"
                                        alt=""
                                    />
                                </div>
                                <p className="text-sm">Arm Chair</p>
                            </div>
                        </td>
                        <td>
                            <p className="text-sm">Interior</p>
                        </td>
                        <td>
                            <p className="text-sm">$345</p>
                        </td>
                        <td>
                            <p className="text-sm">43</p>
                        </td>
                        <td>
                            <div className="action justify-content-end">
                                <button
                                    className="more-btn ml-10 dropdown-toggle"
                                    id="moreAction1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="lni lni-more-alt" />
                                </button>
                                <ul
                                    className="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="moreAction1"
                                >
                                    <li className="dropdown-item">
                                        <a href="#0" className="text-gray">
                                            Remove
                                        </a>
                                    </li>
                                    <li className="dropdown-item">
                                        <a href="#0" className="text-gray">
                                            Edit
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            {/* End Table */}
        </div>
    )
}

export default TopSaleTable
