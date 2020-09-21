import React, { Component } from "react";
import classes from "./HomePage.module.css";
import TextField from "@material-ui/core/TextField";
import { MdSearch, MdClose, MdAdd } from "react-icons/md";
import { IconContext } from "react-icons";
import { Button, CircularProgress } from "@material-ui/core";
import Backdrop from "../../Components/BackDrop/Backdrop";
import * as actions from "../../Store/actions/index";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class HomePage extends Component {
    state = {
        word: "",
        inputFocused: true,
        addButtonClicked: false,
        showBackdrop: true,
        showAddModal: false,
        wordNotValid: true,
        dialogueBox: null,
    };
    componentDidMount() {
        this.props.fetchWord();
    }

    changeHandler = (event) => {
        event.preventDefault();

        this.setState({ word: event.target.value.trim(" ") }, () => {
            this.props.fetchSelectedWord(this.state.word);
        });
    };
    inputFocusHandler = () => {
        let newInputFocused = !this.state.inputFocused;
        if (!this.state.inputFocused) {
            this.setState({ inputFocused: newInputFocused, word: "" });
        } else {
            this.setState({ inputFocused: newInputFocused });
        }
    };
    addEventHandler = (event) => {
        event.preventDefault();
        this.setState({ showAddModal: true });
    };
    closeBackdrop = () => {
        this.setState({ showAddModal: false, word: " " });
        this.props.resetWordAdded();
    };

    addWordInputHandler = (event) => {
        if (this.state.word.length < 2) {
            this.setState({ word: event.target.value, wordNotValid: true });
        } else {
            this.setState({ word: event.target.value, wordNotValid: false });
        }
    };

    addWord = () => {
   
            this.props.addWord(this.state.word);
    };

    goToWord = (key) => {
        this.props.history.push(`/page/${key}`);
    };

    render() {
        if (this.props.word.wordAdded) {
            this.closeBackdrop();
            this.props.fetchWord();
        }
        const ButtonSetStyle = {
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: "400",
            marginLeft: "0.4rem",
            fontSize: "17px",
            lineHeight: "21px",
            color: "#800080",
        };
        let icon = (
            <div className={classes.Search}>
                <TextField
                    id="standard-multiline-flexible"
                    rowsMax={5}
                    value={this.state.word}
                    type="text"
                    style={{ width: "80%" }}
                    InputProps={{ disableUnderline: true, className: classes.SearchBar, placeholder: "Search" }}
                    onChange={(event) => this.changeHandler(event)}
                />
                <span className={classes.Icon} onClick={this.inputFocusHandler}>
                    <IconContext.Provider value={{ color: "#ffffff", size: "2.5rem" }}>
                        <MdClose />
                    </IconContext.Provider>
                </span>
            </div>
        );
        if (this.state.inputFocused) {
            icon = (
                <div className={classes.Search}>
                    <div className={classes.SearchBar} onClick={this.inputFocusHandler}></div>
                    <span className={classes.Icon} onClick={this.inputFocusHandler}>
                        <IconContext.Provider value={{ color: "#ffffff", size: "2.5rem" }}>
                            <MdSearch />
                        </IconContext.Provider>
                    </span>
                </div>
            );
        }

        let addModal = null;
        if (true) {
            addModal = (
                <div>
                    <Backdrop show={this.state.showAddModal} clicked={this.closeBackdrop} />
                    <div
                        className={classes.AddForm}
                        style={{
                            transform: this.state.showAddModal ? "translateY(0)" : "translateY(-100vh)",
                            opacity: this.state.showAddModal ? "1" : "0",
                        }}
                    >
                        <h1>Add to Dictionary</h1>
                        <h2>New Word</h2>
                        <input
                            type="text"
                            value={this.state.word}
                            className={classes.AddNewInput}
                            onChange={(event) => this.addWordInputHandler(event)}
                        />
                        <div className={classes.AddButtonSet}>
                            {this.props.word.error?<span className={classes.ErrorSpan}>{this.props.word.error.message}</span>:null}
                            <Button style={ButtonSetStyle} onClick={this.closeBackdrop}>
                                Cancel
                            </Button>
                            {this.props.word.addWordLoading ? (
                                <Button disabled={true}>
                                    <CircularProgress style={{ color: "#5d1b48" }} />
                                </Button>
                            ) : (
                                <Button style={ButtonSetStyle}  onClick={this.addWord}>
                                    Add
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            );
        }
        // let dialogueBox = (
        //     <div
        //         className={classes.Modal}
        //         // style={{
        //         //     transform: this.props.word.wordAdded ? "translateY(0)" : "translateY(-100vh)",
        //         //     opacity: this.props.word.wordAdded ? "1" : "0",
        //         // }}
        //     >
            
        //         {this.props.word.wordAdded?<h1> Word Added </h1>:null}

        //     </div>
        // );
        let loading = null;
        if (this.props.word.fetchWordLoading) {
            loading = (
                <div className={classes.LoadingBackdrop}>
                    <Backdrop show="true" />
                    <CircularProgress style={{ color: "#5d1b48" }} />
                </div>
            );
        }

        if (this.props.word.wordAdded) {
            this.closeBackdrop();
        }
        return (
            <div className={classes.HomePage}>
                {icon}
                {loading}
                <div className={classes.Results}>
                    <div className={classes.ResultsTitle}>
                        <h5>Word List</h5>
                    </div>
                    <div className={classes.AllResults}>
                        <div className={classes.ResultsContainer}>
                            {this.props.word.wordsList.map((word) => {
                                return (
                                    <Button
                                        key={word.key}
                                        onClick={(key) => this.goToWord(word.key)}
                                        style={{ margin: "0px", width: "100%", borderBottom: "2px solid #e9e9ed" }}
                                        className={classes.ResultButton}
                                    >
                                        <div className={classes.ResultsCards}>
                                            <h1>{word.key.toLowerCase()}</h1>
                                            {word.lexicalEntries.map((entry) => {
                                                return (
                                                    <div key={entry.lexicalCategory}>
                                                        <h4>
                                                            ({entry.lexicalCategory}) {entry.definition}
                                                        </h4>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                    <div className={classes.AddBubble} onClick={(event) => this.addEventHandler(event)}>
                        <Button className={classes.Add}>
                            <span className={classes.AddButton}>
                                <IconContext.Provider value={{ color: "#ffffff", size: "3rem" }}>
                                    <MdAdd />
                                </IconContext.Provider>
                            </span>
                        </Button>
                    </div>
                </div>
                {addModal}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        word: state.word,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addWord: (word) => dispatch(actions.addWord(word)),
        resetWordAdded: () => dispatch(actions.resetWordAdded()),
        fetchWord: () => dispatch(actions.fetchWord()),
        fetchSelectedWord: (key) => dispatch(actions.fetchSelectedWord(key)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
// {!this.props.word.addWordError ? null : <div className={classes.errorDiv}>{this.props.word.addWordError.message}</div>}
//
