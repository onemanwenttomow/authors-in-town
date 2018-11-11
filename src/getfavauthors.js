import React from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from './actions';
import axios from './axios';


class GetFavAuthors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verifyButtonDisabled: false,
            getAuthorsButtonDisabled: true,
            verifysuccess: '',
            verifybuttontext: 'Click here to verify',
            getauthorsbuttontext: 'Click here to get authors',
            verifysuccessauthors: '',
            spinner: '',
            spinner2: ''
        };
        this.verifygoodreads = this.verifygoodreads.bind(this);
        this.getauthors = this.getauthors.bind(this);
        this.setGoodReadsToTrue = this.setGoodReadsToTrue.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(getUserInfo());
        if (window.location.href.indexOf('authorize') > -1) {
            this.setState({
                verifyButtonDisabled: true,
                getAuthorsButtonDisabled: false,
                verifysuccess: 'verifysuccess',
                verifybuttontext: 'Success ',
                spinner2: ''
            });
        }
    }
    verifygoodreads() {
        console.log("clicked!");
        this.setState({
            verifyButtonDisabled: true,
            verifybuttontext: 'Please wait ',
            spinner2: 'spinner'
        });
        axios.get('/authgoodreads.json')
            .then(data => {
                location.replace(data.data.url);
            }).catch(err => { console.log(err); });
    }
    getauthors() {
        console.log("clicked on get authors");
        this.setState({
            verifyButtonDisabled: true,
            getAuthorsButtonDisabled: true,
            verifysuccess: 'verifysuccess',
            getauthorsbuttontext: 'Getting authors, please wait ',
            spinner: 'spinner'
        });
        axios.get('/token.json')
            .then(data => {
                console.log("Did i get the user id? :", data);
                this.setState({
                    verifyButtonDisabled: true,
                    getAuthorsButtonDisabled: true,
                    verifysuccessauthors: 'verifysuccess',
                    getauthorsbuttontext: 'Success ',
                    uniqueAuthors: data.data.uniqueAuthors
                });
            }).catch(err => { console.log(err); });
    }
    setGoodReadsToTrue() {
        axios.post('/setgoodreadstotrue')
            .then(() => {
                console.log("made it");
                location.replace('/');
            }).catch(err => { console.log(err); });
    }
    render() {
        if (!this.props.userInfo) {
            return null;
        }
        if (!this.state.uniqueAuthors) {
            return (
                <div className="main-container">
                    <h1>Let's get your account setup</h1>
                    <h2>Step 1: Verify your GoodReads account.  </h2>
                    <div>
                        <button disabled={this.state.verifyButtonDisabled} onClick={this.verifygoodreads} className={'btn ' + this.state.verifysuccess} >{this.state.verifybuttontext}</button>
                        <i className={'fas fa-spinner ' + this.state.spinner2}></i>
                    </div>
                    <h2>Step 2: Click here to import your favourite GoodReads authors  </h2>
                    <div>
                        <button disabled={this.state.getAuthorsButtonDisabled} onClick={this.getauthors} className={'btn ' + this.state.verifysuccessauthors} >{this.state.getauthorsbuttontext}</button>
                        <i className={'fas fa-spinner ' + this.state.spinner}></i>
                    </div>

                </div>
            );
        } else {
            return (
                <div className="main-container">
                    <h1>Let's get your account setup</h1>
                    <h2>Step 1: Verify your GoodReads account.  </h2>
                    <button disabled={this.state.verifyButtonDisabled} onClick={this.verifygoodreads} className={'btn ' + this.state.verifysuccess} >{this.state.verifybuttontext}</button>
                    <h2>Step 2: Click here to import your favourite GoodReads authors  </h2>
                    <button disabled={this.state.getAuthorsButtonDisabled} onClick={this.getauthors} className={'btn ' + this.state.verifysuccessauthors} >{this.state.getauthorsbuttontext}</button>
                    <h2>Step 3: You are ready to use the site</h2>
                    <button className="btn" onClick={this.setGoodReadsToTrue}>Find events for your authors</button>
                </div>
            );
        }

    }
}


const mapStateToProps = function(state) {
    return {
        userInfo: state.user_info,
        loaction: state.location
    };
};

export default connect(mapStateToProps)(GetFavAuthors);
