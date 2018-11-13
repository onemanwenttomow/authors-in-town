import React from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from './actions';
import HeaderMenu from './headermenu';
import Search from './search';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuIsVisible: false
        };
        this.showMenu = this.showMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
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
                        <a href="/" className="no-underline">
                            <p className="logo no-underline"><i className="logo logohover far fa-bookmark"></i> Authors<span className="pink">In</span>Town</p>
                        </a>
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
