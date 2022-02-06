import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import FormAddTopic from '../components/form/FormAdd/FormAddTopic'
import FormEditTopic from '../components/form/FormEdit/FormEditTopic'
import ListTopics from '../layouts/Topic/ListTopics'
import ListTrashTopics from '../layouts/Topic/ListTrashTopics'

const TopicsScreen = () => {
    let { path } = useRouteMatch()
    
    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <ListTopics/>
                </Route>
                <Route path={`${path}/trash`}>
                    <ListTrashTopics/>
                </Route>
                <Route path={`${path}/add`}>
                    <FormAddTopic/>
                </Route>
                <Route path={`${path}/:id`} component={FormEditTopic} />
            </Switch>
        </div>
    )
}

export default TopicsScreen
