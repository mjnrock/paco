import Attribute from "./Attribute";
import Condition from "./Condition";

export default class Proposition {
    constructor(conditions, onTrue, onFalse) {
        this.conditions = conditions;
        this.result = false;

        this.callbacks = {
            ontrue: onTrue,
            onfalse: onFalse,
        };
    }

    Run(attribute, { useDysjunction = true, negateResult = false, overrideAssignments = false } = {}) {
        if(arguments[ 1 ] && typeof arguments[ 1 ] !== "object") {
            throw new Error("[Invalid Options]: The @options parameter was passed a non-object.");
        }

        let results = [];

        for(let i in this.conditions) {
            let cond = this.conditions[ i ];

            if(cond instanceof Condition) {
                if(cond.IsAssigned() && !overrideAssignments) {
                    results.push(cond.Run());
                } else {
                    results.push(cond.Run(attribute));
                }
            } else {
                throw new Error("[Invalid Condition Type]: Proposition.conditions contains entries that are not of type <Condition>");
            }
        }

        let result;
        if(useDysjunction) {
            result = results.reduce((a, v) => a || v);
        } else {
            result = results.reduce((a, v) => a && v);
        }
        result = negateResult ? !result : result;

        let resultObj = {
            result: result,
            results: result,
            options: {
                useDysjunction,
                negateResult,
                overrideAssignments
            }
        };

        if(result && typeof this.callbacks.ontrue === "function") {
            (async () => this.callbacks.ontrue(resultObj))();
        } else if(!result && typeof this.callbacks.onfalse === "function") {
            (async () => this.callbacks.onfalse(resultObj))();
        }

        return resultObj;
    }

    RunAnd(attribute, { negateResult = false, overrideAssignments = false } = {}) {
        return this.Run(attribute, {
            useDysjunction: false,
            negateResult,
            overrideAssignments
        });
    }
    RunNotAnd(attribute, overrideAssignments = false) {
        return this.Run(attribute, {
            useDysjunction: false,
            negateResult: true,
            overrideAssignments
        });
    }
    RunOr(attribute, { negateResult = false, overrideAssignments = false } = {}) {
        return this.Run(attribute, {
            useDysjunction: true,
            negateResult,
            overrideAssignments
        });
    }
    RunNotOr(attribute, overrideAssignments = false) {
        return this.Run(attribute, {
            useDysjunction: true,
            negateResult: true,
            overrideAssignments
        });
    }
};