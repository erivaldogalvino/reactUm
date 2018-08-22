/*
import React, { Component } from 'react';
import { subscribeToTimer } from '../api';

class HeadTime extends Component {
    constructor(props) {
        super(props);

        subscribeToTimer((err, timestamp) => this.setState({ 
            timestamp 
        }));

    }

    state = {
        timestamp: 'no timestamp yet'
    };

    render() {
    // console.log(this.props); // to verify
        return (
            <p> {this.state.timestamp} </p>
        );
    }
}

export default HeadTime;

*/