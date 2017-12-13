import { observable, action, autorun } from "mobx";
import axios from 'axios';

export default class RoomListStore {
	@observable rooms = [];
	@observable selectedRoom;
	@observable mentee;

	constructor() {
		autorun(() => this.getRoomList())
	}

	@action
	getRoomList = () => {
		axios({
			method: 'get',
			headers: {
				'x-access-token': localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token.split(' ')[1] : ''
			},
			url: 'http://localhost:4000/api/room/list'
		})
		.then(res => this.rooms = res.data.data)
		.catch(e => {
			// console.log(e)
		})
	}

	@action
	applyMentee = (roomId) => {
		let mentee = JSON.parse(localStorage.getItem('user')).user;
		console.log(mentee);
		console.log(roomId);
		let data = {
			id: mentee.id,
			username: mentee.username,
			auth: mentee.auth,
			roomId: roomId
		}
		console.log(data)
		axios({
			method: 'post',
			headers: {
				'x-access-token': localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token.split(' ')[1] : ''
			},
			url: 'http://localhost:4000/api/mentee/create',
			data: data
		})
		.then(res => this.rooms = res.data.data)
		.catch(e => {
			console.log(e)
		})
	}

	@action
	getMentee = (id) => {
		let mentee = id;
		axios({
			method: 'post',
			headers: {
				'x-access-token': localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token.split(' ')[1] : ''
			},
			url: 'http://localhost:4000/api/mentee/view',
			data: mentee
		})
		.then(res => this.mentee = res.data.data)
		.catch(e => {
			console.log(e)
		})
	}
}