import React, { Component } from 'react';  // we are making use of webpack in babbel 
                        // which gives us very easy access to es2015
import { BrowserRouter, Route } from 'react-router-dom'; // navigate in the DOM object
import { connect } from 'react-redux';
import * as actions from '../actions';


import  Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

//const Dashboard = () => <h2>Dashboard</h2>;
//const SurveyNew = () => <h2>SurveyNew</h2>;
//const Landing = () => <h2>Landing</h2>;



//const App = () => {
class App extends Component {
    
    componentDidMount() {
         this.props.fetchUser();  // from ../actions [../actions/index.js]
    }
    render () {
        return (
        <div className="container">
           <BrowserRouter>
            <div>
                <Header />
                <Route exact path="/" component={Landing} />
                <Route exact path="/surveys" component={Dashboard} />
                <Route path="/surveys/new" component={SurveyNew} />
            </div>
           </BrowserRouter>
        </div>
    );
}
};

export default connect(null, actions)(App);
