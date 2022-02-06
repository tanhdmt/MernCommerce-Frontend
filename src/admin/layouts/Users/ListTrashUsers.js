import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { destroyUsers, getTrashUsers, restoreUsers } from '../../../redux/actions/userActions';
import UserTable from '../../components/table/UserTable';

const ListTrashUsers = () => {
    const dispatch = useDispatch();
    const [deleteItems, setDeleteItems] = useState([]);
    const lstUsers = useSelector((state) => state.user.users);

    const checkButtonDestroy = () => {
        if (deleteItems.length > 0) {
            return (
                <button
                    className="main-btn danger-btn btn-hover"
                onClick={()=> dispatch(destroyUsers(deleteItems.toString()))}
                >
                    <i className="fas fa-minus-circle"></i>&ensp;Delete(Selected)
                </button>
            )
        } else {
            return (
                <button className="main-btn danger-btn-outline" disabled>
                    <i className="fas fa-minus-circle"></i>&ensp;Destroy
                </button>
            )
        }
    }

    const checkButtonRestore = () => {
        if (deleteItems.length > 0) {
            return (
                <button
                    className="main-btn info-btn btn-hover"
                onClick={()=> dispatch(restoreUsers(deleteItems.toString()))}
                >
                    <i className="fas fa-minus-circle"></i>&ensp;Resotre
                </button>
            )
        } else {
            return (
                <button className="main-btn info-btn-outline" disabled>
                    <i className="fas fa-minus-circle"></i>&ensp;Resotre
                </button>
            )
        }
    }

    useEffect(() => {
        document.title = "Manage Users";
        dispatch(getTrashUsers());
    }, [dispatch]);

    return (

        <section className="table-components">
            <div className="container-fluid">
                {/*-- ========== title-wrapper start ========== --*/}
                <div className="title-wrapper pt-30">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="title mb-30">
                                <h2>List Trash Users</h2>
                            </div>
                        </div>
                        {/*-- end col --*/}
                        <div className="col-md-6">
                            <div className="breadcrumb-wrapper" style={{ marginBottom: '30px' }}>
                                <nav aria-label="breadcrumb">
                                    <Link
                                        to='/admin/users'
                                        className="main-btn secondary-btn btn-hover"
                                    >
                                        <i className="fas fa-clipboard-list"></i>&ensp;List User
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
                {lstUsers && lstUsers.length 
                    ?
                    <UserTable list={lstUsers} setDeleteItems={setDeleteItems} />
                    : <UserTable list={[]} setDeleteItems={setDeleteItems} />}
            </div>
            {/*-- end container --*/}
        </section>

    )
}

export default ListTrashUsers
