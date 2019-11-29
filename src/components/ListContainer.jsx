import React, { Component } from "react";

export default class ListContainer extends Component {
    render() {
        return (
            <div className={ `container mt2 ${ this.props.className }` }>
                {
                    this.props.children
                }
            </div>
        );
    }
};