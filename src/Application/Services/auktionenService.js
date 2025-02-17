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
            sanitized[key] = sanitizeData(data[key], seen);
        }
        return sanitized;
    }
    return data;
};

/**
 * Ruft alle Auktionen aus der API ab und gibt sie als Liste zurück.
 */
export const fetchAllAuctions = async () => {
    console.log("Auktionen-Methode vorhanden?", typeof ApiService.fetchAUKTIONEN === "function");

    try {
        const auktionen = await fetchAndLog("Auktionen", ApiService.fetchAUKTIONEN);
        return sanitizeAuctions(auktionen);
    } catch (error) {
        console.error("Fehler beim Abrufen der Auktionen:", error);
        throw error;
    }
};

/**
 * Bereinigt und formatiert die Liste der Auktionen.
 */
const sanitizeAuctions = (auctions) => {
    if (!Array.isArray(auctions)) {
        console.warn("Erwartete ein Array, aber erhalten:", auctions);
        return [];
    }

    return auctions.map(auction => ({
        id: auction.id,
        title: auction.titel || "Unbekannte Auktion",
        startDate: auction.startDatum || "Kein Startdatum",
        endDate: auction.endDatum || "Kein Enddatum",
        status: auction.status || "Unbekannter Status",
    }));
};