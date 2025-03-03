class Exponat {
    constructor({
                    exponatId = '',
                    titel = '',
                    titelKurz = '',
                    untertitel = '',
                    exponatNr = '',
                    technikKurz = '',
                    technik = '',
                    masse = '',
                    signatur = '',
                    kommentar = '',
                    gewicht = '',
                    kategorie = '',
                    kaeufer = null,
                    vermittler = null,
                    einbringer = null,
                } = {}) {
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

    update(newData = {}) {
        Object.entries(newData).forEach(([key, value]) => {
            if (this.hasOwnProperty(key)) {
                this[key] = value;
            }
        });
    }

    toString() {
        return `Exponat: ${this.titel} (${this.exponatId})`;
    }

    toJSON() {
        return {
            exponatId: this.exponatId,
            titel: this.titel,
            titelKurz: this.titelKurz,
            untertitel: this.untertitel,
            exponatNr: this.exponatNr,
            technikKurz: this.technikKurz,
            technik: this.technik,
            masse: this.masse,
            signatur: this.signatur,
            kommentar: this.kommentar,
            gewicht: this.gewicht,
            kategorie: this.kategorie,
            kaeufer: this.kaeufer,
            vermittler: this.vermittler,
            einbringer: this.einbringer,
        };
    }
}

export default Exponat;