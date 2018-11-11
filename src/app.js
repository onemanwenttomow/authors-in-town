import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo } from './actions';
import Header from './header';
import MainEvents from './mainevents';



class App extends React.Component {
    constructor() {
        super();
        this.state = {
            menuIsVisible: false
        };
    }
    componentDidMount() {
        this.props.dispatch(getUserInfo());
    }

    render () {
        console.log(this.props);
        if (!this.props.userInfo) {
            return null;
        }
        return (
            <div>
                <Header />
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component = { MainEvents } />
                    </ Switch>
                </BrowserRouter>
            </div>

        );
    }
}

const mapStateToProps = function(state) {
    return {
        userInfo: state.user_info
    };
};

export default connect(mapStateToProps)(App);