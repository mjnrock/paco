import { GenerateUUID } from "./helper";

export default class Subscription {
    constructor(subscribor, subscribee) {
        this._uuid = GenerateUUID();
        this._subscribor = subscribor;
        this._subscribee = subscribee;
    }

    getSubscribor() {
        return this._subscribor;
    }
    getSubscribee() {
        return this._subscribee;
    }

    isSubscribor(obj, comparator = -1) {
        if(comparator === -1 && (typeof obj === "string" || obj instanceof String)) {
            let uuid = this._subscribor._uuid || false;

            if(uuid) {
                return uuid === obj;
            }
        } else if(typeof comparator === "function") {
            return comparator(obj) === true;
        }

        return false;
    }
    isSubscribee(obj, comparator = -1) {
        if(comparator === -1 && (typeof obj === "string" || obj instanceof String)) {
            let uuid = this._subscribee._uuid || false;

            if(uuid) {
                return uuid === obj;
            }
        } else if(typeof comparator === "function") {
            return comparator(obj) === true;
        }

        return false;
    }
};