class Adresse {
    constructor(
        adresseId,
        standard,
        post,
        rechnungsadresse,
        zusatz,
        strasse,
        land,
        plz,
        ort
    ) {
        this.adresseId = adresseId;
        this.standard = standard;
        this.post = post;
        this.rechnungsadresse = rechnungsadresse;
        this.zusatz = zusatz;
        this.strasse = strasse;
        this.land = land;
        this.plz = plz;
        this.ort = ort;
    }

    update(newData) {
        Object.assign(this, newData);
    }
}

export default Adresse;