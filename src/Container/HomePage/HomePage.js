import React, { Component } from "react";
import classes from "./HomePage.module.css";
import TextField from "@material-ui/core/TextField";
import { MdSearch, MdClose, MdAdd } from "react-icons/md";
import { IconContext } from "react-icons";
import { Button, CircularProgress } from "@material-ui/core";
import Backdrop from "../../Components/BackDrop/Backdrop";
import * as actions from "../../Store/actions/index";
import { connect } from "react-redux";

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
        this.setState({ word: event.target.value });
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
        this.props.resetWordAdded();
    };
    closeBackdrop = () => {
        this.setState({ showAddModal: false, word: " " });
    };

    addWordInputHandler = (event) => {
        if (this.state.word.length < 2) {
            this.setState({ word: event.target.value, wordNotValid: true });
        } else {
            this.setState({ word: event.target.value, wordNotValid: false });
        }
    };

    addWord = () => {
        if (this.state.wordNotValid) {
        } else {
            this.props.addWord(this.state.word);
        }
    };

    render() {
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
                            <Button style={ButtonSetStyle} onClick={this.closeBackdrop}>
                                Cancel
                            </Button>
                            {this.props.word.addWordLoading ? (
                                <Button disabled={true}>
                                    <CircularProgress style={{ color: "#5d1b48" }} />
                                </Button>
                            ) : (
                                <Button style={ButtonSetStyle} onClick={this.addWord}>
                                    Add
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className={classes.HomePage}>
                {icon}
                <div className={classes.Results}>
                    <div className={classes.ResultsTitle}>
                        <h5>Word List</h5>
                    </div>
                    <div className={classes.AllResults}>
                        <div>
                            {this.props.word.wordsList.map((word) => {
                                return (
                                    <Button className={classes.ResultsCards}>
                                        <h1>{word.key}</h1>
                                        {word.lexicalEntries.map((entry) => {
                                            return (
                                                <div>
                                                    <h4>
                                                        ({entry.lexicalCategory}){entry.definition}
                                                    </h4>
                                                </div>
                                            );
                                        })}
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
// {!this.props.word.addWordError ? null : <div className={classes.errorDiv}>{this.props.word.addWordError.message}</div>}
//