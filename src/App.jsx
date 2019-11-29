import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Stage, Layer, Rect, Text } from "react-konva";

import DecoratorTest from "./DecoratorTest";

//?  This assignment is the only reliable way to get on the instance and it is preserves "instanceof" usage
const a = new DecoratorTest();
const b = new DecoratorTest();

console.log(a)
console.log(b)

a.prop("cat", Math.random())
b.prop("cat", Math.random())
a.on("bob", Math.random())
b.on("bob", Math.random())

console.log(a instanceof DecoratorTest);
console.log(b instanceof DecoratorTest);

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
    componentDidMount() {
        setInterval(() => this.props.store.ExampleStore.rand(), 500);
    }

    render() {
        const { OtherStore, ExampleStore } = this.props.store;

        return (
            // Stage is a div container
            // Layer is actual canvas element (so you may have several canvases in the stage)
            // And then we have canvas shapes inside the Layer
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    <Text text="Try click on rect" />
                    <Rect
                        x={20}
                        y={20}
                        width={ ExampleStore.width }
                        height={ ExampleStore.height }
                        fill={ "#000" }
                        onClick={ () => alert("You clicked me!") }
                    />
                </Layer>
            </Stage>
        );
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