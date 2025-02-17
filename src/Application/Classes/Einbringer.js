// Einbringer.js
import Person from './Person';

class Einbringer extends Person {
    constructor(personenNr, einbringerNr, grad, ...args) {
        super(personenNr, ...args);
        this.einbringerNr = einbringerNr;
        this.grad = grad;
    }
}

export default Einbringer;
