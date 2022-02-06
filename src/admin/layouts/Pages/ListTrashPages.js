import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {
    getTrashPages,
    destroyPages,
    restorePages
} from '../../../redux/actions/pageActions'
import PageTable from '../../components/table/PageTable';

const ListTrashPages = () => {
    const dispatch = useDispatch();
    const [deleteItems, setDeleteItems] = useState([]);
    const lstPages = useSelector((state) => state.page.pages_list);

    const checkButtonDestroy = () =>{
        if (deleteItems.length > 0) {
            return(
                <button
                    className="main-btn danger-btn btn-hover"
                    onClick={()=> dispatch(destroyPages(deleteItems.toString()))}
                >
                    <i className="fas fa-minus-circle"></i>&ensp;Delete(Selected)
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
                    onClick={()=> dispatch(restorePages(deleteItems.toString()))}
                >
                    <i className="fas fa-minus-circle"></i>&ensp;Resotre
                </button>
            )
        } else {
            return(
                <button className="main-btn info-btn-outline" disabled>
                    <i className="fas fa-minus-circle"></i>&ensp;Resotre
                </button>
            )
        }
    }

    useEffect(() => {
        document.title = "Manage Pages";
        dispatch(getTrashPages());
    }, [dispatch]);

    return (

        <section className="table-components">
            <div className="container-fluid">
                {/*-- ========== title-wrapper start ========== --*/}
                <div className="title-wrapper pt-30">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="title mb-30">
                                <h2>List Trash Pages</h2>
                            </div>
                        </div>
                        {/*-- end col --*/}
                        <div className="col-md-6">
                            <div className="breadcrumb-wrapper mb-30">
                                <nav aria-label="breadcrumb">
                                    <Link 
                                        to='/admin/pages'
                                        className="main-btn secondary-btn btn-hover"
                                    >
                                        <i className="fas fa-clipboard-list"></i>&ensp;List Page
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
                {lstPages && lstPages.length 
                    ?<PageTable list={lstPages} setDeleteItems={setDeleteItems} />
                    : <PageTable list={[]} setDeleteItems={setDeleteItems} />}
            </div>
            {/*-- end container --*/}
        </section>

    )
}

export default ListTrashPages
