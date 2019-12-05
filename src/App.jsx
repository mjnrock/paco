import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Jimp from "jimp";
// import { Stage, Layer, Rect, Text, Image } from "react-konva";
// import useImage from "use-image";

import Lib from "./lib/package";
// const [ image ] = useImage("./assets/images//pusheen.png");

// const LionImage = (props = {}) => {
//     const [ image ] = useImage("./assets/images/pusheen.png");

//     return <Image image={image} { ...props } />;
// };

// let a = new Lib.NumberAttribute(1, 0, 10);
// // console.log(a);

// a.listen("prop-change", ([ t, n, o ]) => console.log(t, n, o));
// a.listen("prop-change::min", ([ t, n, o ]) => console.log("MIN", n, o));
// a.listen("prop-change::max", ([ t, n, o ]) => console.log("MAX", n, o));
// a.listen("prop-change::zero", ([ t, n, o ]) => console.log("ZERO", n, o));

// a.Min(-1);
// a.Max(10);

// a.dec(3);
// a.inc(500);
// a.Value(0);
// a.Value(10);
// a.Value(-1);

// let a = new Lib.NumberAttribute(1, 0, 10),
//     a2 = new Lib.NumberAttribute(3, 1, 9),
//     a3 = new Lib.NumberAttribute(5, 2, 8),
//     c = new Lib.Condition(
//         Lib.Condition.EnumType.IN,
//         1, 5, 3
//     ).Assign(a, true),
//     c2 = new Lib.Condition(
//         Lib.Condition.EnumType.EQUALS,
//         1
//     ).Assign(a),
//     c3 = new Lib.Condition(
//         Lib.Condition.EnumType.GTE,
//         5
//     ).Assign(a),
//     p = new Lib.Proposition([
//             c, c2, c3
//         ],
//         () => console.log("YES"),
//         () => console.log("NO")
//     );
    

// console.log(a);
// console.log(a2);
// console.log(a3);

// console.log(a3.UUID());



// a.Value(15);
// a.Value(5);

// p.listen("onrun", () => console.log(3745434545434));
// p.Run(a);

// console.log(p.Run(a, {
//     useDysjunction: false,
//     negateResult: true
// }));
// console.log(p.RunAnd(a));
// console.log(p.RunOr(a));
// console.log(p.RunNotAnd(a));
// console.log(p.RunNotOr(a));

// c.Assign(a);
// c.Unassign();1
// console.log(c.Run());

// a.Value(2);
// console.log(c.Run());

let i = new Lib.ImageSequencer(),
    a = new Lib.NumberAttribute(5);

console.log(i);

i.AddCondition(
    new Lib.Condition(
        Lib.Condition.GTE,
        0
    ),
    "./assets/images/pusheen.png"
);

setTimeout(
    () => {
        console.log(i.GetImage())
    },
    1000
);


@inject("store")
@observer
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            img: null
        };
    }

    componentDidMount() {
        let canvas = document.getElementById("canvas"),
            ctx = canvas.getContext("2d");

        // Lib.Helper.LoadImage(`./assets/images/pusheen.png`)
        //     .then(img => {
        //         ctx.drawImage(img, 0, 0);

        //         return img;
        //     });


        // Lib.Helper.LoadImage([
        //     `./assets/images/pusheen.png`,
        //     `./assets/images/raccoon.png`
        // ])
        //     .then(images => {
        //         let x = 0,
        //             y = 0;

        //         for(let i in images) {
        //             let img = images[ i ];

        //             ctx.drawImage(img, x, y);

        //             x += img.width;
        //         }
        //     });

        
        // Lib.Helper.LoadImages([
        //     `./assets/images/raccoon.png`
        // ], canvas);
        Lib.Helper.LoadImages([
            `./assets/images/raccoon.png`,
            `./assets/images/raccoon.png`,
            `./assets/images/raccoon.png`,
            `./assets/images/raccoon.png`,
            `./assets/images/raccoon.png`,
            `./assets/images/raccoon.png`,
            `./assets/images/raccoon.png`,
            `./assets/images/raccoon.png`,
            `./assets/images/pusheen.png`
        ], canvas, {
            type: "wrap"
        });
    }

    render() {
        return (
            <div>
                <div>Cats</div>
                <canvas
                    id="canvas"
                    width={ 400 }
                    height={ 1000 }
                ></canvas>
            </div>
        );
    }
}

export default App;