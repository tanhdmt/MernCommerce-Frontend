import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {
    getTrashPosts,
    destroyPosts,
    restorePosts
} from '../../../redux/actions/postActions'
import { getTopics } from '../../../redux/actions/topicActions';
import PostTable from '../../components/table/PostTable';

const ListTrashPosts = () => {
    const dispatch = useDispatch();
    const [deleteItems, setDeleteItems] = useState([]);
    const lstPosts = useSelector((state) => state.post.posts_list);

    const checkButtonDestroy = () =>{
        if (deleteItems.length > 0) {
            return(
                <button
                    className="main-btn danger-btn btn-hover"
                    onClick={()=> dispatch(destroyPosts(deleteItems.toString()))}
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
                    onClick={()=> dispatch(restorePosts(deleteItems.toString()))}
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
        document.title = "Manage Posts";
        dispatch(getTrashPosts());
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
                                <h2>List Trash Posts</h2>
                            </div>
                        </div>
                        {/*-- end col --*/}
                        <div className="col-md-6">
                            <div className="breadcrumb-wrapper mb-30">
                                <nav aria-label="breadcrumb">
                                    <Link 
                                        to='/admin/posts'
                                        className="main-btn secondary-btn btn-hover"
                                    >
                                        <i className="fas fa-clipboard-list"></i>&ensp;List Post
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
                {lstPosts && lstPosts.length 
                    ?<PostTable list={lstPosts} setDeleteItems={setDeleteItems} />
                    : <PostTable list={[]} setDeleteItems={setDeleteItems} />}
            </div>
            {/*-- end container --*/}
        </section>

    )
}

export default ListTrashPosts
