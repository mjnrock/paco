import React, { Component } from "react";

export default class ListGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCollapsed: false
        };
    }
    render() {
        return (
            <div
                className={ `container mt2 ${ this.props.className }` }
                style={{
                    backgroundColor: this.state.isCollapsed ? "#fff" : "#ccc",
                }}
            >
                <div
                    onClick={ (e) => {
                        this.setState({
                            isCollapsed: !this.state.isCollapsed
                        })
                    }}
                >
                    <h3>{ this.props.title }</h3>
                    <div
                        className="float-right"
                    >
                        {
                            this.state.isCollapsed ? (
                                <i className="material-icons">remove</i>
                            ) : (
                                <i className="material-icons">add</i>
                            )
                        }
                    </div>
                    <br/>
                </div>
                <div
                    style={{
                        display: this.state.isCollapsed ? "inline" : "none",
                    }}
                >
                    {
                        this.props.children
                    }
                </div>
            </div>
        );
    }
};