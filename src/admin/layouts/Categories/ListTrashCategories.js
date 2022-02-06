import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { destroyCategories, getTrashCategories, restoreCategories } from '../../../redux/actions/categoryActions';
import CategoryTable from '../../components/table/CategoryTable';

const ListTrashCategories = () => {
    const dispatch = useDispatch();
    const [deleteItems, setDeleteItems] = useState([]);
    const lstCategories = useSelector((state) => state.category.categories);

    const checkButtonDestroy = () =>{
        if (deleteItems.length > 0) {
            return(
                <button
                    className="main-btn danger-btn btn-hover"
                    onClick={()=> dispatch(destroyCategories(deleteItems.toString()))}
                >
                    <i className="fas fa-minus-circle"></i>&ensp;Destroy
                </button>
            )
        } else {
            return(
                <button className="main-btn danger-btn-outline" disabled>
                    <i className="fas fa-minus-circle"></i>&ensp;Destroy
                </button>
            )
        }
    }

    const checkButtonRestore = () =>{
        if (deleteItems.length > 0) {
            return(
                <button
                    className="main-btn info-btn btn-hover"
                    onClick={()=> dispatch(restoreCategories(deleteItems.toString()))}
                >
                    <i className="fas fa-minus-circle"></i>&ensp;Restore
                </button>
            )
        } else {
            return(
                <button className="main-btn info-btn-outline" disabled>
                    <i className="fas fa-minus-circle"></i>&ensp;Restore
                </button>
            )
        }
    }

    useEffect(() => {
        document.title = "Manage Categories";
        dispatch(getTrashCategories());
    }, [dispatch]);

    return (

        <section className="table-components">
            <div className="container-fluid">
                {/*-- ========== title-wrapper start ========== --*/}
                <div className="title-wrapper pt-30">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="title mb-30">
                                <h2>List Trash Categories</h2>
                            </div>
                        </div>
                        {/*-- end col --*/}
                        <div className="col-md-6">
                            <div className="breadcrumb-wrapper mb-30">
                                <nav aria-label="breadcrumb">
                                    <Link 
                                        to='/admin/categories'
                                        className="main-btn secondary-btn btn-hover"
                                    >
                                        <i className="fas fa-clipboard-list"></i>&ensp;List Categories
                                    </Link>
                                    &nbsp;
                                    {checkButtonRestore()}
                                    &nbsp;
                                    {checkButtonDestroy()}
                                    &nbsp;
                                   
                                </nav>
                            </div>
                        </div>
                        {/*-- end col --*/}
                    </div>
                    {/*-- end row --*/}
                </div>
                {/*-- ========== title-wrapper end ========== --*/}
                {lstCategories && lstCategories.length 
                    ?
                    <CategoryTable list={lstCategories} setDeleteItems={setDeleteItems} />
                    : <CategoryTable list={[]} setDeleteItems={setDeleteItems} />}
            </div>
            {/*-- end container --*/}
        </section>

    )
}

export default ListTrashCategories
