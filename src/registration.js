import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

let first, last, email, password, password2;
const emailTest = /.{1,}(@).{1,}/i;

export class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitDisabled: true,
            failedValidation: '',
            failedPassValidation: '',
            failedFirstValidation: '',
            title: 'Register today for free.',
            isAuthor: false
        };
        this.error;
        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
        this.canSubmit = this.canSubmit.bind(this);
        this.formValidation = this.formValidation.bind(this);
        this.samePassword = this.samePassword.bind(this);
    }
    componentDidMount() {
        if (window.location.hash == '#/register/author') {
            this.setState({
                title: 'Sign up as an author.',
                isAuthor: true
            });
        }

    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
        first = this.first;
        last = this.last;
        email = this.email;
        password = this.password;
        password2 = this.passwordretype;
        this.canSubmit();
        this.formValidation();
        this.samePassword();
    }
    samePassword() {
        if (password && password != password2) {
            this.setState({ isSubmitDisabled: true });
            this.setState({ failedPassValidation: 'failed-validation' });
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
    register() {
        axios.post('/register', {
            first: first,
            last: last,
            email: email,
            password: password,
            isAuthor: this.state.isAuthor
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
            <div className="registerform login-container">
                <h2 className="welcome-message">{this.state.title}</h2>
                {this.state.error && <div className="error centre">Please try again, that email might be taken</div>}
                <label>
                    First Name:
                    <input className={this.state.failedFirstValidation} name="first" type="text" onChange={this.handleChange}/>
                </ label>
                <label>
                    Last Name:
                    <input className={this.state.failedLastValidation} name="last" type="text" onChange={this.handleChange}/>
                </ label>
                <label>
                    Email:
                    <input className={this.state.failedValidation} name="email" onChange={this.handleChange}/>
                </ label>
                <label>
                    Password (min 5 characters):
                    <input className={this.state.failedPassValidation} pattern=".{5,}" name="password" type="password" onChange={this.handleChange}/>
                </ label>
                <label>
                    Retype you password:
                    <input className={this.state.failedPassValidation} pattern=".{5,}" name="passwordretype" type="password" onChange={this.handleChange}/>
                </ label>
                <div className="postform">
                    <button className="btn" disabled={this.state.isSubmitDisabled} onClick={this.register}>Register</button>
                </div>
            </div>
        );
    }
}
