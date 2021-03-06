import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo, getAllEvents, getAllEventsByCountry, getMoreEvents } from './actions';

class AllEventsOutsideOfCountry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highlighted: '',
            moreButtonDisabled: false
        };
        this.countryClick = this.countryClick.bind(this);
        this.getallcountries = this.getallcountries.bind(this);
        this.getMoreImages = this.getMoreImages.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(getUserInfo());
        this.props.dispatch(getAllEvents());
        window.scrollTo(0, 0);

    }
    countryClick(e) {
        console.log("clicked on: ", e);
        this.props.dispatch(getAllEventsByCountry(e));
        this.setState({
            highlighted: 'countryhighlighted'
        });
    }

    getallcountries() {
        this.props.dispatch(getAllEvents());
        this.setState({
            highlighted: ''
        });
    }

    getMoreImages() {

        if (this.props.allevents.length == 0) {
            this.setState({
                moreButtonDisabled: true
            });
            return;
        } else {
            let sortedArr = this.props.allevents.sort((a,b) => (a.event_time > b.event_time) ? 1 : ((b.event_time > a.event_time) ? -1 : 0));
            console.log(sortedArr[this.props.allevents.length - 1].id);
            console.log("ARRAY!!!!!!: ", this.props.allevents);
            this.props.dispatch(getMoreEvents(sortedArr[this.props.allevents.length - 1].id));
        }
    }

    render() {
        if (!this.props.userInfo) {
            return null;
        }
        if (!this.props.allevents) {
            return null;
        }
        return (
            <div className="main-container-flex-around">
                <div className="alleventsarea">
                    <div className="allevents-cont">
                        <h1 onClick={this.getallcountries}>Events outside of {this.props.userInfo.data.country}</h1>
                        <span onClick={this.getallcountries} className="darkblue countries">All Countries | </span>
                        <div className="allcountries inline">
                            { this.props.countries.map(
                                event => (
                                    <span id={this.state.highlighted} onClick={e => this.countryClick(event.country)} className={`"darkblue countries ${this.state.highlighted}"`} key={event.id}>{event.country} | </span>
                                )
                            )}
                        </div>

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
                                            <h3 className="blue inline extrapadding">{event.name}&nbsp; </h3>
                                            <p className="inline">{event.venue_name}, {event.town}</p>
                                        </div>
                                    </Link>

                                    <div>
                                        <button className="btn inline" >Get Tickets</button>
                                    </div>


                                </div>
                            )
                        )}
                        <button disabled={this.state.moreButtonDisabled} onClick={this.getMoreImages} className="btn inline" >Get More</button>
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
                    event.town != state.user_info.data.city && event.country != state.user_info.data.country
            )
            .filter(
                (thing, index, self) =>
                    index === self.findIndex((t) => (
                        t.goodreads_id === thing.goodreads_id
                    ))
            ),
        countries: state.all_events && state.all_events
            .filter(
                event => event.town != state.user_info.data.city && event.country != state.user_info.data.country
            )
            .filter(
                (thing, index, self) =>
                    index === self.findIndex((t) => (
                        t.country === thing.country
                    ))),
    };
};

export default connect(mapStateToProps)(AllEventsOutsideOfCountry);
