import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import Card, { CardMedia, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

@inject('roomStore')
@observer
export default class CreateRoom extends Component {
    updateRoom = (key, value) => {
        this.props.roomStore.Room[key] = value;
    }

    onChange = e => {
        this.updateRoom(e.target.name, e.target.value);
    }

    updateRoomFile = (key, file) => {
        this.props.roomStore.Room[key] = file;
    }

    onChangeFile = e => {
        this.updateRoomFile(e.target.name, e.target.files[0]);
    }

    onChangeImage = e => {
        this.updateRoomFile(e.target.name, e.target.files[0]);
        this.preview();
    }

    preview = () => {
        let preview = document.getElementById('preview');
        var reader  = new FileReader();
        
        reader.onload = e => {
            preview.style['background-image'] = `url(${reader.result})`;
        }
      
        if(this.props.roomStore.Room.thumbnail) {
          reader.readAsDataURL(this.props.roomStore.Room.thumbnail);
        }
    }

    toggleThumbnail() {
        document.getElementById('thumbnail').click()
    }

    toggleCredentialFile() {
        document.getElementById('credentialFile').click()
    }

    submit = () => {
        this.props.roomStore.createRoom()
    }

    render() {
        const { Room } = this.props.roomStore;

        return (
            <div className="page">
                <h1> CreateRoom~ </h1>

                <Card>
                    <CardMedia
                        id="preview"
                        style={{height: '600px', backgroundSize: 'cover'}}
                        image={Room.thumbnail ? Room.thumbnail : 'http://headfm.net/wp-content/uploads/2014/11/no-image-1-600x6004-600x500.png'}
                        title="Contemplative Reptile"
                        htmlFor="thumbnail"
                        onClick={this.toggleThumbnail}
                    />
                    <CardContent>
                        <form noValidate autoComplete="off">
                            <input
                                required
                                id="thumbnail"
                                type="file"
                                accept="image/*"
                                name="thumbnail"
                                style={styles.none}
                                onChange={this.onChangeImage}
                            />
                            <input
                                required
                                id="credentialFile"
                                type="file"
                                accept=".pdf, .doc, .hwp"
                                name="credentialFile"
                                style={styles.none}
                                onChange={this.onChangeFile}
                            />
                            <div style={styles.file}>
                                <h3>자격증명파일</h3>
                                <Button raised color="primary" 
                                    onClick={this.toggleCredentialFile}>UPLOAD
                                </Button>
                                {Room.credentialFile ? <span style={{marginLeft: '20px'}}>{Room.credentialFile.name}</span> : ''}
                            </div>
                            <TextField
                                required
                                id="mentorName"
                                style={styles.textFull}
                                name="mentorName"
                                label="멘토 이름"
                                value={Room.mentorName}
                                onChange={this.onChange}
                                margin="normal"
                            />
                            <TextField
                                required
                                id="teamname"
                                style={styles.textFull}
                                name="teamname"
                                label="팀 이름"
                                value={Room.teamname}
                                onChange={this.onChange}
                                margin="normal"
                            />
                            <TextField
                                required
                                id="subject"
                                style={styles.textFull}
                                name="subject"
                                label="멘토링 주제"
                                value={Room.subject}
                                onChange={this.onChange}
                                margin="normal"
                            />
                            <TextField
                                required
                                id="description"
                                style={styles.textFull}
                                multiline
                                rows="3"
                                rowsMax="5"
                                name="description"
                                label="팀 소개 및 설명"
                                value={Room.description}
                                onChange={this.onChange}
                                margin="normal"
                            />
                            <TextField
                                id="link"
                                style={styles.textFull}
                                name="link"
                                label="팀 동영상 주소"
                                value={Room.link}
                                onChange={this.onChange}
                                margin="normal"
                            />
                            <TextField
                                id="year"
                                disabled
                                style={styles.textHalf}
                                name="year"
                                label="연도"
                                type="number"
                                value={Room.year}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                            <TextField
                                id="semester"
                                disabled
                                style={styles.textHalf}
                                name="semester"
                                label="학기"
                                type="number"
                                value={Room.semester}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                        </form>
                    </CardContent>
                </Card>

                <Button 
                    style={styles.button} 
                    raised 
                    color="primary"
                    onClick={this.submit}
                > 
                    생성하기 
                </Button>
            </div>
        );
    }
};

const styles = {
    button: {
        display: 'block',
        width: '300px',
        height: '50px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '50px'
    },
    none: {
        display: 'none'
    },
    textFull: {
        width: 'calc(100% - 40px)',
        margin: '20px'
    },
    textHalf: {
        width: 'calc(50% - 40px)',
        margin: '20px'
    },
    file: {
        width: 'calc(100% - 40px)',
        margin: '20px'
    }
}