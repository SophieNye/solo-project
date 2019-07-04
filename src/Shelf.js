import React, { Component } from "react";
import "./App.css";
import Book from './Book'
import ReactDOM from "react-dom";

class Shelf extends Component {

    constructor(props) {
        super(props),
            this.state = {
                'books': []
            }

        this.renderBooks = this.renderBooks.bind(this)
    }

    renderBooks() {
        fetch('./getmybooks')
            .then(result = result.json())
            .then(json => this.setState({ books: json }))
            .then(console.log(this.state))
    }

    render() {
        console.log('this page is working')
        return (
            <div>
                <button onClick={this.renderBooks}>Get my books</button>
                <Book />
            </div>
        )
    }

}

export default Shelf;