import React from 'react';
import { connect } from 'react-redux';
import { getAuthorEventById } from './actions';
import axios from './axios';

class AuthorPageEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("authorpageevents mounted");
        let authorId = this.props.authorId;
        axios.get('/getauthorbyid.json/' + authorId)
            .then((data) => {
                this.setState({
                    name: data.data.data.name,
                    imgurl: data.data.data.author_pic_url
                });
                this.props.dispatch(getAuthorEventById(authorId));
            }).catch(err => { console.log(err); });
    }

    render() {
        console.log("props in author page events: ", this.props);
    
        if (this.props.otherevents) {
            return (
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

export default connect(mapStateToProps)(AuthorPageEvents);
