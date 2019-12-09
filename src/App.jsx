import { inject, observer } from "mobx-react";
import React, { Component } from "react";
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
            keys: {},
            x: new Lib.NumberAttribute(0),
            y: new Lib.NumberAttribute(0)
        };
        this.state.x.Range(0 - 225, 1280 - 300);
        this.state.y.Range(0 - 225, 1280 - 300);

        // let a = this.state.x.watch("value", () => {
        //     if(Math.random() * 100 > 95) {
        //         console.log("YES")
        //     }
        // });

        // console.log(a);
        // console.log(this.state.x.unwatch("value", a));

        document.onkeydown = e => {
            let { keys } = this.state;
            
            keys[ e.which ] = true;

            this.setState({
                ...this.state,
                keys
            });
        };
        document.onkeyup = e => {
            let { keys } = this.state;

            keys[ e.which ] = false;
            this.setState({
                ...this.state,
                keys
            });
        };

        //? Example implementation to override the "onkeydown > repeat" timer to thus allow for smooth movement
        // setInterval(() => {
        //     let { x, y, keys } = this.state,
        //         step = 6;

        //     // if(keys[ 37 ] === true) {
        //     //     x.inc(-step);
        //     // }
        //     // if(keys[ 39 ] === true) {
        //     //     x.inc(step);
        //     // }
        //     // if(keys[ 38 ] === true) {
        //     //     y.inc(-step);
        //     // }
        //     // if(keys[ 40 ] === true) {
        //     //     y.inc(step);
        //     // }

        //     // if(Math.random() * 100 > 95) {
        //     //     console.log(x.Value(), x.Min(), x.Max());
        //     //     console.log(y.Value(), y.Min(), y.Max());
        //     // }

        //     if(x.Value() === x.Max()) {
        //         x.Value(0 - 225)
        //     } else {
        //         x.inc(5);
        //     }
        //     // if(y.Value() === y.Max()) {
        //     //     y.Value(0)
        //     // } else {
        //     //     y.inc(5);
        //     // }
            
        //     this.setState({
        //         ...this.state,
        //         x,
        //         y
        //     });
        // }, 1000 / 60);
    }

    componentDidMount() {
        let eCanvas = document.getElementById("entity-canvas"),
            eCtx = eCanvas.getContext("2d");
        let tCanvas = document.getElementById("terrain-canvas"),
            tCtx = tCanvas.getContext("2d");

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
        let entities = Lib.Helper.LoadImages([
            `pusheen.png`,
        ]);
        let terrain = Lib.Helper.LoadImages([
            `grass.png`,
            `dirt.png`,
        ]);

        entities.then((e) => {
            for(let i in e) {
                let entity = e[ i ];

                eCtx.drawImage(entity, 500 / 2 - 150 / 2, 500 / 2 - 150 / 2);
            }
        });
        terrain.then((t) => {
            let [ grass, dirt ] = t;

            for(let i = 0; i < 128 * 10; i += 128) {
                for(let j = 0; j < 128 * 10; j += 128) {
                    tCtx.drawImage(Math.random() * 100 > 50 ? grass : dirt, i, j);
                }
            }
        });
    }

    render() {
        return (
            <div>
                <div
                    className="ba"
                    style={{
                        position: "relative",
                        top: 250,
                        left: 250,
                        overflow: "hidden",
                        width: 500,
                        height: 500,
                        backgroundColor: "#ccc"
                    }}
                >                    
                    <canvas
                        id="entity-canvas"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            zIndex: 1
                        }}

                        width={ 500 }
                        height={ 500 }
                    ></canvas>

                    <canvas
                        id="terrain-canvas"
                        style={{
                            position: "absolute",
                            left: -this.state.x.Value(),
                            top: -this.state.y.Value(),
                            zIndex: 0
                        }}

                        width={ 1280 }
                        height={ 1280 }
                    ></canvas>
                </div>
            </div>
        );
    }
}

export default App;