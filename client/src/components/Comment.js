import React, { Component } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import SampleAvatar from '../images/user/user.svg';
import { formatDate } from '../utils/Helper';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';

class Comment extends Component {
    state = {
        logged: this.props.logged
    };

    render() {
        const createdOn = new Date(this.props.createdAt);
        const updatedOn = new Date(this.props.updatedAt);
        const edited = createdOn < updatedOn ? ' (Edited)' : '';
        return (
            <Card>
                <CardHeader
                    className="card"
                    title={this.props.author}
                    subtitle={formatDate(createdOn) + edited}
                    avatar={SampleAvatar} />
                {this.state.logged ?
                    <div className="post-detail-icon-div comment-icon-div">
                        <IconButton><EditIcon /></IconButton>
                        <IconButton><DeleteIcon /></IconButton>
                    </div> : null}
                <CardText className="card-text">{this.props.body}</CardText>
            </Card>
        );
    }
}

export default Comment;