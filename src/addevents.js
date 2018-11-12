import React from 'react';
import { connect } from 'react-redux';
import { getUserEvents } from './actions';
import axios from './axios';

let name, goodreadsid, eventname, venue, town, country, eventtime;

class AddEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitDisabled: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.addevent = this.addevent.bind(this);
    }
    componentDidMount() {
        console.log("mounted!!");
        this.props.dispatch(getUserEvents());
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
        console.log(this[e.target.name]);
        name = this.name;
        goodreadsid = this.goodreadsid;
        eventname = this.eventname;
        venue = this.venue;
        town = this.town;
        country = this.country;
        eventtime = this.eventtime;
        if (!eventtime) {
            this.setState({
                isSubmitDisabled: true
            });
        } else {
            this.setState({
                isSubmitDisabled: false
            });
        }
    }
    addevent() {
        axios.post('/addevent.json', {
            name: name,
            goodreadsid: goodreadsid,
            eventname: eventname,
            venue: venue,
            town: town,
            country: country,
            eventtime: eventtime
        })
            .then(data => {
                console.log(data);
                document.getElementById('name').value = '';
                document.getElementById('goodreadsid').value = '';
                document.getElementById('eventname').value = '';
                document.getElementById('venue').value = '';
                document.getElementById('town').value = '';
                document.getElementById('country').value = '';
                this.props.dispatch(getUserEvents());
            });
    }
    deleteEvent(id) {
        console.log(id);
        axios.post('/deleteevent.json', {eventId: id})
            .then(() => {
                this.props.dispatch(getUserEvents());
            }).catch(err => {console.log(err); });
    }
    render() {
        console.log(this.props);
        if (!this.props.events) {
            return (
                <div className="main-container-flex">
                    <div>
                        <h2 className="">No Events added yet.</h2>
                        <p>Please use the form to add some events</p>
                    </div>
                    <div>
                        <h2 className="">Add an event</h2>
                        {this.state.error && <div className="error centre">Please try again, that email might be taken</div>}
                        <label>
                            Author Name:
                            <input className={this.state.failedFirstValidation} id="name" name="name" type="text" onChange={this.handleChange}/>
                        </ label>
                        <label>
                            GoodReads ID:
                            <input className={this.state.failedLastValidation} id="goodreadsid" name="goodreadsid" type="text" onChange={this.handleChange}/>
                        </ label>
                        <label>
                            Event Name:
                            <input className={this.state.failedPassValidation} id="eventname" name="eventname" onChange={this.handleChange}/>
                        </ label>
                        <label>
                            Venue Name:
                            <input className={this.state.failedValidation} id="venue" name="venue" onChange={this.handleChange}/>
                        </ label>
                        <label>
                            Town:
                            <input className={this.state.failedValidation} id="town" name="town" onChange={this.handleChange}/>
                        </ label>
                        <label>
                            Country:
                            <input className={this.state.failedValidation} id="country" name="country" onChange={this.handleChange}/>
                        </ label>
                        <label>
                            Date and Time:
                            <input type="datetime-local" id="eventtime"
                                name="eventtime" defaultValue="2018-11-12T19:30"
                                min="2018-11-07T00:00" max="2020-06-14T00:00"
                                onChange={this.handleChange}>
                            </input>
                        </ label>

                        <div className="postform">
                            <button className="btn" disabled={this.state.isSubmitDisabled} onClick={this.addevent}>Submit Event</button>
                        </div></div>

                </div>
            );
        } else {
            return (
                <div className="main-container-flex">
                    <div className="events-container">
                        <div className="events">
                            <h2 className="">Your Events</h2>
                            { this.props.events.data.map(
                                event => (
                                    <div className="event" key={event.id}>

                                        <div className="delete" onClick={e => this.deleteEvent(event.id)}>
                                            <i className="fas fa-minus-circle deleteicon"></i>
                                        </div>
                                        <img className="eventphoto" src={event.author_pic_url} alt={event.name}/>
                                        <div className="datebox">
                                            <div className="day"> {event.event_time.split('-')[2].substring(0,2)} </div>
                                            <div className="month"> {event.event_time.split('-')[1]} </div>
                                        </div>
                                        <h3 className="blue authorname">{event.name}</h3>
                                        <p className="eventlocation">{event.venue_name}</p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>


                    <div className="add-event-form">
                        <h2 className="add-a-event-title">Add an event</h2>
                        {this.state.error && <div className="error centre">Please try again, that email might be taken</div>}
                        <label>
                            Author Name:
                            <input className={this.state.failedFirstValidation} id="name" name="name" type="text" onChange={this.handleChange}/>
                        </ label>
                        <label>
                            GoodReads ID:
                            <input className={this.state.failedLastValidation} id="goodreadsid" name="goodreadsid" type="text" onChange={this.handleChange}/>
                        </ label>
                        <label>
                            Event Name:
                            <input className={this.state.failedPassValidation} id="eventname" name="eventname" onChange={this.handleChange}/>
                        </ label>
                        <label>
                            Venue Name:
                            <input className={this.state.failedValidation} id="venue" name="venue" onChange={this.handleChange}/>
                        </ label>
                        <label>
                            Town:
                            <input className={this.state.failedValidation} id="town" name="town" onChange={this.handleChange}/>
                        </ label>
                        <label>
                            Country:
                            <input className={this.state.failedValidation} id="country" name="country" onChange={this.handleChange}/>
                        </ label>
                        <label>
                            Date and Time:
                            <input type="datetime-local" id="eventtime"
                                name="eventtime" defaultValue="2018-11-12T19:30"
                                min="2018-11-07T00:00" max="2020-06-14T00:00"
                                onChange={this.handleChange}>
                            </input>
                        </ label>

                        <div className="postform">
                            <button className="btn" disabled={this.state.isSubmitDisabled} onClick={this.addevent}>Submit Event</button>
                        </div></div>

                </div>
            );
        }

    }
}


const mapStateToProps = function(state) {
    return {
        userInfo: state.user_info,
        loaction: state.location,
        events: state.author_events
    };
};

export default connect(mapStateToProps)(AddEvents);
