export default class HomeostaticStats {
    constructor() {
        
    }

    GetComponent(entity) {
        return entity.prop("HomeostaticStats");
    }

    Satiate(entity, value) {
        return this.GetComponent(entity).prop("Satiation").inc(value);
    }
    Energize(entity, value) {
        return this.GetComponent(entity).prop("Energy").inc(value);
    }
    Heal(entity, value) {
        return this.GetComponent(entity).prop("Health").inc(value);
    }
};