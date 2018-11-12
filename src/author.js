import React from 'react';
import { connect } from 'react-redux';
import { getAuthorEventById } from './actions';
import axios from './axios';

class Author extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("mounted");
        const authorId = this.props.match.params.id;
        console.log("authorID: ", authorId);
        axios.get('/getauthorbyid.json/' + authorId)
            .then((data) => {
                console.log(data);
                this.setState({
                    name: data.data.data.name,
                    imgurl: data.data.data.author_pic_url
                });
                this.props.dispatch(getAuthorEventById(authorId));
                axios.get('/getauthorbooks.json/' + authorId)
                    .then((data) => {
                        console.log("BOOKS!: ", data);
                        this.setState({
                            books: data.data.book,
                        });
                    }).catch(err => { console.log(err); });

            }).catch(err => { console.log(err); });
    }

    render() {
        if (!this.state.name) {
            return null;
        }
        if (!this.props.otherevents) {
            return (
                <div className="main-container-flex">
                    <div className="author-profile">
                        <h1>{this.state.name}</h1>
                        <img src={this.state.imgurl} alt={this.state.name}/>
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
                        <img src={this.state.imgurl} alt={this.state.name}/>
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
                                        <p className="inline">{event.venue_name}</p>
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
                                        <p className="inline">{event.venue_name}</p>
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
            return (
                <div className="main-container-flex">
                    <div className="author-profile">
                        <h1>{this.state.name}</h1>
                        <img src={this.state.imgurl} alt={this.state.name}/>
                        <h2>Books:</h2>
                        <div className="books">
                            { this.state.books.map(
                                book => (
                                    <div className="book" key={book.isbn}>

                                        <h3 className="blue">{book.title_without_series}</h3>
                                        <a href={book.link}>
                                            <img className="inline" src={book.image_url} alt={book.title_without_series}/>
                                        </a>

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
                                        <p className="inline">{event.venue_name}</p>
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
                                        <p className="inline">{event.venue_name}</p>
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
