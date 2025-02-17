// Kaeufer.js
import Person from './Person';

class Kaeufer extends Person {
    constructor(personenNr, kaeuferNr, steuertyp, bietersperre, grad, ...args) {
        super(personenNr, ...args);
        this.kaeuferNr = kaeuferNr;
        this.steuertyp = steuertyp;
        this.bietersperre = bietersperre;
        this.grad = grad;
    }
}

export default Kaeufer;
