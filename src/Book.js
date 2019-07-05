import React, { Component } from "react";
import "./App.css";

class Book extends Component {


    render(props) {
        console.log('book props ', props)
        return (
            <div>
                <img src={this.props.cover}></img>
                <p>{this.props.title}</p>
            </div>
        )
    }

}

export default Book;