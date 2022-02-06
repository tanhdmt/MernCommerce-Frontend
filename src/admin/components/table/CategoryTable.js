import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { activeCategories } from '../../../redux/actions/categoryActions';
import "./style.scss";
import moment from 'moment';

const CategoryTable = (props) => {
    const list = props.list;
    const dispatch = useDispatch();
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

    const checkCate = (id) => {
        var catArr = [];
        list.forEach((value) => {
            if (id.includes(value._id)) {
                catArr.push(value.name);
            }
        });
        return <p>{catArr.toString()}</p>;
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
                                            <h6>Name Category</h6>
                                        </th>

                                        {url === '/admin/categories/trash' ?
                                            (
                                                <th>
                                                    <h6>Delete At</h6>
                                                </th>
                                            ) : (
                                                <>
                                                    <th>
                                                        <h6>Parent Cate</h6>
                                                    </th>
                                                    <th>
                                                        <h6>Type</h6>
                                                    </th>
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
                                    <p className="text-center">No categories</p>
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
                                                    {value.deleted === false ? (
                                                        <>
                                                            <td className="min-width">
                                                                {checkCate(value.parentCate)}
                                                            </td>
                                                            <td className="min-width">
                                                                <p>{value.type}</p>
                                                            </td>
                                                            <td>
                                                                <div className="action">
                                                                    {value.status === "1"
                                                                        ? (<button className="text-success"
                                                                            onClick={() => dispatch(activeCategories(value._id))}
                                                                            title="Show">
                                                                            <i className="far fa-eye"></i>
                                                                        </button>)
                                                                        : (<button className="text-danger"
                                                                            onClick={() => dispatch(activeCategories(value._id))}
                                                                            title="Hidden">
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
                            <Pagination
                                itemClass="page-item"
                                linkClass="page-link"
                                activePage={activePage}
                                itemsCountPerPage={5}
                                totalItemsCount={list ? list.length : 0}
                                pageRangeDisplayed={5}
                                onChange={handlePageChange}
                            />
                            {/*-- end table --*/}
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

export default CategoryTable
