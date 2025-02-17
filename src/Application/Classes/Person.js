class Person {
    constructor(
        personenNr,
        korrespondenz,
        sprache,
        anrede,
        titelExtra,
        titelVorgestellt,
        titelNachgestellt,
        vorname,
        nachname,
        firma,
        taetigkeit,
        briefanrede,
        gebDat,
        gebBemerkung,
        bemerkung,
        persoenliches,
        kontoinhaber,
        bank,
        iban,
        swift,
        uid,
        ausweisNr,
        ausweisart,
        zugehoerigkeit,
        tel,
        email,
        adresse,
        imageData
    ) {
        this.personenNr = personenNr;
        this.korrespondenz = korrespondenz;
        this.sprache = sprache;
        this.anrede = anrede;
        this.titelExtra = titelExtra;
        this.titelVorgestellt = titelVorgestellt;
        this.titelNachgestellt = titelNachgestellt;
        this.vorname = vorname;
        this.nachname = nachname;
        this.firma = firma;
        this.taetigkeit = taetigkeit;
        this.briefanrede = briefanrede;
        this.gebDat = gebDat;
        this.gebBemerkung = gebBemerkung;
        this.bemerkung = bemerkung;
        this.persoenliches = persoenliches;
        this.kontoinhaber = kontoinhaber;
        this.bank = bank;
        this.iban = iban;
        this.swift = swift;
        this.uid = uid;
        this.ausweisNr = ausweisNr;
        this.ausweisart = ausweisart;
        this.zugehoerigkeit = zugehoerigkeit;
        this.tel = tel;
        this.email = email;
        this.adresse = adresse;
        this.imageData = imageData;
    }

    update(newData) {
        Object.assign(this, newData);
    }

    getFullName() {
        return `${this.vorname} ${this.nachname}`;
    }
}

export default Person;