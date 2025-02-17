import ApiService from "../ApiService";

/**
 * Führt eine Fetch-Funktion aus, protokolliert die Antwort und behandelt Fehler.
 */
const fetchAndLog = async (type, fetchFunction) => {
    if (typeof fetchFunction !== "function") {
        console.error(`❌ Fehler: ${type} API-Aufruf existiert nicht!`);
        return [];
    }

    try {
        const response = await fetchFunction();

        if (!response) {
            console.warn(`${type} API hat keine Daten zurückgegeben.`);
            return [];
        }

        return sanitizeData(response);
    } catch (error) {
        console.error(`Fehler beim Abrufen von ${type}:`, error);
        return [];
    }
};

/**
 * Entfernt zirkuläre Referenzen und verschachtelte Strukturen.
 */
const sanitizeData = (data, seen = new WeakSet()) => {
    if (data && typeof data === 'object') {
        if (seen.has(data)) {
            return undefined;
        }
        seen.add(data);

        const sanitized = Array.isArray(data) ? [] : {};
        for (const key in data) {
            if (key === 'betreuer' || key === 'einbringer' || key === 'vermittler') {
                sanitized[key] = undefined;
            } else {
                sanitized[key] = sanitizeData(data[key], seen);
            }
        }
        return sanitized;
    }
    return data;
};

/**
 * Ruft alle Personen aus verschiedenen Endpunkten ab und führt sie zu einer Liste zusammen.
 */
export const fetchAllPersons = async () => {
    console.log("Vermittler-Methode vorhanden?", typeof ApiService.fetchVERMITTLER === "function");
    console.log("Einbringer-Methode vorhanden?", typeof ApiService.fetchEINBRINGER === "function");
    console.log("Betreuer-Methode vorhanden?", typeof ApiService.fetchBETREUER === "function");
    console.log("Auktionen-Methode vorhanden?", typeof ApiService.fetchAUKTIONEN === "function");


    try {
        const vermittler = await fetchAndLog("Vermittler", ApiService.fetchVERMITTLER);
        const einbringer = await fetchAndLog("Einbringer", ApiService.fetchEINBRINGER);
        const betreuer = await fetchAndLog("Betreuer", ApiService.fetchBETREUER);

        const allPersons = [
            ...sanitizePersons(vermittler, "Vermittler"),
            ...sanitizePersons(einbringer, "Einbringer"),
            ...sanitizePersons(betreuer, "Betreuer"),
        ];

        return allPersons;
    } catch (error) {
        console.error("Fehler beim Abrufen der Personen:", error);
        throw error;
    }
};

/**
 * Bereinigt und formatiert die Liste der Personen.
 */
const sanitizePersons = (persons, type) => {
    if (!Array.isArray(persons)) {
        console.warn(`Erwartete ein Array, aber erhalten:`, persons);
        return [];
    }

    return persons.map(person => ({
        id: person.id,
        vorname: person.vorname || "Unbekannt",
        nachname: person.nachname || "Unbekannt",
        email: person.email?.address || "Keine Email",
        telefon: person.tel || "Keine Telefonnummer",
        adresse: [
            person.adresse?.strasse || "",
            person.adresse?.ort || "",
            person.adresse?.land || "",
        ].filter(Boolean).join(", "),
        typ: type,
    }));
};