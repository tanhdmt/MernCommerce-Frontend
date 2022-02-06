import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import ListPages from '../layouts/Pages/ListPages'
import FormAddPage from '../components/form/FormAdd/FormAddPage'
import FormEditPage from '../components/form/FormEdit/FormEditPage'
import ListTrashPages from '../layouts/Pages/ListTrashPages'

const PagesScreen = () => {
    let { path } = useRouteMatch()
    
    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <ListPages />
                </Route>
                <Route path={`${path}/trash`}>
                    <ListTrashPages/>
                </Route>
                <Route path={`${path}/add`}>
                    <FormAddPage/>
                </Route>
                <Route path={`${path}/:id`} component={FormEditPage} />
            </Switch>
        </div>
    )
}

export default PagesScreen
