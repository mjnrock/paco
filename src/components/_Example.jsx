import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
export default class Example extends Component {
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