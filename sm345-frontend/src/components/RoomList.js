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

const RoomList = inject('roomListStore')(observer(({roomListStore}) => (
    <div style={styles.root}>
        <h1> RoomList </h1>
        <GridList cellHeight={500} style={styles.gridList} cols={3}>
            {roomListStore.rooms.map(room => {
                return (
                    <GridListTile key={room._id} cols={1}>
                        <Card style={styles.card}>
                            <CardMedia
                                style={{
                                    height: 200,
                                    backgroundImage: `url(${base64_encode(room.thumbnail.data)})`
                                }}
                                image={`url(${base64_encode(room.thumbnail.data)})`}
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
                                <Button dense color="primary">
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </GridListTile>
                )
            })}
        </GridList>
        <Link to="room/create">
            <Button style={styles.button} raised color="primary"> Create Room </Button>
        </Link>
    </div>
)));

export default RoomList;

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
        maxWidth: 345,
    },
    media: {
        height: 200,
    },
    button: {
        display: 'block',
        width: '300px',
        height: '50px',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}
