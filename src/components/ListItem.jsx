import React, { Component } from "react";

export default class ListItem extends Component {
    render() {
        return (
            <li className={ `list-group-item ${ this.props.className }` }>
                <span>{ this.props.value }</span>
                <button
                    className="btn btn-danger float-right"
                >X</button>
            </li>
        );
    }
};