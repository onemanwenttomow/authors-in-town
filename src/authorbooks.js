import React from 'react';
import { connect } from 'react-redux';
import axios from './axios';

class AuthorBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("mounted");
        let authorId = this.props.authorId;
        axios.get('/getauthorbooks.json/' + authorId)
            .then((data) => {
                console.log("BOOKS!!! FROM COMP: ", data);
                this.setState({ books: data.data });
            }).catch(err => { console.log(err); });
    }

    render() {
        if (!this.state.books) {
            return null;
        }
        if (this.state.books) {
            return (
                <React.Fragment>
                    <h2>Books:</h2>
                    <div className="books">
                        { this.state.books.map(
                            book => (
                                <div className="book" key={book.id._}>

                                    <a href={book.link}>
                                        <img className="bookimage inline" src={book.image_url} alt={book.title_without_series}/>
                                    </a>
                                    <h5 className="blue">{book.title_without_series}</h5>

                                </div>
                            )
                        )}
                    </div>
                </React.Fragment>

            );
        }
    }
}
const mapStateToProps = function(state) {
    return {
        userInfo: state.user_info
    };
};

export default connect(mapStateToProps)(AuthorBooks);
