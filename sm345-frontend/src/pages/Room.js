import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import { List, Create, Info } from '../components/Room';

export default class Room extends Component {
    render() {
        let { url } = this.props.match;
        return (
            <div className="page">
                <Route exact path={url} component={List} />
                <Route path={`${url}/create`} component={Create} />
                <Route path={`${url}/info/:id`} component={Info} />
            </div>
        )
    }
}

const styles = {
    root: {
        
    }
}