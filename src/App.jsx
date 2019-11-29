import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import Components from "./components/package";

@inject("store")
@observer
class App extends Component {
    componentWillMount() {
        const { ExampleStore } = this.props.store;

        // let list1 = ExampleStore.AddList("List 1"),
        //     list2 = ExampleStore.AddList("List 2");

        // list1.AddItem("This is a task", 0);
        // list1.AddItem("This is a second task", 1);

        // list2.AddItem("I am a task", 0);
    }

    render() {
        const { ExampleStore } = this.props.store;

        return (
            <div
                className="container"
            >
               
            </div>
        );
    }
}

export default App;