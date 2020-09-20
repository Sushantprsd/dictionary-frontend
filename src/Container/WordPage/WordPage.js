import React, { Component } from "react";
import classes from "./WordPage.module.css";
import { MdClose } from "react-icons/md";
import { IconContext } from "react-icons";
import { Backdrop, Button, CircularProgress } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import axios from "axios";

export class WordPage extends Component {
    state = {
        word: null,
        stateLoading: true,
    };

    componentDidMount() {
        let key = this.props.history.location.pathname.split("/").pop();
        this.setStateHandler(key);
    }

    gotTOHome = () => {
        this.props.history.push("/");
    };
    setStateHandler = (key) => {
        const URL = "https://dictionary-my.herokuapp.com/graphql/getOneWord";
        axios
            .post(URL, {
                query: `query{
                getOneWord(key:"${key}"){
                _id
                key
                lexicalEntries{
                  lexicalCategory
                  example
                  definition
                  origin
                }
              }
            }`,
            })
            .then((response) => {
                this.setState({ word: response.data.data.getOneWord, stateLoading: false });
            })
            .catch((err) => {
                this.gotTOHome();
            });
    };
    render() {
        let content = (
            <div className={classes.WordPage} style={{ padding: "0px" }}>
                <Backdrop open={true}>
                    <CircularProgress style={{ color: "#5d1b48" }} />
                </Backdrop>
            </div>
        );
        if (!this.state.stateLoading) {
            content = (
                <div className={classes.WordPage}>
                    <div className={classes.Close} onClick={this.gotTOHome}>
                        <Button style={{ borderRadius: "60%", height: "4rem", width: "3rem" }}>
                            <IconContext.Provider value={{ color: "#919191", size: "2.5rem" }}>
                                <MdClose />
                            </IconContext.Provider>
                        </Button>
                    </div>
                    <div className={classes.ResultsCards}>
                        <h1>{this.state.word.key.toLowerCase()}</h1>
                        {this.state.word.lexicalEntries.map((entry) => {
                            return (
                                <div key={entry.lexicalCategory} className={classes.Category}>
                                        <h1>{entry.lexicalCategory}</h1>
                                        {entry.origin !== "NA" ? <h2>Origin : {entry.origin}</h2> : null}
                                    {entry.definition !== "NA" ? <h3>{entry.definition}</h3> : null}
                                    {entry.example !== "NA" ? <ul><li>{entry.example}</li></ul> : null}
                                    

                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
        return content;
    }
}

export default withRouter(WordPage);
