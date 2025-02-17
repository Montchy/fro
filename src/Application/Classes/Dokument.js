class Dokument {
    constructor(dokumentId, dokumentData, betreuer, einbringer, kaeufer, kuenstler, vermittler, exponat) {
        this.dokumentId = dokumentId;
        this.dokumentData = dokumentData;
        this.betreuer = betreuer;
        this.einbringer = einbringer;
        this.kaeufer = kaeufer;
        this.kuenstler = kuenstler;
        this.vermittler = vermittler;
        this.exponat = exponat;
    }

    update(newData) {
        Object.assign(this, newData);
    }
}

export default Dokument;