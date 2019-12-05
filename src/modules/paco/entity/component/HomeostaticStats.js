import Lib from "./../../../../lib/package";

export default class HomeostaticStats extends Lib.ClassDecorators.StateEvents {
    constructor(entity) {
        super();

        this.name = "stats-homeostatic";
        this.entity = entity;

        this.prop("Satiation", new NumberAttribute(100, 0, 100));
        this.prop("Energy", new NumberAttribute(100, 0, 100));
        this.prop("Health", new NumberAttribute(100, 0, 100));
    }

    Satiate(value) {
        return this.entity.prop(this.name).prop("Satiation").inc(value);
    }
    Energize(value) {
        return this.entity.prop(this.name).prop("Energy").inc(value);
    }
    Heal(value) {
        return this.entity.prop(this.name).prop("Health").inc(value);
    }
};