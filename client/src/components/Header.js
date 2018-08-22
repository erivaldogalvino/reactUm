import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';
//import HeadTime from './HeadTime';
//import { debug } from 'util';


// here he use a extent of component for pratical reason
class Header extends Component {
/*    constructor(props) {
        super(props);

        subscribeToTimer((err, timestamp) => this.setState({ 
          timestamp 
        }));
      }
      state = {
        timestamp: 'no timestamp yet'
      };
*/
    renderContent() {
        switch (this.props.auth) {
            case null:
                return 'Still deciding';
            case false:
                return <li><a href="auth/google">Login With Google</a></li>;
            default:
                return [
                <li key="1"><Payments /></li>,
                <li key="3" style={{ margin: '0 10px' }}>
                    Credits: {this.props.auth.credits}
                </li>,
                <li key="2"><a href="/api/logout">Logout</a></li>
/*                <li key="3">{this.state.timestamp}</li> */
            ];
        }
    }
    render() {
        // console.log(this.props); // to verify
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                    to={this.props.auth ? '/surveys' : '/' }
                    className="left brand-logo"
                    >
                        Emaily
                    </Link>
 
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth }; // state.auth
}

export default connect(mapStateToProps)(Header);


/*<div> < HeadTime /> </div> */