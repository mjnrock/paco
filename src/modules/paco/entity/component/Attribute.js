import Decorators from "../../../../lib/decorators";

export default class Attribute {
    constructor(value = 0, min = null, max = null) {
        let _this = Decorators.State({});

        _this.prop("value", value);
        _this.prop("min", min);
        _this.prop("max", max);

        _this.on("attribute:change");
        _this.on("attribute:zero");
        _this.on("attribute:min");
        _this.on("attribute:max");

        return Decorators.Merge(this, _this);
    }

    init(value = 0, min = null, max = null) {
        this.setMin(min);
        this.setMax(max);
        
        return this.value(0);
    }

    add(value) {
        return this.value(this.prop("value") + value);
    }
    subtract(value) {
        return this.value(this.prop("value") - value);
    }
    multiply(value) {
        return this.value(this.prop("value") * value);
    }
    divide(value) {
        return this.value(this.prop("value") / value);
    }

    toPercent() {
        return this.toRate() * 100;
    }
    toRate() {
        let value = this.prop("value"),
            min = this.prop("min"),
            max = this.prop("max");

        return (value - min) / (max - min);
    }
    
    isEmpty() {
        return this.prop("value") === this.prop("min");
    }
    isFull() {
        return this.prop("value") === this.prop("max");
    }

    value(value) {
        if(value !== void 0) {
            return this.change(value, +this.prop("value"));
        }

        return this.prop("value");
    }
    inc(value = 1) {
        let oldValue = this.prop("value"),
            newValue = oldValue + value;

        return this.change(newValue, oldValue);
    }
    dec(value = 1) {
        let oldValue = this.prop("value"),
            newValue = oldValue - value;            

        return this.change(newValue, oldValue);
    }

    change(newValue, oldValue) {
        let min = this.prop("min"),
            max = this.prop("max");

        if((min !== null && min !== void 0) && newValue <= min) {
            newValue = min;

            this.call("attribute:min", newValue, oldValue);
        }
        if((max !== null && max !== void 0) && newValue >= max) {
            newValue = max;
            
            this.call("attribute:max", newValue, oldValue);
        }
        if(newValue === 0) {
            this.call("attribute:zero", newValue, oldValue);
        }

        this.prop("value", newValue);
        this.call("attribute:change", newValue, oldValue);

        return this;
    }

    setMin(value) {
        if(value !== null && value !== void 0) {
            this.prop("min", value);
        }

        return this;
    }
    setMax(value) {
        if(value !== null && value !== void 0) {
            this.prop("max", value);
        }

        return this;
    }
};