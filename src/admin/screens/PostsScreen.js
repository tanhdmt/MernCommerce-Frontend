import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import ListPosts from '../layouts/Posts/ListPosts'
import FormAddPost from '../components/form/FormAdd/FormAddPost'
import FormEditPost from '../components/form/FormEdit/FormEditPost'
import ListTrashPosts from '../layouts/Posts/ListTrashPosts'

const PostsScreen = () => {
    let { path } = useRouteMatch()
    
    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <ListPosts />
                </Route>
                <Route path={`${path}/trash`}>
                    <ListTrashPosts/>
                </Route>
                <Route path={`${path}/add`}>
                    <FormAddPost/>
                </Route>
                <Route path={`${path}/:id`} component={FormEditPost} />
            </Switch>
        </div>
    )
}

export default PostsScreen
