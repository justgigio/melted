import { IOGate } from "./IOGate";


abstract class Component {

    abstract inputs: IOGate[]
    abstract outputs: IOGate[]
    abstract components: Component[]
    
    name: String

    constructor(name: String) {
      this.name = name
    }
}

export { Component }
