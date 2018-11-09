import React from 'react';


export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("mounted!");
    }
    render () {
        return (
            <div>
                <h1>APP</h1>
                <a href="/logout">Logout</a>
            </div>
        );
    }
}
