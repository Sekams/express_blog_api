import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { apiBaseUrl } from '../utils/Helper';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */

const customContentStyle = {
    width: '30%',
    maxWidth: 'none',
};

const customTextField = {
    width: '100%'
}

export default class LoginDialog extends Component {
    state = {
        open: this.props.open,
        newUser: false,
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
        submitted: false
    };

    handleFirstName(firstName) {
        this.setState({ firstName: firstName });
    }

    handleLastName(lastName) {
        this.setState({ lastName: lastName });
    }

    handleUsername(username) {
        this.setState({ username: username });
    }

    handlePassword(password) {
        this.setState({ password: password });
    }

    handleConfirmPassword(confirmPassword) {
        this.setState({ confirmPassword: confirmPassword });
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = (event) => {
        this.setState({ open: false });
        this.props.showDialog(event);

        event.preventDefault()
    };

    toggleNewUser = () => {
        this.setState({ newUser: !this.state.newUser });
    };

    handleOnSubmit = (event) => {

        //Prevent function from refreshing
        event.preventDefault();

        this.setState({
            submitted: true,
            open: this.state.open,
            newUser: this.state.newUser,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        });

        if (this.state.newUser && this.state.firstName && this.state.lastName && this.state.username && this.state.password) {
            if (this.state.password === this.state.confirmPassword) {
                let jsonData = {
                    "firstName": this.state.firstName,
                    "lastName": this.state.lastName,
                    "username": this.state.username,
                    "password": this.state.password,
                };

                const signUp = async () => {
                    const response = await fetch(apiBaseUrl + '/api/v1/user/signup', {
                        method: "POST",
                        body: JSON.stringify(jsonData),
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        })
                    });
                    const body = await response.json();

                    if (response.status !== 201) throw Error(body.error.message);

                    return body;
                };

                signUp()
                    .then(res => this.login(event, res))
                    .catch(err => console.log(err));
            } else {
                //Passwords don't match
            }
        } else if (!this.state.newUser && this.state.username && this.state.password) {
            let jsonData = {
                username: this.state.username,
                password: this.state.password
            };

            const signIn = async () => {
                const response = await fetch(apiBaseUrl + '/api/v1/user/signin', {
                    method: "POST",
                    body: JSON.stringify(jsonData),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                });
                const body = await response.json();

                if (response.status !== 200) throw Error(body.error.message);

                return body;
            };

            signIn()
                .then(res => this.login(event, res))
                .catch(err => console.log(err));
        }

    }

    login(event, response) {
        localStorage.setItem('name', response.name);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('admin', response.admin);
        localStorage.setItem('token', response.token);
        localStorage.setItem('logged', true)
        this.props.showDialog(event);
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={event => this.handleClose(event)}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                type="submit"
                form="userFrom"
                value="Submit"
            />,
        ];

        return (
            <div>
                <Dialog
                    title={this.state.newUser ? "Sign Up" : "Sign In"}
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    contentStyle={customContentStyle}
                    autoScrollBodyContent={true}
                >
                    <form onSubmit={this.handleOnSubmit} id="userFrom">
                        {this.state.newUser ?
                            <div>
                                <TextField
                                    style={customTextField}
                                    hintText="First Name"
                                    floatingLabelText="First Name"
                                    value={this.state.firstName}
                                    errorText={(!this.state.firstName) && this.state.submitted && this.state.newUser ? "This field is required" : ""}
                                    onChange={event => this.handleFirstName(event.target.value)}
                                />
                                <TextField
                                    style={customTextField}
                                    hintText="Last Name"
                                    floatingLabelText="Last Name"
                                    value={this.state.lastName}
                                    errorText={(!this.state.lastName) && this.state.submitted && this.state.newUser ? "This field is required" : ""}
                                    onChange={event => this.handleLastName(event.target.value)}
                                />
                            </div>
                            : null}
                        <TextField
                            style={customTextField}
                            hintText="Username"
                            floatingLabelText="Username"
                            value={this.state.username}
                            errorText={(!this.state.username) && this.state.submitted ? "This field is required" : ""}
                            onChange={event => this.handleUsername(event.target.value)}
                        />
                        <TextField
                            style={customTextField}
                            hintText="Password"
                            floatingLabelText="Password"
                            type="password"
                            value={this.state.password}
                            errorText={(!this.state.password) && this.state.submitted ? "This field is required" : ""}
                            onChange={event => this.handlePassword(event.target.value)}
                        />
                        {this.state.newUser ?
                            <TextField
                                style={customTextField}
                                hintText="Confirm Password"
                                floatingLabelText="Confirm Password"
                                type="password"
                                value={this.state.confirmPassword}
                                errorText={(!this.state.confirmPassword) && this.state.submitted && this.state.newUser ? "This field is required" : ""}
                                onChange={event => this.handleConfirmPassword(event.target.value)}
                            />
                            : null}
                        <br /><br />
                        <FlatButton
                            label={this.state.newUser ? "Already have an account?" : "Have no account?"}
                            primary={true}
                            keyboardFocused={true}
                            onClick={event => this.toggleNewUser()}
                        />
                    </form>
                </Dialog>
            </div>
        );
    }
}