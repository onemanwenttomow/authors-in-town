import React from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from './actions';
import axios from './axios';

let first, last, email, password, password2, oldpassword;
const emailTest = /.{1,}(@).{1,}/i;

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitDisabled: false,
            failedValidation: '',
            failedPassValidation: '',
            failedFirstValidation: '',
            error: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.canSubmit = this.canSubmit.bind(this);
        this.formValidation = this.formValidation.bind(this);
        this.samePassword = this.samePassword.bind(this);
        this.updateprofile = this.updateprofile.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(getUserInfo());
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
        first = this.first;
        last = this.last;
        email = this.email;
        password = this.password;
        password2 = this.passwordretype;
        oldpassword = this.oldpassword;
        this.canSubmit();
        this.formValidation();
        this.samePassword();
    }
    samePassword() {
        console.log((password != password2));
        if (password && password != password2) {
            this.setState({ isSubmitDisabled: true });
            this.setState({ failedPassValidation: 'failed-validation' });
        } else {
            this.setState({ isSubmitDisabled: false });
        }
    }
    formValidation() {
        if (this.email != undefined && !emailTest.test(email)) {
            this.setState({ failedValidation: 'failed-validation' });
        } else {
            this.setState({ failedValidation: '' });
        }
        if (this.password != undefined && this.password.length < 5) {
            this.setState({ failedPassValidation: 'failed-validation' });
        } else {
            this.setState({ failedPassValidation: '' });
        }
        if (this.last != undefined && this.last.length < 1) {
            this.setState({ failedLastValidation: 'failed-validation' });
        } else {
            this.setState({ failedLastValidation: '' });
        }
        if (this.first != undefined && this.first.length < 1) {
            this.setState({ failedFirstValidation: 'failed-validation' });
        } else {
            this.setState({ failedFirstValidation: '' });
        }
    }
    canSubmit() {
        if (email && first && last && password) {
            if (emailTest.test(email) && first.length >= 1 && last.length >= 1 && password.length >= 5) {
                this.setState({ isSubmitDisabled: false });
            } else {
                this.setState({ isSubmitDisabled: true });
            }
        } else {
            return;
        }
    }
    updateprofile() {
        if (!first) {first = this.props.userInfo.data.first;}
        if (!last) {last = this.props.userInfo.data.last;}
        if (!email) {email = this.props.userInfo.data.email;}
        if (!password) { password = ''; }
        if (!oldpassword) { oldpassword = ''; }
        console.log("first: ", first);
        axios.post('/updateprofile', {
            first: first,
            last: last,
            email: email,
            password: password,
            oldpassword: oldpassword
        })
            .then(data => {
                if (data.data.success) {
                    this.setState({ passwordchanged: 'verifysuccess' });
                    document.getElementById('oldpass').value = '';
                    document.getElementById('newpass').value = '';
                    document.getElementById('newpass2').value = '';
                    this.props.dispatch(getUserInfo());
                } else {
                    this.setState({ error: true });
                }
            }).catch((err) => { console.log(err);} );
    }
    render() {
        console.log("props in edit profile: ", this.props.userInfo.data);
        return (
            <div className="main-container-flex-around">
                <div>
                    <h1>{this.props.userInfo.data.first} {this.props.userInfo.data.last}</h1>
                    <img className="user-profile-pic" src={this.props.userInfo.data.imgurl} alt={this.props.userInfo.data.first}/>
                </div>
                <div className="registerform nopadding">
                    <h1> EDIT PROFILE </h1>
                    {this.state.error && <div className="error centre">Please try again, your old password might be wrong.</div>}
                    <label>
                        First Name:
                        <input defaultValue={this.props.userInfo.data.first} className={this.state.failedFirstValidation} name="first" type="text" onChange={this.handleChange}/>
                    </ label>
                    <label>
                        Last Name:
                        <input defaultValue={this.props.userInfo.data.last} className={this.state.failedLastValidation} name="last" type="text" onChange={this.handleChange}/>
                    </ label>
                    <label>
                        Email:
                        <input  defaultValue={this.props.userInfo.data.email} className={this.state.failedValidation} name="email" onChange={this.handleChange}/>
                    </ label>
                    <label>
                        Old Password:
                        <input id="oldpass" className={this.state.failedPassValidation} pattern=".{5,}" name="oldpassword" type="password" onChange={this.handleChange}/>
                    </ label>
                    <label>
                        New Password (min 5 characters):
                        <input id="newpass" className={this.state.failedPassValidation} pattern=".{5,}" name="password" type="password" onChange={this.handleChange}/>
                    </ label>
                    <label>
                        Retype you password:
                        <input id="newpass2" className={this.state.failedPassValidation} pattern=".{5,}" name="passwordretype" type="password" onChange={this.handleChange}/>
                    </ label>
                    <div className="postform">
                        <button id={this.state.passwordchanged} className="btn" disabled={this.state.isSubmitDisabled} onClick={this.updateprofile}>Update</button>
                    </div>
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

export default connect(mapStateToProps)(EditProfile);
