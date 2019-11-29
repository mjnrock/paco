import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import Components from "./components/package";


import Decorators from "./lib/decorators";

class Test {}

//?  This assignment is the only reliable way to get on the instance and it is preserves "instanceof" usage
const a = Decorators.Events(Decorators.State(Decorators.UUID(new Test())));
const b = Decorators.Events(Decorators.State(Decorators.UUID(new Test())));

a.prop("cat", Math.random())
b.prop("cat", Math.random())
a.on("bob", Math.random())
b.on("bob", Math.random())

console.log(a instanceof Test);
console.log(b instanceof Test);

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
        const { OtherStore, ExampleStore } = this.props.store;

        console.log(OtherStore.state);
        console.log(ExampleStore.state);

        return (
            <div
                className="container"
            >
                <button
                    className="btn btn-success"
                    onClick={ () => {
                        a.prop("cat", Math.random())
                    }}
                >Click</button>
                <button
                    className="btn btn-danger"
                    onClick={ () => {
                        b.prop("cat", Math.random())
                    }}
                >Click</button>
                <button
                    className="btn btn-info"
                    onClick={ () => {
                        console.log("------------------")
                        console.log(a.state, a.events);
                        console.log(b.state, b.events);
                        console.log("------------------")
                    }}
                >Click</button>
                <span>{ ExampleStore.entity.Cat.Data.Fish }</span>  
                <span>{ ExampleStore.entity.Cat.Data.Cats }</span>  
                <span>{ ExampleStore.entity.Cat.Data.Rando }</span>  
            </div>
        );
    }
}

export default App;