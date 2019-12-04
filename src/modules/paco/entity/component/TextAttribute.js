import Attribute from "./Attribute";
import Decorators from "../../../../lib/decorators";

export default class TextAttribute extends Attribute {
    constructor(value, name = null) {
        super(value);

        this.prop("name", name);

        return this;
    }

    init(name, value) {
        this.Value(value);
        this.prop("name", name);
        
        return this;
    }

    Name(name) {
        if(name === void 0) {
            return this.prop("name");
        }

        return this.prop("name", name);
    }
};