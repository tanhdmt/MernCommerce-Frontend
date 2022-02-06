import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import FormEditContact from '../components/form/FormEdit/FormEditContact'
import ListContacts from '../layouts/Contacts/ListContacts'
import ListTrashContacts from '../layouts/Contacts/ListTrashContacts'

const ContactsScreen = () => {
    let { path } = useRouteMatch()
    
    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <ListContacts />
                </Route>
                <Route path={`${path}/trash`}>
                    <ListTrashContacts/>
                </Route>
                {/* <Route path={`${path}/add`}>
                    <FormAddProduct/>
                </Route> */}
                <Route path={`${path}/:id`} component={FormEditContact} />
            </Switch>
        </div>
    )
}

export default ContactsScreen
