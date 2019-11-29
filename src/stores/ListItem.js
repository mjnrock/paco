import { GenerateUUID } from "./../lib/helper";

export default class ListItem {        
    constructor(value, ordinality = null) {
        this.Value = value;

        this.Ordinality = ordinality;
        this.Status = null;
        this.Timestamps = {
            created: Date.now(),
            completed: null
        };

        this.UUID = GenerateUUID();
    }

    Serialize() {
        return {
            value: this.Value,
            status: this.Status,
            ordinality: this.ordinality,
            uuid: this.UUID
        };
    }
    Deserialize(json) {
        let obj = json;
        while(typeof obj === "string" || obj instanceof String) {
            obj = JSON.parse(obj);
        }

        this.Value = obj.value;
        this.Status = obj.status;
        this.Ordinality = obj.value;
        this.UUID = obj.uuid || GenerateUUID();

        return this;
    }

    static Deserialize(json) {
        return (new ListItem()).Deserialize(json);
    }
};