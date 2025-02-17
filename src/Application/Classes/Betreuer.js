// Betreuer.js
import Person from './Person';

class Betreuer extends Person {
    constructor(personenNr, betreuerNr, ...args) {
        super(personenNr, ...args);
        this.betreuerNr = betreuerNr;
    }
}

export default Betreuer;
