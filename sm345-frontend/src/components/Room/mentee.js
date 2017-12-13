import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('roomStore')
@observer
export default class Mentee extends Component {
    render() {
        return (
            <div>
                {this.props.mentee[0]}
            </div>
        )
  }
}
