import React, { Component } from "react";
import "./App.css";
import "./Book.css";
import Draggable from 'react-draggable'

class Book extends Component {


    render(props) {
        console.log('book props ', props)
        return (
            <Draggable
                axis="x"
                handle=".handle"
                defaultPosition={{ x: 0, y: 0 }}
                position={null}
                grid={[25, 25]}
                scale={1}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}>
                <div className="book">
                    <img src={this.props.cover}></img>
                    <p>{this.props.title}</p>
                </div>
            </Draggable>
        )
    }

}

export default Book;