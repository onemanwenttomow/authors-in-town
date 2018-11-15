import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo, getEventsForUser, getAllEvents, getAllEventsByCountry } from './actions';

class AllEventsInCountry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.dispatch(getUserInfo());
        // this.props.dispatch(getEventsForUser());
        this.props.dispatch(getAllEvents());
        window.scrollTo(0, 0);

    }

    render() {
        if (!this.props.userInfo) {
            return null;
        }
        console.log("PROPS!!: ", this.props);
        if (!this.props.allevents) {
            return null;
        }
        console.log("STATE!!: ", this.state);
        return (
            <div className="main-container-flex-around">
                <div className="alleventsarea">
                    <div>
                        <h1>Events in the rest of {this.props.userInfo.data.country} (not {this.props.userInfo.data.city} )</h1>
                        { this.props.allevents.map(
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
        allevents: state.all_events && state.all_events
            .filter(
                event =>
                    event.town != state.user_info.data.city && event.country == state.user_info.data.country
            ).reverse()
            .filter(
                (thing, index, self) =>
                    index === self.findIndex((t) => (
                        t.goodreads_id === thing.goodreads_id
                    ))
            )
    };
};

export default connect(mapStateToProps)(AllEventsInCountry);
