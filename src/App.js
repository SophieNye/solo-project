import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.css";
import Book from './Book';

const GoodreadsPage = (props) => {
    return (
        <div>
            <ul>

            </ul>
        </div>
    )
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hello: 'Bookshelf'
        };
        // this.renderBooks = this.renderBooks.bind(this);
    }

    // renderBooks(e) {
    //     e.preventDefault()
    //     fetch('./auth/goodreads', { method: 'GET', host: 'http://localhost:8080/', headers: { accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3', 'upgrade-insecure-requests': '1' } })
    //         .then(result => result.json())
    //         .then(json => (console.log(json)))
    // }

    render() {
        return (
            // { bookDataReceived &&
            // <GoodreadsPage books={this.props.books} />
            // }
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