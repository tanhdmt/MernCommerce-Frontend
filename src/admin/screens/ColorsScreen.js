import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import FormAddColor from '../components/form/FormAdd/FormAddColor'
import FormEditColor from '../components/form/FormEdit/FormEditColor'
import ListColors from '../layouts/Colors/ListColors'
import ListTrashColors from '../layouts/Colors/ListTrashColors'

const ColorsScreen = () => {
    let { path } = useRouteMatch()
    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <ListColors />
                </Route>
                <Route path={`${path}/trash`}>
                    <ListTrashColors/>
                </Route>
                <Route path={`${path}/add`}>
                    <FormAddColor/>
                </Route>
                <Route path={`${path}/:id`} component={FormEditColor} />
            </Switch>
        </div>
    )
}

export default ColorsScreen
