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
 * Ruft alle Exponate aus der API ab und gibt eine formatierte Liste zurück.
 */
export const fetchAllExponate = async () => {
    console.log("Exponate-Methode vorhanden?", typeof ApiService.fetchEXPONATE === "function");

    try {
        const exponate = await fetchAndLog("Exponate", ApiService.fetchEXPONATE);
        return sanitizeExponate(exponate);
    } catch (error) {
        console.error("Fehler beim Abrufen der Exponate:", error);
        throw error;
    }
};

/**
 * Bereinigt und formatiert die Liste der Exponate.
 */
const sanitizeExponate = (exponateList) => {
    if (!Array.isArray(exponateList)) {
        console.warn(`Erwartete ein Array, aber erhalten:`, exponateList);
        return [];
    }

    return exponateList.map(exponat => ({
        id: exponat.id,
        titel: exponat.titel || "Unbekannt",
        kategorie: exponat.kategorie || "Unbekannt",
        masse: exponat.masse || "Keine Angabe",
        gewicht: exponat.gewicht || "Keine Angabe",
        kommentar: exponat.kommentar || "",
    }));
};