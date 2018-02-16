import React, { Component } from 'react';
import Comment from './Comment';
import Subheader from 'material-ui/Subheader';
import SampleAvatar from '../images/user/user.svg';
import { formatDate, apiBaseUrl } from '../utils/Helper';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import Text from 'react-format-text';
import ComfirmDeleteDialog from './ConfirmDeleteDialog'

const style = { margin: 5 };

const styles = {
    mediumIcon: {
        width: 48,
        height: 48,
    },
    medium: {
        width: 96,
        height: 96,
        padding: 24,
    }
};

class Post extends Component {
    state = {
        post: {},
        comments: [],
        logged: localStorage.getItem('logged')
    };

    componentDidMount() {
        this.getPost()
            .then(res => this.setState({ post: res }))
            .catch(err => console.log(err));

        this.getComments()
            .then(res => this.setState({ comments: res }))
            .catch(err => console.log(err));
    }

    getPost = async () => {
        const postResponse = await fetch(apiBaseUrl + '/api/v1/posts/' + this.props.postId);
        const postBody = await postResponse.json();

        if (postResponse.status !== 200) throw Error(postBody.error.message);

        return postBody;
    };

    getComments = async () => {
        const commentsResponse = await fetch(apiBaseUrl + '/api/v1/posts/' + this.props.postId + '/comments');
        const commentsBody = await commentsResponse.json();

        if (commentsResponse.status !== 200) throw Error(commentsBody.error.message);

        return commentsBody;
    };

    showPostEdit = (post) => {
        localStorage.setItem('currentPostTitle', post.title);
        localStorage.setItem('currentPostBody', post.body);
        this.props.showPost(post._id, true);
    }

    render() {
        const createdOn = new Date(this.state.post.createdAt);
        const updatedOn = new Date(this.state.post.updatedAt);
        const edited = createdOn < updatedOn ? ' (Edited)' : '';
        let comments, subHeader = null;
        if (this.state.comments.length > 0) {
            subHeader = <Subheader>Comments</Subheader>;
            comments = this.state.comments.map((comment) => {
                return (
                    <Comment
                        key={comment._id}
                        author={comment.author}
                        createdAt={comment.createdAt}
                        updatedAt={comment.updatedAt}
                        body={comment.body}
                        logged={this.state.logged} />
                );
            });
        }
        return (
            <div className="post-detail" >
                <List>
                    <ListItem
                        disabled={true}
                        leftAvatar={
                            <Avatar src={SampleAvatar}
                                size={60}
                                style={style} />
                        } >
                        <div className="post-author-div">
                            <h3>{this.state.post.author}</h3>
                            <p className="post-date">{formatDate(createdOn) + edited}</p>
                        </div>
                    </ListItem>
                </List>
                {(this.state.logged === "true" && this.state.post.userId === localStorage.getItem('userId')) ||
                    (this.state.logged === "true" && localStorage.getItem('admin') === "true") ?
                    <div className="post-detail-icon-div">
                        <IconButton
                            onClick={event => this.showPostEdit(this.state.post)}
                            iconStyle={styles.mediumIcon}
                            style={styles.medium}>
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            iconStyle={styles.mediumIcon}
                            style={styles.medium}>
                            <DeleteIcon />
                        </IconButton>
                    </div> : null}
                <h1>{this.state.post.title}</h1>
                <p><Text>{this.state.post.body}</Text></p>
                {subHeader}
                {comments}
            </div>
        );
    }
}

export default Post;