import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.css";
import Book from './Book';
import { Route, Link, BrowserRouter as Router, Redirect } from "react-router-dom";

const Login = () => {
    return (
        <div className="App">
            <form method="get" action="./auth/goodreads">
                <button type="submit">Login with Goodreads</button>
            </form>
        </div>
    )
}

export default Login;