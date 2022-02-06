import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import FormEditOrder from '../components/form/FormEdit/FormEditOrder'
import ListOrders from '../layouts/Orders/ListOrders'
import ListTrashOrders from '../layouts/Orders/ListTrashOrders'

const OrdersScreen = () => {
    let { path } = useRouteMatch()
    
    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <ListOrders />
                </Route>
                <Route path={`${path}/trash`}>
                    <ListTrashOrders/>
                </Route>
                {/* <Route path={`${path}/add`}>
                    <FormAddProduct/>
                </Route> */}
                <Route path={`${path}/:id`} component={FormEditOrder} />
            </Switch>
        </div>
    )
}

export default OrdersScreen
