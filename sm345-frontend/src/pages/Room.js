import React, { Component } from 'react'

import { RoomList } from '../components';

export default class Room extends Component {
  render() {
    return (
      <div className="page">
        <RoomList />
      </div>
    )
  }
}

const styles = {
    root: {
        
    }
}