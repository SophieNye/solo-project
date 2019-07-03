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
        this.renderBooks = this.renderBooks.bind(this);
    }

    renderBooks() {
        fetch('./auth/goodreads')
            .then(result => console.log(result))
    }

    render() {
        return (
            { bookDataReceived &&
            <GoodreadsPage books={this.props.books} />
            }
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