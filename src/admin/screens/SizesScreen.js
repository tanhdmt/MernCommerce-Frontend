import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import FormAddSize from '../components/form/FormAdd/FormAddSize'
import FormEditSize from '../components/form/FormEdit/FormEditSize'
import ListSizes from '../layouts/Sizes/ListSizes'
import ListTrashSizes from '../layouts/Sizes/ListTrashSizes'

const SizesScreen = () => {
    let { path } = useRouteMatch()
    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <ListSizes />
                </Route>
                <Route path={`${path}/trash`}>
                    <ListTrashSizes/>
                </Route>
                <Route path={`${path}/add`}>
                    <FormAddSize/>
                </Route>
                <Route path={`${path}/:id`} component={FormEditSize} />
            </Switch>
        </div>
    )
}

export default SizesScreen
