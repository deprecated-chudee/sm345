import React from 'react';
import { observer, inject } from 'mobx-react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const Header = inject('viewStateStore')(observer(
    ({viewStateStore}) => {
        return (
            <div stlye={styles.root}>
                <AppBar position="fixed" style={styles.appBar}>
                    <Toolbar>
                        <IconButton color="contrast" style={styles.menuButton} onClick={viewStateStore.toggleDialog}>
                            <MenuIcon />
                        </IconButton>
                        <Typography type="title" color="inherit" style={styles.flex}>
                            SM345
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    })
);

export default Header;

const styles = {
    root: {
        width: '100%',
    },
    appBar: {
        backgroundColor: '#2196f3'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    flex: {
        flex: 1
    }
}