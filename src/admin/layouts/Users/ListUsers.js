import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { deleteUsers, getUsers } from '../../../redux/actions/userActions';
import UserTable from '../../components/table/UserTable';

const ListUsers = () => {
    let { url } = useRouteMatch();
    const dispatch = useDispatch();
    const [deleteItems, setDeleteItems] = useState([]);
    const lstUsers = useSelector((state) => state.user.users);

    const ClickDeleteHandler = () =>{
        dispatch(deleteUsers(deleteItems.toString()))
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
        document.title = "Manage Users";
        dispatch(getUsers());
    }, [dispatch]);

    return (

        <section className="table-components">
            <div className="container-fluid">
                {/*-- ========== title-wrapper start ========== --*/}
                <div className="title-wrapper pt-30">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="title mb-30">
                                <h2>List Users</h2>
                            </div>
                        </div>
                        {/*-- end col --*/}
                        <div className="col-md-6">
                            <div className="breadcrumb-wrapper mb-30">
                                <nav aria-label="breadcrumb">
                                    {checkButtonDelete()}
                                    &nbsp;
                                    <Link
                                        to={`${url}/trash`}
                                        className="main-btn warning-btn btn-hover"
                                    >
                                        <i className="fas fa-trash-alt"></i>&ensp;Trash ({lstUsers.deletedCount})
                                    </Link>
                                </nav>
                            </div>
                        </div>
                        {/*-- end col --*/}
                    </div>
                    {/*-- end row --*/}
                </div>
                {/*-- ========== title-wrapper end ========== --*/}
                <UserTable list={lstUsers.Users} setDeleteItems={setDeleteItems} />
            </div>
            {/*-- end container --*/}
        </section>

    )
}

export default ListUsers
