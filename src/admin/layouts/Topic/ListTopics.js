import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { deleteTopics, getTopics } from '../../../redux/actions/topicActions';
import TopicTable from '../../components/table/TopicTable';

const ListTopics = () => {
    let { url } = useRouteMatch();
    const dispatch = useDispatch();
    const [deleteItems, setDeleteItems] = useState([]);
    const lstTopics = useSelector((state) => state.topic.topics);

    const checkButtonDelete = () => {
        if (deleteItems.length > 0) {
            return (
                <button
                    className="main-btn danger-btn btn-hover"
                    onClick={() => dispatch(deleteTopics(deleteItems.toString()))}
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
        document.title = "Manage Topics";
        dispatch(getTopics());
    }, [dispatch]);

    return (

        <section className="table-components">
            <div className="container-fluid">
                {/*-- ========== title-wrapper start ========== --*/}
                <div className="title-wrapper pt-30">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="title mb-30">
                                <h2>List Topics</h2>
                            </div>
                        </div>
                        {/*-- end col --*/}
                        <div className="col-md-6">
                            <div className="breadcrumb-wrapper mb-30">
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
                                        <i className="fas fa-trash-alt"></i>&ensp;Trash ({lstTopics.deletedCount})
                                    </Link>
                                </nav>
                            </div>
                        </div>
                        {/*-- end col --*/}
                    </div>
                    {/*-- end row --*/}
                </div>
                {/*-- ========== title-wrapper end ========== --*/}
                <TopicTable list={lstTopics.Topics} setDeleteItems={setDeleteItems} />
            </div>
            {/*-- end container --*/}
        </section>

    )
}

export default ListTopics
