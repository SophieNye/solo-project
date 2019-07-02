import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.css";
import Book from './Book';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hello: 'world'
        };
    }

    renderBooks() {

    }

    render() {
        return (
            <div className="App">
                <Book hello={this.state.hello} />
            </div>
        );
    }
}

export default App;