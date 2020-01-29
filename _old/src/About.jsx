import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
class App extends Component {
    render() {
        // const { DifferentStore } = this.props.store;

        return (
            <div>
                About
                {/* <div>{ DifferentStore.text }</div> */}
            </div>
        );
    }
}

export default App;