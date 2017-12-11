import { observable, action } from "mobx";
import axios from 'axios';

export default class AuthStore {
    @observable username;
    @observable password;

	@action
	login = () => {
		let data = {
			username: this.username,
			password: this.password
		};
		axios.post('http://localhost:4000/api/auth/login', data)
			.then(res => {
                localStorage.setItem('user', JSON.stringify({ 
                    token: res.data.token,
                    user: res.data.user
                }));
			})
			.catch(e => {
				console.log(e)
			})
    }
}