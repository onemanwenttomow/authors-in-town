import React from 'react';
import { Link } from 'react-router-dom';
import axios from './axios';
import { connect } from 'react-redux';
import { getUserInfo } from './actions';

class HeaderMenu extends React.Component {
    constructor(props) {
        super(props);
        this.uploadImage = this.uploadImage.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(getUserInfo());
    }
    handleFileChange(e) {
        this.file = e.target.files[0];
        this.uploadImage();
    }
    async uploadImage() {
        let formData = new FormData;
        formData.append('file', this.file);
        try {
            await axios.post('/upload', formData);
            this.props.dispatch(getUserInfo());
            this.props.clickHandler();
        } catch (e) {console.log(e);}
    }
    render() {
        if (!this.props.userInfo) {
            return null;
        }
        return (
            <div className="header-menu">
                <div className="menu-item">
                    <p>Hello {this.props.userInfo.data.first}, you are <span className="pink">{this.props.userInfo.happyWord}</span></p>
                </div>
                <div className="menu-item">
                    <Link to="/editprofile">
                        <p>Edit Profile</p>
                    </Link>
                </div>
                <div className="menu-item">
                    <p>
                        <label className="custom-file-upload">
                        Profile Pic
                            <input onChange={this.handleFileChange} className="file" type="file" name="file" accept="image/*"/>
                        </label>
                    </p>
                </div>
                <div className="menu-item">
                    <a className="no-underline" href="/logout"><p>Logout</p></a>
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

export default connect(mapStateToProps)(HeaderMenu);
