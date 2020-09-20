import React from "react";
import "./App.css";
import HomePage from "./Container/HomePage/HomePage";
import Layout from "./hoc/Layout/Layout";

function App() {
    return (
        <div className="App">
            <Layout><HomePage/></Layout>
        </div>
    );
}

export default App;
