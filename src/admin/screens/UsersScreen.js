import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import FormEditUser from '../components/form/FormEdit/FormEditUser'
import ListTrashUsers from '../layouts/Users/ListTrashUsers'
import ListUsers from '../layouts/Users/ListUsers'

const UsersScreen = () => {
    let { path } = useRouteMatch()

    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <ListUsers />
                </Route>
                <Route path={`${path}/trash`}>
                    <ListTrashUsers/>
                </Route>
                <Route path={`${path}/:id`} component={FormEditUser} />
            </Switch>
        </div>
    )
}

export default UsersScreen
