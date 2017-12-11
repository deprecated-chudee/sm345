import { observable, action, autorun } from "mobx";
import axios from 'axios';

export default class StudentStore {
	@observable students = [];

	constructor() {
		autorun(() => this.getStudentList())
	}

	@action
	getStudentList = () => {
		axios({
			method: 'get',
			headers: {
				'x-access-token': localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token.split(' ')[1] : ''
			},
			url: 'http://localhost:4000/api/student/list'
		})
		.then(res => this.students = res.data.data)
		.catch(e => {
			// console.log(e)
		})
	}

	@action
	login = (username, password) => {
		let data = {
			username: username,
			password: password
		};

		axios.post('http://localhost:4000/api/auth/login', data)
			.then(res => {
				console.log(res)
			})
			.catch(e => {
				console.log(e)
			})
	}
}