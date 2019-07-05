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

    }

    componentDidMount() {
        fetch('http://localhost:3000/getmybooks')
            .then(response => response.json())
            .then(json => {
                console.log('state json ', json)
                console.log('in set state function')
                this.setState({ books: json.bookArray })
            })
            .then(console.log('state after fetch ', this.state.books))
    }


    render() {
        console.log('this page is working')
        const books = this.state.books
        const bookArr = []
        for (let i = 0; i < books.length; i++) {
            bookArr.push(<Book cover={books[i].image_url} title={books[i].title} key={i} />)
        }
        return (
            <div className="Shelf">
                <h1 className="title">Bookshelf</h1>
                {bookArr}
            </div>
        )
    }

}

export default Shelf;