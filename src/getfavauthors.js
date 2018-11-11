import React from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from './actions';
import axios from './axios';


class GetFavAuthors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.dispatch(getUserInfo());
    }
    render() {
        if (!this.props.userInfo) {
            return null;
        }
        return (
            <div>
                <h1>DO THE GOODREADS THING</h1>
            </div>
        );
    }
}


const mapStateToProps = function(state) {
    return {
        userInfo: state.user_info,
        loaction: state.location
    };
};

export default connect(mapStateToProps)(GetFavAuthors);
