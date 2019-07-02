import React, { Component } from "react";
import "./App.css";

class Book extends Component {


    render(props) {
        return (
            <div>
                {this.props.hello}
            </div>
        )
    }

}

export default Book;