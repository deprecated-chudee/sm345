import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Paper, Button, TextField } from 'material-ui';

@inject('authStore')
@observer
export default class Login extends Component {

    update = (key, value) => {
        this.props.authStore[key] = value;
    }

    onChange = e => {
        this.update(e.target.name, e.target.value);
    }

    login = () => {
        this.props.authStore.login();
        this.props.history.push('/');
    }

    render() {
        let { username, password } = this.props.authStore;
        return (
            <div className="page">
                <Paper style={styles.paper}>
                    <h1 style={styles.title}> Login </h1>
                    <TextField
                        required
                        id="username"
                        name="username"
                        label="아이디"
                        value={username}
                        onChange={this.onChange}
                        margin="normal"
                    />
                    <TextField
                        required
                        id="password"
                        name="password"
                        label="비밀번호"
                        value={password}
                        onChange={this.onChange}
                        margin="normal"
                    />

                    <Button 
                        raised 
                        style={styles.button}
                        color="primary" 
                        onClick={this.login}
                    > 
                        로그인 
                    </Button>
                </Paper>
            </div>
        )
    }
}

const styles = {
    paper: {
        maxWidth: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 30,
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        alignSelf: 'center'
    },
    button: {
        marginTop: 30
    }
}