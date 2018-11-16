import React from 'react';
import { connect } from 'react-redux';
import { getAuthorEventById } from './actions';
import axios from './axios';

class Author extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            followButtonDisabled: false
        };
        this.followButtonClick = this.followButtonClick.bind(this);
        let authorId, authorUrl;
    }
    componentDidMount() {
        console.log("mounted");
        this.authorId = this.props.match.params.id;
        console.log("authorID: ", this.authorId);
        this.authorUrl = "https://www.goodreads.com/author/show/" + this.authorId;
        axios.get('/userfollowingauthorcheck.json/' + this.authorId)
            .then(data => {
                console.log("Is the user following?: ", data.data.following);
                if (data.data.following) {
                    this.setState({
                        followButtonText: 'Unfollow',
                        followColor: 'blue'
                    });
                } else {
                    this.setState({
                        followButtonText: 'Follow',
                        followColor: ''
                    });
                }
            }).catch(err => { console.log(err); });
        axios.get('/getauthorbyid.json/' + this.authorId)
            .then((data) => {
                console.log(data);
                this.setState({
                    name: data.data.data.name,
                    imgurl: data.data.data.author_pic_url
                });
                this.props.dispatch(getAuthorEventById(this.authorId));
                axios.get('/getauthorbooks.json/' + this.authorId)
                    .then((data) => {
                        this.setState({ books: data.data });
                    }).catch(err => { console.log(err); });
            }).catch(err => { console.log(err); });
    }

    followButtonClick() {
        console.log("AUTHOR ID: ", this.authorId);
        if (this.state.followButtonText == 'Unfollow') {
            console.log("DO some unfollowing");
            axios.post('/unfollowauthor.json/' + this.authorId)
                .then(() => {
                    this.setState({
                        followButtonText: 'Follow',
                        followColor: ''
                    });
                }).catch(err => {console.log(err); });
        } else {
            console.log("do some following");
            this.setState({ followButtonDisabled: true });
            axios.post('/followauthor.json/' + this.authorId)
                .then(() => {
                    this.setState({
                        followButtonText: 'Unfollow',
                        followColor: 'blue',
                        followButtonDisabled: false
                    });
                }).catch(err => {console.log(err); });
        }
    }

    render() {
        if (!this.state.name) {
            return null;
        }
        console.log(this.props);
        if (!this.props.otherevents) {
            return (
                <div className="main-container-flex">
                    <div className="author-profile">
                        <h1>{this.state.name}</h1>
                        <a href={this.authorUrl}>
                            <img src={this.state.imgurl} alt={this.state.name}/>
                        </a>
                    </div>
                    <div>
                        <h1>Events</h1>
                    </div>

                </div>
            );
        }
        if (!this.state.books) {
            return (
                <div className="main-container-flex">
                    <div className="author-profile">
                        <h1>{this.state.name}</h1>
                        <a href={this.authorUrl}>
                            <img src={this.state.imgurl} alt={this.state.name}/>
                        </a>
                    </div>
                    <div className="eventsarea">
                        <div>
                            <h1>Events in your area</h1>
                            { this.props.localevents.map(
                                event => (
                                    <div className="stretchedevent" key={event.id}>
                                        <div className="inline">
                                            <div className="day"> {event.event_time.split('-')[2].substring(0,2)} </div>
                                            <div className="month"> {event.event_time.split('-')[1]} </div>
                                        </div>
                                        <h3 className="blue inline">{this.state.name}</h3>
                                        <p className="inline">{event.venue_name}, {event.town}</p>
                                        <div>
                                            <button className="btn inline" >Get Tickets</button>
                                        </div>
                                    </div>
                                )
                            )}
                            <h1>Other events</h1>
                            { this.props.otherevents.map(
                                event => (
                                    <div className="stretchedevent line" key={event.id}>
                                        <div className="inline">
                                            <div className="day"> {event.event_time.split('-')[2].substring(0,2)} </div>
                                            <div className="month"> {event.event_time.split('-')[1]} </div>
                                        </div>
                                        <h3 className="blue inline extrapadding">{this.state.name}</h3>
                                        <p className="inline">{event.venue_name}, {event.town}, {event.country}</p>
                                        <div>
                                            <button className="btn inline" >Get Tickets</button>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>


                </div>
            );
        } else {
            console.log("this state books", this.state.books);
            return (
                <div className="main-container-flex">
                    <div className="author-profile">
                        <h1>{this.state.name}</h1>
                        <div className="author-pic-and-button">
                            <a href={this.authorUrl}>
                                <img className="author-pic-profile" src={this.state.imgurl} alt={this.state.name}/>
                            </a>
                            <button
                                id={this.state.followColor}
                                className="btn inline extraleftpadding"
                                onClick={this.followButtonClick}
                                disabled={this.state.followButtonDisabled}
                            >{this.state.followButtonText}</button>
                        </div>

                        <h2>Books:</h2>
                        <div className="books">
                            { this.state.books.map(
                                book => (
                                    <div className="book" key={book.id._}>

                                        <a href={book.link}>
                                            <img className="bookimage inline" src={book.image_url} alt={book.title_without_series}/>
                                        </a>
                                        <h5 className="blue">{book.title_without_series}</h5>

                                    </div>
                                )
                            )}
                        </div>

                    </div>
                    <div className="eventsarea">
                        <div>
                            <h1>Events in your area</h1>
                            { this.props.localevents.map(
                                event => (
                                    <div className="stretchedevent" key={event.id}>
                                        <div className="inline">
                                            <div className="day"> {event.event_time.split('-')[2].substring(0,2)} </div>
                                            <div className="month"> {event.event_time.split('-')[1]} </div>
                                        </div>
                                        <h3 className="blue inline">{this.state.name}</h3>
                                        <p className="inline">{event.venue_name}, {event.town}</p>
                                        <div>
                                            <button className="btn inline" >Get Tickets</button>
                                        </div>
                                    </div>
                                )
                            )}
                            <h1>Other events</h1>
                            { this.props.otherevents.map(
                                event => (
                                    <div className="stretchedevent line" key={event.id}>
                                        <div className="inline">
                                            <div className="day"> {event.event_time.split('-')[2].substring(0,2)} </div>
                                            <div className="month"> {event.event_time.split('-')[1]} </div>
                                        </div>
                                        <h3 className="blue inline extrapadding">{this.state.name}</h3>
                                        <p className="inline">{event.venue_name}, {event.town}, {event.country}</p>
                                        <div>
                                            <button className="btn inline" >Get Tickets</button>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>


                </div>
            );
        }


    }
}
const mapStateToProps = function(state) {
    return {
        userInfo: state.user_info,
        loaction: state.location,
        otherevents: state.author_specific_events && state.author_specific_events.data.filter(
            event => event.town != state.user_info.data.city
        ),
        localevents: state.author_specific_events && state.author_specific_events.data.filter(
            event => event.town == state.user_info.data.city
        )
    };
};

export default connect(mapStateToProps)(Author);
