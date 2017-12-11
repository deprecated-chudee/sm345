import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Card, { CardMedia, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

@inject('roomListStore')
@observer
export default class Info extends Component {
    constructor(props) {
        super(props)
        this.state = {
            room: this.props.roomListStore.rooms.filter(e => e._id === this.props.match.params.id)[0]
        }
    }

    base64_encode = (data) => {
        return `data:image/jpeg;base64,${new Buffer(data).toString('base64')}`;
    }

    render() {
        let { room } = this.state;

        return (
            <div>
                <h1>RoomInfo~</h1>
                <Card>      
                    <CardMedia
                        id="preview"
                        style={{
                            height: 600,
                            backgroundImage: `url(${this.base64_encode(room.thumbnail.data)})`
                        }}
                        image='http://headfm.net/wp-content/uploads/2014/11/no-image-1-600x6004-600x500.png'
                        title={room.subject}
                    />
                    <CardContent>
                        <div style={styles.textFull}>
                            <Typography type="title" style={styles.title}> 팀 이름: </Typography>
                            <Typography type="subheading" style={styles.subheader}> {room.teamname} </Typography>
                        </div>

                        <div style={styles.textFull}>
                            <Typography type="title" style={styles.title}> 멘토: </Typography>
                            <Typography type="subheading" style={styles.subheader}> {room.mentor.name} </Typography>
                        </div>

                        <div style={styles.textFull}>
                            <Typography type="title" style={styles.title}> 팀 주제: </Typography>
                            <Typography type="subheading" style={styles.subheader}> {room.subject} </Typography>
                        </div>

                        <div style={styles.textFull}>
                            <Typography type="title" style={styles.title}> 팀 소개 및 설명: </Typography>
                            <Typography type="subheading" style={styles.subheader}> {room.description} </Typography>
                        </div>
                    
                        { room.link ?
                            <div style={styles.textFull}>
                                <Typography type="title" style={styles.title}> 팀 동영상 링크: </Typography>
                                <Typography type="subheading" style={styles.subheader}> {room.link} </Typography>
                            </div>
                        : ''}

                        <div style={styles.textHalf}>
                            <Typography type="title" style={styles.title}> 연도: </Typography>
                            <Typography type="subheading" style={styles.subheader}> {room.year} </Typography>
                        </div>

                        <div style={styles.textHalf}>
                            <Typography type="title" style={styles.title}> 학기: </Typography>
                            <Typography type="subheading" style={styles.subheader}> {room.semester} </Typography>
                        </div>

                    </CardContent>
                </Card>
                <Button 
                    style={styles.button} 
                    raised 
                    color="primary"
                    onClick={this.submit}
                > 
                    멘티 신청
                </Button>
            </div>
        )
    }
}

const styles = {
    button: {
        display: 'block',
        width: '300px',
        height: '50px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '50px'
    },
    textFull: {
        display: 'inline-block',
        width: 'calc(100% - 40px)',
        margin: '20px'
    },
    textHalf: {
        display: 'inline-block',
        width: 'calc(50% - 40px)',
        margin: '20px'
    },
    title: {
        display: 'inline-block'
    },
    subheader: {
        display: 'inline-block',
        marginLeft: 20
    }
}