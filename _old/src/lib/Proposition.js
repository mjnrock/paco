import ClassDecorators from "./classDecorators";

import Attribute from "./Attribute";
import Condition from "./Condition";

export default class Proposition extends ClassDecorators.StateEvents {
    constructor(conditions, onTrue = null, onFalse = null, onRun = null) {
        super();
        
        this.prop("conditions", conditions);
        this.prop("result", false);

        this.on("true", onTrue);
        this.on("false", onFalse);
        this.on("run", onRun);
    }

    Run(attribute, { useDysjunction = true, negateResult = false, overrideAssignments = false } = {}) {
        if(arguments[ 1 ] && typeof arguments[ 1 ] !== "object") {
            throw new Error(`[Invalid Options]: The @options parameter was passed a non-object.`);
        }

        let results = [];

        for(let i in this.prop("conditions")) {
            let cond = this.prop("conditions")[ i ];

            if(cond instanceof Condition) {
                if(cond.IsAssigned() && !overrideAssignments) {
                    results.push(cond.Run());
                } else {
                    results.push(cond.Run(attribute));
                }
            } else {
                throw new Error(`[Invalid Condition Type]: Proposition.conditions contains entries that are not of type <Condition>`);
            }
        }

        let result;
        if(useDysjunction) {
            result = results.reduce((a, v) => a || v);
        } else {
            result = results.reduce((a, v) => a && v);
        }
        result = negateResult ? !result : result;

        this.prop("result", result);

        let resultObj = {
            result: result,
            results: result,
            options: {
                useDysjunction,
                negateResult,
                overrideAssignments
            }
        };

        if(this.hasEvent("run")) {
            this.call("run", resultObj);
        }

        if(result && this.hasEvent("true")) {
            this.call("true", resultObj);
        } else if(!result && this.hasEvent("false")) {
            this.call("false", resultObj);
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