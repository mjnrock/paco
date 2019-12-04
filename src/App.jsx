import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { Stage, Layer, Rect, Text, Image } from "react-konva";
// import useImage from "use-image";

import Attribute from "./modules/paco/entity/component/Attribute";
import NumberAttribute from "./modules/paco/entity/component/NumberAttribute";
import TextAttribute from "./modules/paco/entity/component/TextAttribute";
// const [ image ] = useImage("./assets/images//pusheen.png");

// const LionImage = (props = {}) => {
//     const [ image ] = useImage("./assets/images/pusheen.png");

//     return <Image image={image} { ...props } />;
// };

let a = new NumberAttribute(1, 0, 10);

a.listen("prop-change", ([ t, n, o ]) => console.log(t, n, o));
a.listen("attribute:min", ([ t, n, o ]) => console.log("MIN", n, o));
a.listen("attribute:max", ([ t, n, o ]) => console.log("MAX", n, o));
a.listen("attribute:zero", ([ t, n, o ]) => console.log("ZERO", n, o));

a.Min(-1);
a.Max(10);

a.dec(3);
a.inc(500);
a.Value(0);
a.Value(10);
a.Value(-1);

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