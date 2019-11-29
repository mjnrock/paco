import Decorators from "./lib/decorators";

class Test {
    constructor() {
        return Decorators.ApplyAll(this);
    }
}

export default Test;