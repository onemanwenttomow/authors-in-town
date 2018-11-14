import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo, getEventsForUser } from './actions';
import axios from './axios';

class AllEventsOutsideOfCountry extends React.Component {
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
        console.log("PROPS!!: ", this.props);
        if (!this.props.userEvents) {
            return null;
        }
        return (
            <div className="main-container-flex-around">
                <div className="alleventsarea">
                    <div>
                        <h1>Events outside of {this.props.userInfo.data.country}</h1>
                        { this.props.otherevents.map(
                            event => (
                                <div className="stretchedevent line" key={event.id}>


                                    <div>
                                        <img className="alleventsphoto" src={event.author_pic_url} alt={event.name}/>
                                        <div className="inline alleventsdate">
                                            <div className="day"> {event.event_time.split('-')[2].substring(0,2)} </div>
                                            <div className="month"> {event.event_time.split('-')[1]} </div>
                                        </div>

                                    </div>
                                    <Link to={`/author/${event.goodreads_id}`} >
                                        <div className="alleventslocation">
                                            <h3 className="blue inline extrapadding">{event.country}&nbsp; </h3>
                                            <p className="inline">{event.venue_name}, {event.town}</p>
                                        </div>
                                    </Link>

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
        ).reverse().filter(
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

export default connect(mapStateToProps)(AllEventsOutsideOfCountry);
