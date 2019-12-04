import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { Stage, Layer, Rect, Text, Image } from "react-konva";
// import useImage from "use-image";

import Attribute from "./modules/paco/entity/component/Attribute";
import TextAttribute from "./modules/paco/entity/component/TextAttribute";
// const [ image ] = useImage("./assets/images//pusheen.png");

// const LionImage = (props = {}) => {
//     const [ image ] = useImage("./assets/images/pusheen.png");

//     return <Image image={image} { ...props } />;
// };

let a = new TextAttribute("Cats", "Bob");

a.listen("prop-change", ([ t, n, o ]) => console.log(t, n, o));

a.Name("Casdfsdf");
a.Value(123);
a.Value(456);
a.Value(789);

// console.log(a._state);
// a.Current("Fish");
// a.Current("Cheese");
// a.Current("Dog");

// a.listen("attribute:min", ([ t, n, o ]) => console.log("MIN", n, o));
// a.listen("attribute:max", ([ t, n, o ]) => console.log("MAX", n, o));
// a.listen("attribute:zero", ([ t, n, o ]) => console.log("ZERO", n, o));

// a.setMin(-1);
// a.setMax(10);

// a.dec(3);
// a.inc(500);
// a.value(0);
// a.value(10);
// a.value(-1);

// console.log(a);
// console.log(a.value());

@inject("store")
@observer
class App extends Component {
    render() {

        return (
            <div>Cats</div>
        );
    }
}

export default App;