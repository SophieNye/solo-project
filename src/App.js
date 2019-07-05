import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.css";
import Shelf from './Shelf';
import { Route, Link, BrowserRouter as Router, Redirect } from "react-router-dom";
import Login from './Login'



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hello: 'Bookshelf',
            books: []
        };
        this.renderBooks = this.renderBooks.bind(this);
    }

    renderBooks(e) {
        e.preventDefault()
        fetch('./getmybooks')
            .then(result => result.json())
            .then(json => (console.log(json)))
    }

    render() {

        return (
            <Router>
                <Route exact path="/" component={Login} />
                <Route path="/bookshelf" component={Shelf} />
            </Router>
        );
    }
}



export default App;