import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { deleteOrders, listOrder } from '../../../redux/actions/orderActions';
import OrderTable from '../../components/table/OrderTable';

const ListOrders = () => {
    let { url } = useRouteMatch();
    const dispatch = useDispatch();
    const [deleteItems, setDeleteItems] = useState([]);
    const lstOrders = useSelector((state) => state.order.orders);

    const {deletedCount, Orders} = lstOrders;

    const ClickDeleteHandler = () =>{
        dispatch(deleteOrders(deleteItems.toString()))
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
        document.title = "Manage Orders";
        dispatch(listOrder());
    }, [dispatch]);

    return (

        <section className="table-components">
            <div className="container-fluid">
                {/*-- ========== title-wrapper start ========== --*/}
                <div className="title-wrapper pt-30">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="title mb-30">
                                <h2>List Orders</h2>
                            </div>
                        </div>
                        {/*-- end col --*/}
                        <div className="col-md-6">
                            <div className="breadcrumb-wrapper" style={{ marginBottom: '5px' }}>
                                <nav aria-label="breadcrumb">
                                    {checkButtonDelete()}
                                    &nbsp;
                                    <Link
                                        to={`${url}/trash`}
                                        className="main-btn warning-btn btn-hover"
                                    >
                                        <i className="fas fa-trash-alt"></i>&ensp;Trash ({deletedCount ? deletedCount : 0})
                                    </Link>
                                </nav>
                            </div>
                        </div>
                        {/*-- end col --*/}
                    </div>
                    {/*-- end row --*/}
                </div>
                {/*-- ========== title-wrapper end ========== --*/}
                <OrderTable list={Orders} setDeleteItems={setDeleteItems} />
            </div>
            {/*-- end container --*/}
        </section>

    )
}

export default ListOrders
