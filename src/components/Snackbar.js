import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class CustomSnackbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            autoHideDuration: 4000,
            message: this.props.message ? this.props.message : '',
            open: false,
        };
    }

    componentWillMount() {
        if (this.props.open) {
            this.handleRequestOpen();
        } else {
            this.handleRequestClose();
        }
    }

    handleActionClick = () => {
        if (this.state.message === 'Deleting Post') {
            localStorage.setItem('deletingPost', '');
        } else if (this.state.message === 'Deleting Comment') {
            localStorage.setItem('deletingComment', '');
        }
        this.setState({
            open: false,
        });
    };

    handleRequestOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        return (
            <div>
                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    action="undo"
                    autoHideDuration={this.state.autoHideDuration}
                    onActionClick={this.handleActionClick}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}