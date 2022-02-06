import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import ListProducts from '../layouts/Products/ListProducts'
import FormAddProduct from '../components/form/FormAdd/FormAddProduct'
import FormEditProduct from '../components/form/FormEdit/FormEditProduct'
import ListTrashProducts from '../layouts/Products/ListTrashProducts'

const ProductsScreen = () => {
    let { path } = useRouteMatch()
    
    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <ListProducts />
                </Route>
                <Route path={`${path}/trash`}>
                    <ListTrashProducts/>
                </Route>
                <Route path={`${path}/add`}>
                    <FormAddProduct/>
                </Route>
                <Route path={`${path}/:id`} component={FormEditProduct} />
            </Switch>
        </div>
    )
}

export default ProductsScreen
