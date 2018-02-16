import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { apiBaseUrl } from '../utils/Helper';

const styles = {
    titleInput: {
        width: '100%'
    },
    bodyInput: {
        width: '100%',
        min_height: '30%'
    }
}

class EditPost extends Component {
    state = {
        postId: this.props.postId,
        title: localStorage.getItem('currentPostTitle') !== '' ? localStorage.getItem('currentPostTitle') : '',
        body: localStorage.getItem('currentPostBody') !== '' ? localStorage.getItem('currentPostBody') : '',
        submitted: false
    }

    handleTitle(title) {
        this.setState({ title: title });
    }

    handleBody(body) {
        this.setState({ body: body });
    }

    handleOnSubmit = (event) => {

        //Prevent function from refreshing
        event.preventDefault();

        this.setState({
            submitted: true,
            title: this.state.title,
            body: this.state.body
        });

        if (this.state.title && this.state.body && (localStorage.getItem('logged') === "true")) {
            let jsonData = {
                "title": this.state.title,
                "body": this.state.body
            };

            const editPost = async () => {

                const response = await fetch(apiBaseUrl + '/api/v1/posts' + (this.props.postId !== '' && this.props.postId !== 'add' ? '/' + this.props.postId : ''), {
                    method: this.props.postId !== '' && this.props.postId !== 'add' ? 'PUT' : 'POST',
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

            editPost()
                .then(res => this.showResults(res))
                .catch(err => console.log(err));
        } else {
            //Missing a parameter
        }

    }

    showResults = (post) => {
        this.setState({ post: post });
        this.props.showPost(post._id, false);
    }

    render() {
        return (
            <form onSubmit={this.handleOnSubmit} id="editPostFrom">
                <div className="post-detail">
                    <h1>{this.state.postId !== '' && this.state.postId !== 'add' ? "Edit Post" : "Add Post"}</h1>

                    <TextField
                        style={styles.titleInput}
                        hintText="Title"
                        floatingLabelText="Title"
                        value={this.state.title}
                        errorText={(!this.state.title) && this.state.submitted ? "This field is required" : ""}
                        onChange={event => this.handleTitle(event.target.value)}
                    />
                    <TextField
                        style={styles.bodyInput}
                        hintText="Body"
                        floatingLabelText="Body"
                        multiLine={true}
                        value={this.state.body}
                        errorText={(!this.state.body) && this.state.submitted ? "This field is required" : ""}
                        onChange={event => this.handleBody(event.target.value)}
                    />
                </div>
            </form>
        );
    }

}

export default EditPost;