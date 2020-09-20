import React from "react";
import "./App.css";
import HomePage from "./Container/HomePage/HomePage";
import Layout from "./hoc/Layout/Layout";
import { Switch, Route, Redirect, withRouter } from "react-router";
import WordPage from "./Container/WordPage/WordPage";

function App() {
    let route = (
        <Switch>
            <Route path="/page/:pageId" exact component={WordPage} />
            <Route path="/" exact component={HomePage} />
            <Redirect to="/" />
        </Switch>
    );
    return (
        <div className="App">
            <Layout>{route}</Layout>
        </div>
    );
}

export default withRouter(App);
