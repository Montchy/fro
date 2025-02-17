// Importiere Klassen und Enums
import Adresse from './Adresse.js';
import Person from './Person';
import Betreuer from './Betreuer.js';
import Einbringer from './Einbringer.js';
import Exponat from './Exponat.js';
import Kaeufer from './Kaeufer.js';
import Kuenstler from './Kuenstler.js';
import Vermittler from './Vermittler.js';
import Dokument from './Dokument.js';
import { Sprache, Anrede, Land, Waehrung, Steuertyp, Grad } from './Enums.js';

// Funktion zur zufälligen Auswahl aus einer Liste
const randomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Generiere Testdaten für Adresse
const generateAdresses = (count) => {
    const adresses = [];
    for (let i = 0; i < count; i++) {
        adresses.push(
            new Adresse(
                `adresse-${i}`,
                Math.random() > 0.5,
                Math.random() > 0.5,
                Math.random() > 0.5,
                `Zusatz ${i}`,
                `Straße ${i}`,
                randomFromArray([Land.OESTERREICH, Land.DEUTSCHLAND, Land.SCHWEIZ]),
                `PLZ-${i}`,
                `Ort ${i}`
            )
        );
    }
    return adresses;
};

// Generiere Testdaten für Personen
const generatePersons = (count) => {
    const persons = [];
    for (let i = 0; i < count; i++) {
        persons.push(
            new Person(
                `person-${i}`,
                randomFromArray([true, false]),
                randomFromArray([Sprache.DEUTSCH, Sprache.ENGLISH, Sprache.ZWEISPRACHIG]),
                randomFromArray([Anrede.FRAU, Anrede.HERR, Anrede.DIVERSE]),
                `Extra ${i}`,
                `Vorgestellt ${i}`,
                `Nachgestellt ${i}`,
                `Vorname ${i}`,
                `Nachname ${i}`,
                `Firma ${i}`,
                `Tätigkeit ${i}`,
                `Briefanrede ${i}`,
                new Date(1980 + i, 1, 1),
                `Geburtsbemerkung ${i}`,
                `Bemerkung ${i}`,
                `Persönliches ${i}`,
                `Kontoinhaber ${i}`,
                `Bank ${i}`,
                `IBAN-${i}`,
                `SWIFT-${i}`,
                `UID-${i}`,
                100000 + i,
                `Ausweisart ${i}`,
                `Zugehörigkeit ${i}`,
                1234567890 + i,
                `email${i}@example.com`,
                generateAdresses(1),
                null
            )
        );
    }
    return persons;
};

// Generiere Testdaten für Betreuer
const generateBetreuer = (count, persons) => {
    const betreuer = [];
    for (let i = 0; i < count; i++) {
        const person = persons[i % persons.length];
        betreuer.push(new Betreuer(person.personenNr, `betreuerNr-${i}`, ...Object.values(person)));
    }
    return betreuer;
};

// Generiere Testdaten für Einbringer
const generateEinbringer = (count, persons) => {
    const einbringer = [];
    for (let i = 0; i < count; i++) {
        const person = persons[i % persons.length];
        einbringer.push(
            new Einbringer(person.personenNr, `einbringerNr-${i}`, randomFromArray(Object.values(Grad)), ...Object.values(person))
        );
    }
    return einbringer;
};

// Generiere Testdaten für Exponat
const generateExponate = (count, kaeufer, vermittler, einbringer) => {
    const exponate = [];
    for (let i = 0; i < count; i++) {
        exponate.push(
            new Exponat(
                `exponat-${i}`,
                `Titel ${i}`,
                `TitelKurz ${i}`,
                `Untertitel ${i}`,
                i,
                `TechnikKurz ${i}`,
                `Technik ${i}`,
                100 + i,
                Math.random() > 0.5,
                `Kommentar ${i}`,
                randomFromArray(Object.values(Grad)),
                `Kategorie ${i}`,
                kaeufer[i % kaeufer.length],
                vermittler[i % vermittler.length],
                einbringer[i % einbringer.length]
            )
        );
    }
    return exponate;
};

// Generiere Testdaten für Käufer
const generateKaeufer = (count, persons) => {
    const kaeufer = [];
    for (let i = 0; i < count; i++) {
        const person = persons[i % persons.length];
        kaeufer.push(
            new Kaeufer(
                person.personenNr,
                `kaeuferNr-${i}`,
                randomFromArray(Object.values(Steuertyp)),
                Math.random() > 0.5,
                randomFromArray(Object.values(Grad)),
                ...Object.values(person)
            )
        );
    }
    return kaeufer;
};

// Generiere Testdaten für Künstler
const generateKuenstler = (count, persons) => {
    const kuenstler = [];
    for (let i = 0; i < count; i++) {
        const person = persons[i % persons.length];
        kuenstler.push(
            new Kuenstler(
                person.personenNr,
                `kuenstlerNr-${i}`,
                `BezKurz ${i}`,
                `Bez ${i}`,
                `Pseudonym1 ${i}`,
                `Pseudonym2 ${i}`,
                ...Object.values(person)
            )
        );
    }
    return kuenstler;
};

// Generiere Testdaten für Vermittler
const generateVermittler = (count, persons) => {
    const vermittler = [];
    for (let i = 0; i < count; i++) {
        const person = persons[i % persons.length];
        vermittler.push(
            new Vermittler(
                person.personenNr,
                `vermittlerNr-${i}`,
                Math.random() > 0.5,
                100.0 + i,
                200.0 + i,
                randomFromArray(Object.values(Waehrung)),
                randomFromArray(Object.values(Grad)),
                ...Object.values(person)
            )
        );
    }
    return vermittler;
};

// Generiere Testdaten für Dokumente
const generateDokumente = (count, betreuerList, einbringerList, kaeuferList, kuenstlerList, vermittlerList, exponateList) => {
    const dokumente = [];
    for (let i = 0; i < count; i++) {
        dokumente.push(
            new Dokument(
                `dokument-${i}`,
                `DokumentData ${i}`,
                betreuerList[i % betreuerList.length],
                einbringerList[i % einbringerList.length],
                kaeuferList[i % kaeuferList.length],
                kuenstlerList[i % kuenstlerList.length],
                vermittlerList[i % vermittlerList.length],
                exponateList[i % exponateList.length]
            )
        );
    }
    return dokumente;
};

// Erstellen der Testdaten
const personList = generatePersons(100);
const betreuerList = generateBetreuer(100, personList);
const einbringerList = generateEinbringer(100, personList);
const kaeuferList = generateKaeufer(100, personList);
const kuenstlerList = generateKuenstler(100, personList);
const vermittlerList = generateVermittler(100, personList);
const exponateList = generateExponate(100, kaeuferList, vermittlerList, einbringerList);
const dokumenteList = generateDokumente(100, betreuerList, einbringerList, kaeuferList, kuenstlerList, vermittlerList, exponateList);

// Exportiere Testdaten
export {
    personList,
    betreuerList,
    einbringerList,
    kaeuferList,
    kuenstlerList,
    vermittlerList,
    exponateList,
    dokumenteList,
};

