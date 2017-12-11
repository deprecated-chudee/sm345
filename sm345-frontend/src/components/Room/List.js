import React from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import { GridList, GridListTile } from 'material-ui/GridList';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const base64_encode = (data) => {
   return `data:image/jpeg;base64,${new Buffer(data).toString('base64')}`;
}

const List = inject('roomListStore')(observer(({roomListStore}) => (
    <div style={styles.root}>
        <h1> RoomList </h1>
        <GridList cellHeight={600} style={styles.gridList} cols={2}>
            {roomListStore.rooms.map(room => {
                return (
                    <GridListTile key={room._id} cols={1}>
                        <Card style={styles.card}>
                            <CardMedia
                                style={{
                                    height: 350,
                                    backgroundImage: `url(${base64_encode(room.thumbnail.data)})`
                                }}
                                image='http://headfm.net/wp-content/uploads/2014/11/no-image-1-600x6004-600x500.png'
                                title={room.teamname}
                            />
                            <CardContent>
                                <Typography type="headline" component="h2">
                                {room.teamname}
                                </Typography>
                                <Typography component="p">
                                    {room.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={`/room/info/${room._id}`} style={styles.link}>
                                    <Button dense color="primary">Learn More</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </GridListTile>
                )
            })}
        </GridList>
        <Link to="/room/create">
            <Button style={styles.button} raised color="primary"> Create Room </Button>
        </Link>
    </div>
)));

export default List;

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
    },
    gridList: {
        width: '100%',
        height: '100%',
    },
    card: {
        maxWidth: 800,
    },
    media: {
        height: 600,
    },
    button: {
        display: 'block',
        width: '300px',
        height: '50px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    link: {
        textDecoration: 'none'
    }
}
