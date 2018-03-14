import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import CheckIcon from 'material-ui/svg-icons/action/done';
import NavigateLeft from 'material-ui/svg-icons/navigation/chevron-left';
import SampleAvatar from './images/user/user.svg';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import LoginDialog from './components/LoginDialog';
import CustomGridList from './components/CustomGridList';
import Post from './components/Post';
import EditPost from './components/EditPost';
import './App.css';
import CustomSnackbar from './components/Snackbar';

const iconStyle = {
  width: 'auto',
  padding: 0
}

class App extends Component {
  state = {
    logged: localStorage.getItem('logged'),
    postId: '',
    postAction: '',
    commentAction: '',
    openLoginDialog: false,
    showSnackbar: false,
    snackbarMessage: ''
  };

  logout = (event) => {
    localStorage.setItem('token', '');
    localStorage.setItem('logged', false);

    this.setState({
      logged: localStorage.getItem('logged'),
    });
    window.location.reload();
  }

  showLoginDialog = (event) => {
    this.setState({
      openLoginDialog: !this.state.openLoginDialog,
      logged: localStorage.getItem('logged'),
    });
  }

  showPost = (postId, postAction) => {
    this.setState({ postId: postId, postAction: postAction });
  };

  handleComment = (action) => {
    this.setState({ commentAction: action });
  }

  showSnackbar = (snackbarMessage) => {
    this.setState({
      showSnackbar: true,
      snackbarMessage: snackbarMessage
    });
    setTimeout(
      () => {
        this.setState({
          showSnackbar: false,
          snackbarMessage: ''
        });
      },
      4500);
  }

  render() {
    let mainView, backIcon, snackBar = null;

    if (this.state.showSnackbar) {
      snackBar =
        <CustomSnackbar
          open={this.state.showSnackbar}
          message={this.state.snackbarMessage}
        />;
    }

    if (this.state.postAction || this.state.commentAction || this.state.postId) {
      if (this.state.postAction === 'add') {
        localStorage.setItem('currentPostTitle', '');
        localStorage.setItem('currentPostBody', '');
        mainView =
          <div>
            <EditPost logged={this.state.logged} postId='' showPost={postId => this.showPost(postId, '')} />
            <FloatingActionButton
              className="fab"
              label="Submit"
              keyboardFocused={true}
              type="submit"
              form="editPostFrom"
              value="Submit">
              <CheckIcon />
            </FloatingActionButton>
          </div>;
      } else if (this.state.postAction === "edit") {
        mainView =
          <div>
            <EditPost logged={this.state.logged} postId={this.state.postId} showPost={postId => this.showPost(postId, '')} />
            <FloatingActionButton
              className="fab"
              label="Submit"
              keyboardFocused={true}
              type="submit"
              form="editPostFrom"
              value="Submit">
              <CheckIcon />
            </FloatingActionButton>
          </div>;
      } else if (this.state.commentAction === "add") {
        mainView =
          <Post
            showSnackbar={snackbarMessage => this.showSnackbar(snackbarMessage)}
            commentAction={this.state.commentAction}
            logged={this.state.logged}
            postId={this.state.postId}
            showPost={postId => this.showPost(postId, 'done')}
            handleComment={action => this.handleComment(action)} />;
      } else {
        mainView =
          <div>
            <Post
              showSnackbar={snackbarMessage => this.showSnackbar(snackbarMessage)}
              postId={this.state.postId}
              logged={this.state.logged}
              showPost={postId => this.showPost(postId, '')}
              editPost={postId => this.showPost(postId, 'edit')}
              handleComment={action => this.handleComment(action)} />
            {this.state.logged === "true" ?
              <FloatingActionButton className="fab" onClick={event => this.handleComment('add')}>
                <CommentIcon />
              </FloatingActionButton> : null}
          </div>;
      }
      backIcon = <IconButton><NavigateLeft /></IconButton>;
    } else {
      mainView =
        <div>
          <CustomGridList showPost={postId => this.showPost(postId, '')} logged={this.state.logged} />
          {this.state.logged === "true" ?
            <FloatingActionButton className="fab" onClick={event => this.showPost('', 'add')}>
              <ModeEdit />
            </FloatingActionButton> : null}
        </div>;
    }
    return (
      <div className="App">
        <header>
          <AppBar
            title="The Nexus Blog"
            onLeftIconButtonClick={event => this.state.postAction === 'edit' ? this.showPost(this.state.postId, '') : this.showPost('', '')}
            showMenuIconButton={this.state.postId !== '' || this.state.postAction !== ''}
            iconElementLeft={backIcon}
            iconElementRight={this.state.logged === "true" ?
              <IconMenu
                iconButtonElement={
                  <IconButton style={iconStyle}>
                    <ListItem
                      disabled={true}
                      leftAvatar={
                        <Avatar src={SampleAvatar} />
                      }>
                      {localStorage.getItem('name')}
                    </ListItem>
                  </IconButton>
                }
              >
                <MenuItem primaryText="Sign Out" onClick={event => this.logout(event)} />
              </IconMenu> :
              <FlatButton label="Login" onClick={event => this.showLoginDialog(event)} />
            }
          />
        </header>
        {mainView}
        <LoginDialog
          open={this.state.openLoginDialog}
          showDialog={event => { this.showLoginDialog(event) }} />
        {snackBar}
      </div>
    );
  }
}

export default App;
