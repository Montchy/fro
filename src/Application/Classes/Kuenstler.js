// Kuenstler.js
import Person from './Person';

class Kuenstler extends Person {
    constructor(personenNr, kuenstlerNr, bezKurz, bez, pseudonym1, pseudonym2, ...args) {
        super(personenNr, ...args);
        this.kuenstlerNr = kuenstlerNr;
        this.bezKurz = bezKurz;
        this.bez = bez;
        this.pseudonym1 = pseudonym1;
        this.pseudonym2 = pseudonym2;
    }
}

export default Kuenstler;
