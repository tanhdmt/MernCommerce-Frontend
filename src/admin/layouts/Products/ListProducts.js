/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    getProducts,
    getColors,
    getSizes,
    deleteProducts,
} from '../../../redux/actions/productActions';
import ProductTable from '../../components/table/ProductTable';
import { getCategories } from '../../../redux/actions/categoryActions';

const ListProducts = () => {
    let { url } = useRouteMatch();
    const dispatch = useDispatch();
    const [deleteItems, setDeleteItems] = useState([]);
    const lstProducts = useSelector((state) => state.product.products_list);

    const ClickDeleteHandler = () =>{
        dispatch(deleteProducts(deleteItems.toString()))
    }

    const checkButtonDelete = () => {
        if (deleteItems.length > 0) {
            return (
                <button
                    className="main-btn danger-btn btn-hover"
                    onClick={() => ClickDeleteHandler()}
                >
                    <i className="fas fa-minus-circle"></i>&ensp;Delete(Selected)
                </button>
            )
        } else {
            return (
                <button className="main-btn danger-btn-outline" disabled>
                    <i className="fas fa-minus-circle"></i>&ensp;Delete
                </button>
            )
        }
    }

    useEffect(() => {
        document.title = "Manage Products";
        dispatch(getProducts());
        dispatch(getCategories());
        dispatch(getColors());
        dispatch(getSizes());
    }, [dispatch]);

    return (

        <section className="table-components">
            <div className="container-fluid">
                {/*-- ========== title-wrapper start ========== --*/}
                <div className="title-wrapper pt-30">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="title mb-30">
                                <h2>List Products</h2>
                            </div>
                        </div>
                        {/*-- end col --*/}
                        <div className="col-md-6">
                            <div className="breadcrumb-wrapper" style={{ marginBottom: '5px' }}>
                                <nav aria-label="breadcrumb">
                                    <Link
                                        to={`${url}/add`}
                                        className="main-btn success-btn btn-hover"
                                    >
                                        <i className="fas fa-plus"></i>&ensp;Add
                                    </Link>
                                    &nbsp;
                                    {checkButtonDelete()}
                                    &nbsp;
                                    <Link
                                        to={`${url}/trash`}
                                        className="main-btn warning-btn btn-hover"
                                    >
                                        <i className="fas fa-trash-alt"></i>&ensp;Trash ({lstProducts.deletedCount})
                                    </Link>
                                </nav>
                            </div>
                        </div>
                        {/*-- end col --*/}
                    </div>
                    {/*-- end row --*/}
                </div>
                {/*-- ========== title-wrapper end ========== --*/}
                <ProductTable list={lstProducts.Products} setDeleteItems={setDeleteItems} />
            </div>
            {/*-- end container --*/}
        </section>

    )
}

export default ListProducts
