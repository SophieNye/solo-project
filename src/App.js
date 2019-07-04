import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.css";
import Book from './Book';
import { Route, Link, BrowserRouter as Router, Redirect } from "react-router-dom";


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
            <div className="App">
                <Book hello={this.state.hello} />
                <form method="get" action="./auth/goodreads">
                    <button type="submit">Login with Goodreads</button>
                </form>
            </div>
        );
    }
}

export default App;