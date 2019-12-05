import Attribute from "./Attribute";
import Condition from "./Condition";
import Proposition from "./Proposition";

import ClassDecorators from "./classDecorators";

export default class ImageSequencer extends ClassDecorators.StateEvents {
    constructor(sequence = []) {
        super();

        this.prop("index", 0);
        this.prop("sequence", sequence);

        // for(let i in sequence) {
        //     if(!sequence[ i ].IsAssigned()) {
        //         throw new Error("[No Unassigned Conditions]: Sequence Conditions must be assigned an Attribute.");
        //     }
        // }
    }

    GetImage() {
        let sequence = this.prop("sequence"),
            index = this.prop("index");

        if(Array.isArray(sequence[ index ])) {
            return sequence[ index ][ 1 ];
        }

        return false;
    }

    AddCondition(cond, image, opts = {}) {
        if(typeof image === "string" || image instanceof String) {
            let img = new Image();
            img.onload = (e) => {
                this.prop("sequence").push([
                    cond,
                    img,
                    opts
                ]);
            };
            img.src = image;
        } else if(image instanceof Image) {
            this.prop("sequence").push([
                cond,
                image,
                opts
            ]);
        }

        return this;
    }

    // [
    //     [ Condition(Attribute), Image, options = {} ],
    //     [ Condition(Attribute), Image, options = {} ],
    //     [ Condition(Attribute), Image, options = {} ]
    // ]
};