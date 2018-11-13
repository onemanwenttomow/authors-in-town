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
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
                    .then(data => {
                        let locationData = {
                            city: data.data.address.city,
                            country: data.data.address.country
                        };
                        this.props.dispatch(addLocation(locationData));
                        axios.post('/updatelocation.json', (locationData))
                            .then(() => {
                            }).catch(err => { console.log(err); });
                    }).catch(err => { console.log(err); });
            });
        } else {
            return;
        }
    }
    render() {
        if (!this.props.userInfo) {
            return null;
        }
        console.log("PROPS TO CHECK:", this.props);
        if (this.props.userInfo.data.author) {
            return (
                <AddEvents />
            );
        }

        if (this.props.userInfo.data.approvedgoodreads) {
            if (this.props.loaction) {
                return (
                    <div className="main-container">
                        <h2>Events by Authors you like near <span className="blue">{this.props.loaction.city}, {this.props.loaction.country}</span></h2>
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
                        <h2>Events by Authors you like outside of  <span className="blue">{this.props.loaction.city}</span></h2>
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
            } else {
                return (
                    <div className="main-container">
                        <h2>Popular Events Near <span className="blue">{this.props.userInfo.data.city}, {this.props.userInfo.data.country}</span></h2>
                    </div>
                );
            }
        } else {
            return (
                <GetFavAuthors />

            );
        }


    }
}


const mapStateToProps = function(state) {
    return {
        userInfo: state.user_info,
        loaction: state.location,
        userEvents: state.user_events,
        otherevents: state.user_events && state.user_events.filter(
            event => event.town != state.user_info.data.city
        ).reverse(),
        localevents: state.user_events && state.user_events.filter(
            event => event.town == state.user_info.data.city
        )
    };
};

export default connect(mapStateToProps)(MainEvents);
