import { observable, action, autorun } from "mobx";
import axios from 'axios';

import RoomStore from './RoomStore';

export default class RoomListStore {
	@observable rooms = [];
	@observable selectedRoom;

	constructor() {
		autorun(() => this.getRoomList())
	}

	@action
	getRoomList = () => {
		axios.get('http://localhost:4000/api/room/list')
			.then(res => this.rooms = res.data.data)
			.catch(e => {
				console.log(e)
			})
	}

    @action
    addRoom = info => {
      this.rooms.push(new RoomStore(info));
    }
}