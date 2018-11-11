import React from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from './actions';
import HeaderMenu from './headermenu';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuIsVisible: false
        };
        this.showMenu = this.showMenu.bind(this);
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
    render() {
        if (!this.props.userInfo) {
            return null;
        }
        return (
            <div>
                <div className="header">
                    <div>
                        <p className="logo"><i className="logo logohover far fa-bookmark"></i> Authors<span className="pink">In</span>Town</p>
                    </div>
                    <div className="search-container">
                        <div className="search-bar">
                            <i className="fas fa-search search-icon"></i>
                            <input type="text" id="main-search" ></input>
                        </div>
                    </div>

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
