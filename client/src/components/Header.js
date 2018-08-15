import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';


// here he use a extent of component for pratical reason
class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return 'Still deciding';
            case false:
                return <li><a href="auth/google">Login With Google</a></li>;
            default:
                return [
                <li><Payments /></li>,
                <li><a href="/api/logout">Logout</a></li>
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
