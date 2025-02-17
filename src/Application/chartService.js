import ApiService from "../Application/ApiService";

/**
 * Führt eine Fetch-Funktion aus, protokolliert die Antwort und behandelt Fehler.
 * @param {string} type - Der Typ der Datenquelle (z. B. "Auktion", "Exponat").
 * @param {Function} fetchFunction - Die Fetch-Funktion für die API.
 * @returns {Promise<Array>} - Die bereinigte API-Antwort oder ein leeres Array.
 */
const fetchAndLog = async (type, fetchFunction) => {
    try {
        const response = await fetchFunction();

        if (!response) {
            console.warn(`${type} API hat keine Daten zurückgegeben.`);
            return [];
        }

        //console.log(`Raw ${type} response:`, response);

        const sanitizedResponse = sanitizeData(response);
        //console.log(`Sanitized ${type} data:`, sanitizedResponse);

        return sanitizedResponse;
    } catch (error) {
        console.error(`Fehler beim Abrufen von ${type}:`, error);
        return [];
    }
};

/**
 * Entfernt zirkuläre Referenzen und verschachtelte Strukturen.
 * @param {Object} data - Die zu bereinigenden Daten.
 * @param {Set} seen - Set, um bereits besuchte Objekte zu verfolgen.
 * @returns {Object} - Bereinigte Daten.
 */
const sanitizeData = (data, seen = new WeakSet()) => {
    if (data && typeof data === "object") {
        if (seen.has(data)) {
            return undefined; // Zirkuläre Referenzen entfernen
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
 * Ruft alle relevanten Daten für die Diagramme aus verschiedenen Endpunkten ab.
 * @returns {Promise<Object>} - Ein Objekt mit allen aggregierten Daten.
 */
export const fetchChartData = async () => {
    try {
        const vermittler = await fetchAndLog("Vermittler", ApiService.fetchVermittler);
        const einbringer = await fetchAndLog("Einbringer", ApiService.fetchEinbringer);
        const betreuer = await fetchAndLog("Betreuer", ApiService.fetchBetreuer);
        const exponate = await fetchAndLog("Exponate", ApiService.fetchExponate);
        const auktionen = await fetchAndLog("Auktionen", ApiService.fetchAuktionen);

        return {
            vermittler: aggregateData(vermittler, "typ"),
            einbringer: aggregateData(einbringer, "typ"),
            betreuer: aggregateData(betreuer, "typ"),
            exponate: aggregateData(exponate, "kategorie"),
            auktionen: aggregateData(auktionen, "datum"),
        };
    } catch (error) {
        console.error("Fehler beim Abrufen der Diagrammdaten:", error);
        throw error;
    }
};

/**
 * Aggregiert die Daten nach einem bestimmten Schlüssel.
 * @param {Array} data - Die Daten, die aggregiert werden sollen.
 * @param {string} key - Der Schlüssel, nach dem gruppiert werden soll.
 * @returns {Array} - Die aggregierten Daten.
 */
const aggregateData = (data, key) => {
    if (!Array.isArray(data)) return [];

    const aggregated = data.reduce((acc, item) => {
        const groupKey = item[key] || "Unbekannt";
        acc[groupKey] = acc[groupKey] || { label: groupKey, value: 0 };
        acc[groupKey].value += 1; // Hier wird gezählt, Sie können es anpassen
        return acc;
    }, {});

    return Object.values(aggregated);
};

export default fetchChartData;