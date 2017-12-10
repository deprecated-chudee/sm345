import React from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import Paper from 'material-ui/Paper';
import { MenuList, MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import { Info, GroupWork } from 'material-ui-icons';

const drawerWidth = 240;

const styles = {
    appBar: {
        position: 'absolute',
        width: `calc(100% - ${drawerWidth}px)`,
    },
    drawerPaper: {
        position: 'relative',
        marginTop: '64px',
        height: '100%',
        width: drawerWidth,
    },
    transition: {
        position: 'absolute',
        top: 0,
        left: 0,
        margin: 0,
        height: '100%'
    },
    link: {
        textDecoration: 'none'
    }
}

function Transition(props) {
    return <Slide direction="right" style={styles.transition} in="true" {...props}/>
}

const DrawerMenu = inject('viewStateStore')(observer(
    ({viewStateStore}) => {
        return (
            <Dialog
                open={viewStateStore.dialog}
                transition={Transition}
                keepMounted
                onRequestClose={viewStateStore.toggleDialog}
            >
                <Paper style={styles.drawerPaper}>
                    <MenuList>
                        <Link to={'/'} style={styles.link}>
                            <MenuItem>
                                <ListItemIcon> 
                                    <Info /> 
                                </ListItemIcon>
                                <ListItemText inset primary="홈" />
                            </MenuItem>
                        </Link>
                        <Link to={'/room'} style={styles.link}>
                            <MenuItem>
                                <ListItemIcon> 
                                    <GroupWork /> 
                                </ListItemIcon>
                                <ListItemText inset primary="멘토방" />
                            </MenuItem>
                        </Link>
                        <Link to={'/excel'} style={styles.link}>
                            <MenuItem>
                                <ListItemIcon> 
                                    <GroupWork /> 
                                </ListItemIcon>
                                <ListItemText inset primary="엑셀" />
                            </MenuItem>
                        </Link>
                    </MenuList>
                </Paper>
            </Dialog>
        );
    })
);

export default DrawerMenu;
