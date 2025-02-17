class Exponat {
    constructor(
        exponatId,
        titel,
        titelKurz,
        untertitel,
        exponatNr,
        technikKurz,
        technik,
        masse,
        signatur,
        kommentar,
        gewicht,
        kategorie,
        kaeufer,
        vermittler,
        einbringer
    ) {
        this.exponatId = exponatId;
        this.titel = titel;
        this.titelKurz = titelKurz;
        this.untertitel = untertitel;
        this.exponatNr = exponatNr;
        this.technikKurz = technikKurz;
        this.technik = technik;
        this.masse = masse;
        this.signatur = signatur;
        this.kommentar = kommentar;
        this.gewicht = gewicht;
        this.kategorie = kategorie;
        this.kaeufer = kaeufer;
        this.vermittler = vermittler;
        this.einbringer = einbringer;
    }

    update(newData) {
        Object.assign(this, newData);
    }
}

export default Exponat;