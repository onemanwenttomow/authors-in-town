import React from 'react';
import { connect } from 'react-redux';
import { getUserInfo, addLocation } from './actions';
import axios from './axios';
import GetFavAuthors from './getfavauthors';


class MainEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.dispatch(getUserInfo());
        console.log(this.props);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log("GEO!:", position.coords.latitude, position.coords.longitude);
                axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
                    .then(data => {
                        console.log("data back from axios location", data.data);
                        let locationData = {
                            city: data.data.address.city,
                            country: data.data.address.country
                        };
                        this.props.dispatch(addLocation(locationData));
                        axios.post('/updatelocation.json', (locationData))
                            .then(data => {
                                console.log(data);
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
        if (this.props.userInfo.data.approvedgoodreads) {
            if (this.props.loaction) {
                return (
                    <div className="main-container">
                        <h2>Popular Events Near <span className="blue">{this.props.loaction.city}, {this.props.loaction.country}</span></h2>
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
        loaction: state.location
    };
};

export default connect(mapStateToProps)(MainEvents);
