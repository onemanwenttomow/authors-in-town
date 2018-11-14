import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo, addLocation, getEventsForUser } from './actions';
import axios from './axios';
import GetFavAuthors from './getfavauthors';
import AddEvents from './addevents';


class MainEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.dispatch(getUserInfo());
        this.props.dispatch(getEventsForUser());
    }

    render() {
        if (!this.props.userInfo) {
            return null;
        }
        if (this.props.userInfo.data.author) {
            return (
                <AddEvents />
            );
        }
        if (this.props.userInfo.data.approvedgoodreads == false) {
            return (
                <GetFavAuthors />
            );
        }
        console.log("PROPS!!: ", this.props);
        if (!this.props.userEvents) {
            return null;
        }



        return (
            <div className="main-container">
                <h2>Events by Authors you like near <span className="blue">{this.props.userInfo.data.city}, {this.props.userInfo.data.country}</span></h2>
                <div className="main-events-container">
                    { this.props.localevents.map(
                        event => (
                            <div className="event" key={event.id}>
                                <Link to={`/author/${event.goodreads_id}`} >
                                    <div>
                                        <img className="eventphoto" src={event.author_pic_url} alt={event.name}/>
                                        <div className="datebox">
                                            <div className="day"> {event.event_time.split('-')[2].substring(0,2)} </div>
                                            <div className="month"> {event.event_time.split('-')[1]} </div>
                                        </div>
                                        <h3 className="blue authorname">{event.name}</h3>
                                        <p className="eventlocation">{event.venue_name}</p>
                                    </div>
                                </Link>
                            </div>
                        )
                    )}
                </div>
                <h2>Events by Authors you like in <span className="blue">{this.props.userInfo.data.country}</span> outside of  <span className="blue">{this.props.userInfo.data.city}</span></h2>
                <div className="main-events-container">
                    { this.props.countryEvents.map(
                        event => (
                            <div className="event" key={event.id}>
                                <Link to={`/author/${event.goodreads_id}`} >
                                    <div>
                                        <img className="eventphoto" src={event.author_pic_url} alt={event.name}/>
                                        <div className="datebox">
                                            <div className="day"> {event.event_time.split('-')[2].substring(0,2)} </div>
                                            <div className="month"> {event.event_time.split('-')[1]} </div>
                                        </div>
                                        <h3 className="blue authorname">{event.name}</h3>
                                        <p className="eventlocation">{event.venue_name}</p>
                                    </div>
                                </Link>

                            </div>
                        )
                    )}
                </div>
                <h2>Events by Authors you like in outside of <span className="blue">{this.props.userInfo.data.country}</span></h2>
                <div className="main-events-container">
                    { this.props.otherevents.map(
                        event => (
                            <div className="event" key={event.id}>
                                <Link to={`/author/${event.goodreads_id}`} >
                                    <div>
                                        <img className="eventphoto" src={event.author_pic_url} alt={event.name}/>
                                        <div className="datebox">
                                            <div className="day"> {event.event_time.split('-')[2].substring(0,2)} </div>
                                            <div className="month"> {event.event_time.split('-')[1]} </div>
                                        </div>
                                        <h3 className="blue authorname">{event.name}</h3>
                                        <p className="eventlocation">{event.venue_name}</p>
                                    </div>
                                </Link>

                            </div>
                        )
                    )}
                </div>

            </div>

        );
    }
}


const mapStateToProps = function(state) {
    return {
        userInfo: state.user_info,
        loaction: state.location,
        userEvents: state.user_events,
        countryEvents: state.user_events && state.user_events.filter(
            event => event.country == state.user_info.data.country && event.town != state.user_info.data.city
        ).reverse().filter(
            (thing, index, self) =>
                index === self.findIndex((t) => (
                    t.goodreads_id === thing.goodreads_id
                ))
        ),
        otherevents: state.user_events && state.user_events.filter(
            event => event.town != state.user_info.data.city && event.country != state.user_info.data.country
        ).reverse().slice(0,12).filter(
            (thing, index, self) =>
                index === self.findIndex((t) => (
                    t.goodreads_id === thing.goodreads_id
                ))
        ),
        localevents: state.user_events && state.user_events.filter(
            event => event.town == state.user_info.data.city
        )
    };
};

export default connect(mapStateToProps)(MainEvents);
