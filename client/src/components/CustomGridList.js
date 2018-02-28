import React, { Component } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import { apiBaseUrl } from '../utils/Helper';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: '80%',
        height: '100%',
        overflowY: 'auto',
    },
};

class CustomGridList extends Component {

    state = {
        response: [],
        postId: ''
    };

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch(apiBaseUrl + '/api/v1/posts');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.error.message);

        return body;
    };

    onPostSelected(postId) {
        this.setState({ postId });
        this.props.showPost(postId, '');
    }

    render() {
        let mainView = null;
        if (this.state.response.length > 0) {
            mainView =
                <GridList
                    cellHeight='auto'
                    style={styles.gridList} >
                    <Subheader>Posts</Subheader>
                    {this.state.response.map((tile) => (
                        <GridTile key={tile._id} onClick={event => this.onPostSelected(tile._id)}>
                            <Paper className="card" zDepth={1}>
                                <h3>{tile.title}</h3>
                                <p className="author">By {tile.author} </p>
                                <p className="fade module"> {tile.body} </p>
                            </Paper>
                        </GridTile>
                    ))}
                </GridList>;
        } else {
            mainView =
                <h1>There is no content yet</h1>
        }
        return (
            <div style={styles.root}>
                {mainView}
            </div>
        );
    }
}

export default CustomGridList;