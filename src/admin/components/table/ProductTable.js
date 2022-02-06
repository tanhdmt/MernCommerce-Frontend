import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { activeProducts } from '../../../redux/actions/productActions';
import "./style.scss";

const ProductTable = (props) => {
    const list = props.list;
    const dispatch = useDispatch();
    let { url } = useRouteMatch();
    const [itemsChecked, setItemsChecked] = useState([]);
    const lstCate = useSelector((state) => state.category.categories);
    const lstColors = useSelector((state) => state.product.colors_list);
    const lstSizes = useSelector((state) => state.product.sizes_list);
    const [activePage, setCurrentPage] = useState(1);

    const indexOfLastTodo = (activePage * 5);

    const indexOfFirstTodo = indexOfLastTodo - 5;

    var currentTodos = [];
    if (list && list.length !== 0) {
        currentTodos = list.reverse().slice(indexOfFirstTodo, indexOfLastTodo);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage((pageNumber))
    };

    const formatVND = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', }).format(value);
    };

    const checkCate = (id) => {
        var catArr = [];
        if (lstCate.Categories) {
            lstCate.Categories.forEach((value) => {
                if (id.includes(value._id)) {
                    catArr.push(value.name);
                }
            });
        }

        return <p>{catArr.toString()}</p>;
    }

    const checkColor = (id) => {
        var colorArr = [];
        if (lstColors.Colors) {
            lstColors.Colors.forEach((value) => {
                if (id.includes(value._id)) {
                    colorArr.push(value.name);
                }
            });
        }
        return <p>{colorArr.toString()}</p>;
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
        currentTodos.forEach((value) => {
            const imageArr = value.image.split(',');
            Arr.push(imageArr[0]);
            // for(let i = 0; i< imageArr.length; i++){
            //     console.log(imageArr[i])
            // }
        });
        return Arr[key];
    }

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
                                            <h6>Name Product</h6>
                                        </th>
                                        <th>
                                            <h6>Image</h6>
                                        </th>
                                        <th>
                                            <h6>Category</h6>
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
                                            <h6>Price Sale</h6>
                                        </th>
                                        {url === '/admin/products/trash' ?
                                            (
                                                <th>
                                                    <h6>Delete At</h6>
                                                </th>
                                            ) : (
                                                <>
                                                    <th>
                                                        <h6>Status</h6>
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
                                    <p className="text-center">No products</p>
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
                                                        <p>{value.name}</p>
                                                    </td>
                                                    <td className="min-width th-admin">
                                                        <img
                                                            src={`http://localhost:5000/products/${checkImage(key)}`}
                                                            alt=""
                                                        />
                                                    </td>
                                                    <td className="min-width">
                                                        {checkCate(value.categoryId)}
                                                    </td>
                                                    <td className="min-width">
                                                        {checkColor(value.color)}
                                                    </td>
                                                    <td className="min-width">
                                                        {checkSize(value.size)}
                                                    </td>
                                                    <td className="min-width">
                                                        <p>{formatVND(value.price)}</p>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>{formatVND(value.priceDiscount)}</p>
                                                    </td>
                                                    {value.deleted === false ? (
                                                        <>
                                                            <td>
                                                                <div className="action">
                                                                    {value.status === "1"
                                                                        ? (<button className="text-success"
                                                                            onClick={() => dispatch(activeProducts(value._id))}
                                                                            title="Show">
                                                                            <i className="far fa-eye"></i>
                                                                        </button>)
                                                                        : (<button className="text-danger" onClick={activeProducts(value._id)} title="Hidden">
                                                                            <i className="far fa-eye-slash"></i>
                                                                        </button>)}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="action">
                                                                    <Link
                                                                        to={`${url}/${value._id}`}
                                                                        className="text-primary"
                                                                        title="Edit"
                                                                    >
                                                                        <i className="fas fa-pen-square"></i>
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

export default ProductTable
