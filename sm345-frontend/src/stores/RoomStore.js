
import { observable, action } from 'mobx';
import axios from 'axios';

export default class RoomStore {
    @observable Room = {
        _id: '',
        mentorName: '',
        teamname: '',
        subject: '',
        description: '',
        link: '',
        year: 2017,
        semester: 2,
        thumbnail: null,
        credentialFile: null
    };

    @action
    createRoom = () => {
        let formData = new FormData();
        formData.append('mentorName', this.Room.mentorName);
        formData.append('teamname', this.Room.teamname);
        formData.append('subject', this.Room.subject);
        formData.append('description', this.Room.description);
        formData.append('link', this.Room.link);
        formData.append('year', this.Room.year);
        formData.append('semester', this.Room.semester);
        formData.append('thumbnail', this.Room.thumbnail, this.Room.thumbnail.name);
        formData.append('credentialFile', this.Room.credentialFile, this.Room.credentialFile.name);

        console.log(this.formData)
        axios({
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            baseURL: 'http://localhost:4000/api/room/create',
            data: formData,
        })
        .then(res => {
            console.log(res)
        }).catch(e => {
            console.log(e)
        })
    }
}