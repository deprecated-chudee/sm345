import React, { Component } from 'react';

import { List, Create, Info } from '../components/Room';
import { PrivateRoute } from '../components';

export default class Room extends Component {
    render() {
        let { url } = this.props.match;
        return (
            <div className="page">
                <PrivateRoute exact path={url} component={List} />
                <PrivateRoute path={`${url}/create`} component={Create} />
                <PrivateRoute path={`${url}/info/:id`} component={Info} />
            </div>
        )
    }
}