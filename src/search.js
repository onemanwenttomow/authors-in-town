import React from 'react';
import { connect } from 'react-redux';
import { } from './actions';
import axios from './axios';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSearchInput = this.handleSearchInput.bind(this);
    }
    componentDidMount() {
        console.log("search mounted");

    }

    handleSearchInput(e) {
        let query = e.target.value;

        axios.get('/search.json/' + query)
            .then(data => {
                console.log("search results: ", data);
                this.setState({ searchResultsArr: data.data.data });
            }).catch(err => { console.log(err); });
    }

    render() {
        console.log(this.state.searchResultsArr);
        if (this.state.searchResultsArr == undefined || this.state.searchResultsArr == 'no results' ) {
            return (
                <div className="search-container">
                    <div className="search-bar">
                        <i className="fas fa-search search-icon"></i>
                        <input type="text" id="main-search" onChange={ this.handleSearchInput }></input>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="search-container">
                    <div className="search-bar">
                        <i className="fas fa-search search-icon"></i>
                        <input type="text" id="main-search" onChange={ this.handleSearchInput }></input>
                    </div>
                    <div className="search-results">
                        { this.state.searchResultsArr.map(
                            result => (
                                <div className="single-search-result" key={result.goodreads_id}>
                                    <a href={`/author/${result.goodreads_id}`} >
                                        <div>
                                            <img className="search-results-image" src={result.author_pic_url} alt={result.name}/>
                                            <h3 className="blue authorname inline search-name">{result.name}</h3>
                                        </div>
                                    </a>
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

export default connect(mapStateToProps)(Search);
