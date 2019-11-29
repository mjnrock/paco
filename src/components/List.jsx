import React, { Component } from "react";

export default class List extends Component {
    render() {
        return (
            <div className={ `container mt2 ${ this.props.className }` }>
                <h3>{ this.props.title }</h3>
                <hr />
                <ul className="list-group">
                    {
                        this.props.children
                    }
                </ul>
            </div>
        );
    }
};