import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import SampleAvatar from '../images/user/user.svg';
import { formatDate } from '../utils/Helper';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import { apiBaseUrl } from '../utils/Helper';
import CheckIcon from 'material-ui/svg-icons/action/done';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

const styles = {
    titleInput: {
        width: '100%'
    },
    bodyInput: {
        width: '100%',
        min_height: '30%'
    }
}

class Comment extends Component {
    state = {
        comment: this.props.comment ? this.props.comment : {},
        logged: this.props.logged,
        postId: this.props.postId,
        commentAction: this.props.commentAction ? this.props.commentAction : '',
        commentId: this.props.commentId ? this.props.commentId : '',
        body: this.props.body ? this.props.body : '',
        submitted: false
    };

    componentDidUpdate() {
        if (this.state.commentAction === 'add') {
            ReactDOM.findDOMNode(this).scrollIntoView();
        }
    }

    handleBody(body) {
        this.setState({ body: body });
    }

    handleOnSubmit = (event) => {

        //Prevent function from refreshing
        event.preventDefault();

        this.setState({
            submitted: true,
            body: this.state.body
        });

        if (this.state.body && (localStorage.getItem('logged') === "true")) {
            let jsonData = {
                "body": this.state.body
            };

            const editComment = async () => {

                const response = await fetch(apiBaseUrl + '/api/v1/posts/' + this.state.postId + '/comments' + (this.props.commentId ? '/' + this.props.commentId : ''), {
                    method: this.props.commentId ? 'PUT' : 'POST',
                    body: JSON.stringify(jsonData),
                    headers: new Headers({
                        'x-access-token': localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    })
                });
                const body = await response.json();

                if (response.status > 299) throw Error(body.error.message);

                return body;
            };

            editComment()
                .then(res => this.showResults(res))
                .catch(err => console.log(err));
        } else {
            //Missing a parameter
        }

    }

    deleteComment = async () => {
        const deleteResponse = await fetch(apiBaseUrl + '/api/v1/posts/' + this.state.postId + '/comments/' + localStorage.getItem('deletingComment'), {
            method: 'DELETE',
            headers: new Headers({
                'x-access-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            })
        });
        const deleteBody = await deleteResponse.json();

        if (deleteResponse.status > 299) throw Error(deleteBody.error.message);

        return deleteBody;
    };

    showResults = (comment) => {
        this.setState({ body: comment.body });
        this.handleCommentAction('');;
    }

    handleCommentAction = (action) => {
        this.setState({ commentAction: action });
        this.props.handleComment(action);
    }

    handleCommentDelete = (event) => {
        localStorage.setItem('deletingComment', this.props.commentId);
        this.props.showSnackbar('Deleting Comment');
        setTimeout(
            () => { this.deleteCommentResponseHandler(event); },
            4000);
    }

    deleteCommentResponseHandler = (event) => {
        if (localStorage.getItem('deletingComment') !== '') {
            this.deleteComment()
                .then(res => this.props.loadComments())
                .catch(err => console.log(err));
        }
    }

    render() {
        const createdOn = new Date(this.props.createdAt);
        const updatedOn = new Date(this.props.updatedAt);
        const edited = createdOn < updatedOn ? ' (Edited)' : '';
        let mainView = null;

        if (this.state.commentAction) {
            const now = new Date();
            const title = this.state.commentAction !== '' && this.state.commentAction === 'add' ? "Add Comment" : "Edit Comment";
            mainView =
                <div ref="addComment">
                    <CardHeader
                        className="card"
                        title={this.props.author}
                        subtitle={formatDate(now)}
                        avatar={SampleAvatar} />
                    <div className="post-detail-icon-div comment-icon-div">
                        <IconButton
                            label="Submit"
                            keyboardFocused={true}
                            type="submit"
                            form="editCommentFrom"
                            value="Submit"
                        ><CheckIcon />
                        </IconButton>
                        <IconButton
                            onClick={event => this.handleCommentAction('')} >
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <CardText className="card-text">
                        <form onSubmit={this.handleOnSubmit} id="editCommentFrom">
                            <TextField
                                style={styles.bodyInput}
                                hintText={title}
                                floatingLabelText={title}
                                multiLine={true}
                                value={this.state.body}
                                errorText={(!this.state.body) && this.state.submitted ? "This field is required" : ""}
                                onChange={event => this.handleBody(event.target.value)}
                            />
                        </form>
                    </CardText>
                </div>;
        } else {
            mainView =
                <div>
                    <CardHeader
                        className="card"
                        title={this.props.author}
                        subtitle={formatDate(createdOn) + edited}
                        avatar={SampleAvatar} />
                    {
                        (this.state.logged === "true" && this.state.comment.userId === localStorage.getItem('userId')) ||
                            (this.state.logged === "true" && localStorage.getItem('admin') === "true") ?
                            <div className="post-detail-icon-div comment-icon-div">
                                <IconButton
                                    onClick={event => this.handleCommentAction('edit')}
                                ><EditIcon />
                                </IconButton>
                                <IconButton
                                    onClick={event => this.handleCommentDelete(event)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </div> : null
                    }
                    <CardText className="card-text">{this.state.body}</CardText>
                </div>;
        }
        return (
            <Card>
                {mainView}
            </Card>
        );
    }
}

export default Comment;