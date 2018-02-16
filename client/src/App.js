import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import NavigateLeft from 'material-ui/svg-icons/navigation/chevron-left';
import SampleAvatar from './images/user/user.svg';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import LoginDialog from './components/LoginDialog';

import './App.css';

import CustomGridList from './components/CustomGridList';
import Post from './components/Post';

const iconStyle = {
  width: 'auto',
  padding: 0
}

class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} label="Login" />
    );
  }
}

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton style={iconStyle}>
        <ListItem
          disabled={true}
          leftAvatar={
            <Avatar src={SampleAvatar} />
          }>
          {props.name}
        </ListItem>
      </IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText="Sign Out" onClick={event => props.setLogin(event)} />
  </IconMenu>
);

Logged.muiName = 'IconMenu';

class App extends Component {
  state = {
    logged: false,
    postId: '',
    openLoginDialog: false
  };

  setLogin = (event) => {
    this.setState({
      logged: !this.state.logged,
      openLoginDialog: false
    });
  };

  handleAppBarRightButton = () => {
    if (!this.state.logged) {
      this.showLoginDialog();
    }
  };

  showLoginDialog = () => {
    this.setState({ openLoginDialog: !this.state.openLoginDialog });
  }

  showPost = (postId) => {
    this.setState({ postId: postId });
  };

  render() {
    let mainView, backIcon = null;
    if (this.state.postId) {
      mainView =
        <div>
          <Post postId={this.state.postId} logged={this.state.logged} />
          {this.state.logged ?
            <FloatingActionButton className="fab">
              <CommentIcon />
            </FloatingActionButton> : null}
        </div>;
      backIcon = <IconButton><NavigateLeft /></IconButton>;
    } else {
      mainView =
        <div>
          <CustomGridList showPost={postId => this.showPost(postId)} logged={this.state.logged} />
          {this.state.logged ?
            <FloatingActionButton className="fab">
              <ModeEdit />
            </FloatingActionButton> : null}
        </div>;
    }
    return (
      <div className="App">
        <header>
          <AppBar
            title="The Nexus Blog"
            onLeftIconButtonClick={event => this.showPost('')}
            showMenuIconButton={this.state.postId !== ''}
            iconElementLeft={backIcon}
            onRightIconButtonClick={event => this.handleAppBarRightButton()}
            iconElementRight={this.state.logged ?
              <Logged name="Simon Peter Ssekamatte" setLogin={event => this.setLogin(event)} /> :
              <Login />
            }
          />
        </header>
        {mainView}
        <LoginDialog open={this.state.openLoginDialog} showDialog={event => { this.showLoginDialog() }} />
      </div>
    );
  }
}

export default App;
