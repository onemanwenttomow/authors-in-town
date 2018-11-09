import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

let email, password;
const emailTest = /.{1,}(@).{1,}/i;

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitDisabled: true,
            failedValidation: '',
            failedPassValidation: ''
        };
        this.error;
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.canSubmit = this.canSubmit.bind(this);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
        email = this.email;
        password = this.password;
        this.canSubmit();
        this.formValidation();
    }
    formValidation() {
        if (!emailTest.test(email)) {
            this.setState({ failedValidation: 'failed-validation' });
        } else {
            this.setState({ failedValidation: '' });
        }
        if (this.password != undefined && this.password.length < 5) {
            this.setState({ failedPassValidation: 'failed-validation' });
        } else {
            this.setState({ failedPassValidation: '' });
        }
    }
    canSubmit() {
        if (email && password) {
            if (emailTest.test(email) && password.length >= 5) {
                this.setState({ isSubmitDisabled: false });
            } else {
                this.setState({ isSubmitDisabled: true });
            }
        } else {
            return;
        }
    }
    login() {
        axios.post('/login', {
            email: email,
            password: password
        })
            .then(data => {
                if (data.data.success) {
                    location.replace('/');
                } else {
                    this.setState({error: true});
                }
            });
    }
    render() {
        return (
            <div className="login-container">
                <h2 className="welcome-message">Please login below.</h2>
                {this.state.error && <div className="error centre">Something went wrong. Please try again</div>}
                <label>
                    Email:
                    <input className={this.state.failedValidation} name="email" type="email" onChange={this.handleChange}/>
                </ label>
                <label>
                    Password (min 5 characters):
                    <input className={this.state.failedPassValidation} name="password" type="password" onChange={this.handleChange}/>
                </ label>
                <div className="postform">
                    <button className="btn" disabled={this.state.isSubmitDisabled} onClick={this.login}>Login</button>
                </div>
            </div>
        );
    }
}
