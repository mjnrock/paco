import Attribute from "./Attribute";
import Decorators from "../../../../lib/decorators";

export default class ArrayAttribute extends Attribute {
    constructor(values = [], mins = [], maxs = []) {
        let _this = Decorators.State({});

        _this.prop("value", values);
        _this.prop("min", mins);
        _this.prop("max", maxs);

        _this.on("attribute:change");
        _this.on("attribute:zero");
        _this.on("attribute:min");
        _this.on("attribute:max");

        return Decorators.Merge(this, _this);
    }

    init(values = [], mins = [], maxs = []) {
        this.prop("value", values);
        this.setMin(mins);
        this.setMax(maxs);
        
        return this;
    }

    push(value) {
        let val = this.value();

        val.push(value);

        return this.prop("value", val);
    }
    pop() {
        let val = this.value();

        val.pop();

        return this.prop("value", val);
    }

    splice(s, l) {
        let val = this.value();

        val.splice(s, l);
        
        return this.value(val);
    }
    map(fn, useAsSet = false) {
        let val = this.value();

        if(useAsSet) {
            let val2 = val.map(fn);

            return this.prop("value", val2);
        }

        return val.map(fn);
    }
    filter(fn, useAsSet = false) {
        let val = this.value();

        if(useAsSet) {
            let val2 = val.filter(fn);

            return this.prop("value", val2);
        }

        return val.filter(fn);
    }
    forEach(fn, useAsSet = false) {
        let val = this.value();

        if(useAsSet) {
            let val2 = val.forEach(fn);

            return this.prop("value", val2);
        }

        return val.forEach(fn);
    }

    add(index, value) {
        return this.value(index, this.prop("value")[ index ] + value);
    }
    subtract(index, value) {
        return this.value(index, this.prop("value")[ index ] - value);
    }
    multiply(index, value) {
        return this.value(index, this.prop("value")[ index ] * value);
    }
    divide(index, value) {
        return this.value(index, this.prop("value")[ index ] / value);
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

    value(index, value) {
            if(arguments.length === 1) {
                return this.prop("value")[ index ];
            } else if(arguments.length === 2) {
                if(value !== void 0) {
                    return this.change(index, value, this.prop("value"));
                }
            }

        return this.prop("value");
    }
    inc(index, value = 1) {
        let oldValue = this.prop("value")[ index ],
            newValue = oldValue + value;

        return this.change(index, newValue, oldValue);
    }
    dec(index, value = 1) {
        let oldValue = this.prop("value")[ index ],
            newValue = oldValue - value;            

        return this.change(index, newValue, oldValue);
    }

    change(index, newValue, oldValue) {
        let min = this.prop("min"),
            max = this.prop("max");

        if((min[ index ] !== null && min[ index ] !== void 0) && newValue <= min[ index ]) {
            newValue = min;

            this.call("attribute:min", index, newValue, oldValue);
        }
        if((max[ index ] !== null && max[ index ] !== void 0) && newValue >= max[ index ]) {
            newValue = max;
            
            this.call("attribute:max", index, newValue, oldValue);
        }
        if(newValue === 0) {
            this.call("attribute:zero", index, newValue, oldValue);
        }

        this.prop("value")[ index ] = newValue;
        this.call("attribute:change", index, newValue, oldValue);

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