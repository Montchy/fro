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
    try {
        const response = await fetch("http://localhost:8080/api/persons");
        const persons = await response.json();

        // Lade für jede Person das Bild separat
        const personsWithImages = await Promise.all(
            persons.map(async (person) => {
                try {
                    const imageResponse = await fetch(`http://localhost:8080/api/image/${person.id}`);
                    const imageData = await imageResponse.json();
                    return { ...person, imageData: imageData.imageBase64 || null };
                } catch (error) {
                    console.error("Fehler beim Laden des Bildes für Person", person.id);
                    return { ...person, imageData: null };
                }
            })
        );

        return personsWithImages;
    } catch (error) {
        console.error("Fehler beim Abrufen der Personen:", error);
        return [];
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