import Decorators from "./decorators";

export default class Attribute {
    constructor(value) {
        let _this = Decorators.Apply([
            Decorators.State
        ]);

        _this.prop("value", value);

        return Decorators.Merge(this, _this);
    }

    Value(value) {
        if(value === null || value === void 0) {
            return this.prop("value");
        }

        return this.prop("value", value);
    }
};