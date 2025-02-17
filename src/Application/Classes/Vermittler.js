// Vermittler.js
import Person from './Person';

class Vermittler extends Person {
    constructor(personenNr, vermittlerNr, extern, provision, basis, waehrung, grad, ...args) {
        super(personenNr, ...args);
        this.vermittlerNr = vermittlerNr;
        this.extern = extern;
        this.provision = provision;
        this.basis = basis;
        this.waehrung = waehrung;
        this.grad = grad;
    }
}

export default Vermittler;
