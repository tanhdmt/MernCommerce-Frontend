import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import FormAddCategory from '../components/form/FormAdd/FormAddCategory'
import FormEditCategory from '../components/form/FormEdit/FormEditCategory'
import ListCategories from '../layouts/Categories/ListCategories'
import ListTrashCategories from '../layouts/Categories/ListTrashCategories'

const CategoriesScreen = () => {
    let { path } = useRouteMatch()
    
    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <ListCategories/>
                </Route>
                <Route path={`${path}/trash`}>
                    <ListTrashCategories/>
                </Route>
                <Route path={`${path}/add`}>
                    <FormAddCategory/>
                </Route>
                <Route path={`${path}/:id`} component={FormEditCategory} />
            </Switch>
        </div>
    )
}

export default CategoriesScreen
