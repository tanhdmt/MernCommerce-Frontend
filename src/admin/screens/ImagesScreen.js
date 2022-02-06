import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import ListImages from '../layouts/Images/ListImages'
import FormAddImage from '../components/form/FormAdd/FormAddImage'
import FormEditImage from '../components/form/FormEdit/FormEditImage'
import ListTrashImages from '../layouts/Images/ListTrashImages'

const ImagesScreen = () => {
    let { path } = useRouteMatch()
    
    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <ListImages />
                </Route>
                <Route path={`${path}/trash`}>
                    <ListTrashImages/>
                </Route>
                <Route path={`${path}/add`}>
                    <FormAddImage/>
                </Route>
                <Route path={`${path}/:id`} component={FormEditImage} />
            </Switch>
        </div>
    )
}

export default ImagesScreen
