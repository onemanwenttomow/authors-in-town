import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo } from './actions';
import HeaderMenu from './headermenu';
import Search from './search';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuIsVisible: false,
            logohighlighted: ''
        };
        this.showMenu = this.showMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
        this.addLogoHighlighted = this.addLogoHighlighted.bind(this);
        this.removeLogoHighlighted = this.removeLogoHighlighted.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(getUserInfo());
    }
    showMenu() {
        this.state.menuIsVisible ?
            this.setState({ menuIsVisible: false }) : this.setState({ menuIsVisible: true });
    }
    hideMenu() {
        this.state.menuIsVisible ?
            this.setState({ menuIsVisible: false }) : this.setState({ menuIsVisible: true });
    }
    addLogoHighlighted() {
        this.setState({ logohighlighted: 'logohighlighted' });
    }
    removeLogoHighlighted() {
        this.setState({ logohighlighted: '' });
    }
    render() {
        if (!this.props.userInfo) {
            return null;
        }
        return (
            <div>
                <div className="header">
                    <div>
                        <Link to="/" className="no-underline">
                            <p onMouseEnter ={this.addLogoHighlighted} onMouseLeave={this.removeLogoHighlighted} className="logo no-underline">
                                <i className="logo logohover far fa-bookmark"></i>
                                <span className="textlogo">
                                    &nbsp;Authors
                                    <span id={this.state.logohighlighted} className="pink headerspan">In</span>
                                    Town
                                </span>

                            </p>
                        </Link>
                    </div>
                    <Search/>

                    <div className="user-header">
                        <img className="profile-pic" onClick={this.showMenu} src={this.props.userInfo.data.imgurl} alt="user profile pic"></img>


                    </div>
                    { this.state.menuIsVisible &&
                        <HeaderMenu
                            clickHandler={this.hideMenu}
                        />
                    }
                </div>
            </div>

        );
    }
}


const mapStateToProps = function(state) {
    return {
        userInfo: state.user_info
    };
};

export default connect(mapStateToProps)(Header);
