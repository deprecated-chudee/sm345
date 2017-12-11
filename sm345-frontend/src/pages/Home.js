import React, { Component } from 'react';

export default class Home extends Component {
    render() {
        let user = localStorage.getItem('user');

        return (
            <div className="page">
                <h1>Home~</h1>
                {user ? 
                    <h2> Hello {JSON.parse(user).user.username} </h2> : 
                    undefined
                }
            </div>
        )
    }
}
