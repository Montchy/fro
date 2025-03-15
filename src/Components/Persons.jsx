import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    TextInput,
    Image,
    CheckBox,
} from "react-native";
import { useNavigate } from "react-router-dom";
import Squ4 from "./AlwaysActive/images/sq4.png";
import listic from "./AlwaysActive/images/listic.png";
import  sqw from "./AlwaysActive/images/cl.png";
import listw from "./AlwaysActive/images/wl.png";
import Filter from "./AlwaysActive/images/filter.png";
import Nutzer from "./AlwaysActive/images/nutzer.png";
import NutzerW from "./AlwaysActive/images/userw.png";
import arrow from "./AlwaysActive/images/arrow.png";
import { fetchAllPersons } from "../Application/Services/personService";
import {Anrede} from "../Application/Classes/Enums";

const Persons = ({ darkMode, isEnglish }) => {
    const [persons, setPersons] = useState([]);
    const [filteredPersons, setFilteredPersons] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchByFirstName, setSearchByFirstName] = useState(true);
    const [searchByLastName, setSearchByLastName] = useState(false);
    const [searchByBoth, setSearchByBoth] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [changeListView, setListView] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadPersons = async () => {
            try {
                const allPersons = await fetchAllPersons();
                setPersons(allPersons);
                setFilteredPersons(allPersons);
            } catch (err) {
                setError("Daten konnten nicht geladen werden.");
            } finally {
                setLoading(false);
                addImages();
            }
        };

        loadPersons();
        console.log(persons);
    }, []);

    const addImages = (persons) => {
        // Sicherstellen, dass persons existiert und ein Array ist
        if (!Array.isArray(persons)) {
            console.error("❌ Fehler: Die Liste der Personen ist nicht definiert oder keine gültige Liste.");
            return;
        }

        persons.forEach((person) => {
            if (!person.anrede) {
                console.warn(`⚠️ Warnung: Person mit ID ${person.id} hat keine gültige Anrede.`);
                return;
            }

            // Vergleiche sicherstellen (JavaScript nutzt == oder ===, nicht equals)
            if (person.anrede === "HERR") {
                person.imageData = "https://xsgames.co/randomusers/avatar.php?g=male";
            } else if (person.anrede === "FRAU") {
                person.imageData = "https://xsgames.co/randomusers/avatar.php?g=female";
            } else if (person.anrede === "DIVERSE") {
                person.imageData = "https://xsgames.co/randomusers/avatar.php?g=pixel";
            } else {
                console.warn(`⚠️ Keine passende Anrede für ID ${person.id}, Standardbild wird genutzt.`);
                person.imageData = "https://xsgames.co/randomusers/avatar.php?g=pixel";
            }
        });

        console.log("✅ Alle Personen mit Bildern versehen:", persons);
    };


    useEffect(() => {
        const filterPersons = () => {
            const lowercasedSearchText = searchText.toLowerCase();
            const filtered = persons.filter((person) => {
                const fullName = `${person.vorname} ${person.nachname}`.toLowerCase();
                if (searchByFirstName) {
                    return person.vorname?.toLowerCase().includes(lowercasedSearchText);
                } else if (searchByLastName) {
                    return person.nachname?.toLowerCase().includes(lowercasedSearchText);
                } else if (searchByBoth) {
                    return fullName.includes(lowercasedSearchText);
                }
                return true;
            });
            setFilteredPersons(filtered);
        };

        filterPersons();
    }, [searchText, searchByFirstName, searchByLastName, searchByBoth, persons]);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#f0af4d" />
                <Text>Daten werden geladen...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.welcomeText, darkMode? styles.darkWelcomeText:styles.lightWelcomeText]}>{isEnglish ? "Persons":"Personen"}</Text>
                <View style={styles.searchContainer}>
                    <TouchableOpacity
                        style={[styles.filterButton, changeListView && [ styles.activeButton ,darkMode?styles.activeButtonD:styles.activeButtonL] ]}
                        onPress={() => setListView(true)}
                    >
                        <Image style={styles.icon} source={darkMode?sqw:Squ4} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterButton, !changeListView && [ styles.activeButton ,darkMode?styles.activeButtonD:styles.activeButtonL] ]}
                        onPress={() => setListView(false)}
                    >
                        <Image style={styles.icon} source={darkMode?listw:listic} />
                    </TouchableOpacity>
                    <View style={[styles.searchBarWrapper,darkMode?styles.searchBarWrapperD:styles.searchBarWrapperL]}>
                        <TextInput
                            style={styles.searchBar}
                            placeholder="Personen suchen"
                            placeholderTextColor="grey"
                            value={searchText}
                            onChangeText={(text) => setSearchText(text)}
                        />
                        <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
                            <Image style={styles.icon} source={Filter} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {showFilters && (
                <View style={styles.dropdown}>
                    <View style={styles.checkBoxItem}>
                        <CheckBox
                            value={searchByFirstName}
                            onValueChange={() => {
                                setSearchByFirstName(!searchByFirstName);
                                setSearchByLastName(false);
                                setSearchByBoth(false);
                            }}
                        />
                        <Text> Suche nach Vornamen</Text>
                    </View>
                    <View style={styles.checkBoxItem}>
                        <CheckBox
                            value={searchByLastName}
                            onValueChange={() => {
                                setSearchByLastName(!searchByLastName);
                                setSearchByFirstName(false);
                                setSearchByBoth(false);
                            }}
                        />
                        <Text> Suche nach Nachnamen</Text>
                    </View>
                    <View style={styles.checkBoxItem}>
                        <CheckBox
                            value={searchByBoth}
                            onValueChange={() => {
                                setSearchByBoth(!searchByBoth);
                                setSearchByFirstName(false);
                                setSearchByLastName(false);
                            }}
                        />
                        <Text> Suche nach Vor- und Nachnamen</Text>
                    </View>
                </View>
            )}

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {changeListView ? (
                    <View style={styles.personGrid}>
                        {filteredPersons.map((person, index) => (
                            <View key={index} style={[styles.personBox,darkMode?styles.personBoxD:styles.personBoxL]}>
                                <TouchableOpacity onPress={() => navigate(`/person/${person.id}`)}>
                                    
                         {person.imageData ? (
                 <Image style={styles.images} source={{ uri: person.imageData }} />
) : (
    <Image style={styles.images} source={{ uri: "https://xsgames.co/randomusers/avatar.php?g=pixel" }} />
)}


                                    <View style={styles.line}></View>
                                    <View>
                                        <Text style={[styles.personName,darkMode?{color:"white"}:{color:"black"}]}>{person.vorname}</Text>
                                        <Text style={[styles.personName,darkMode?{color:"white"}:{color:"black"}]}>{person.nachname}</Text>
                                        <Text style={[styles.personName,darkMode?{color:"white"}:{color:"black"}]}>{person.id}</Text>
                                        <Text style={styles.personType}>{person.typ}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={styles.simpleList}>
                        {filteredPersons.map((person, index) => (
                            <View key={index} style={[styles.simpleListItem,darkMode ?styles.simpleListItemD:styles.simpleListItemL]}>
                                <TouchableOpacity onPress={() => navigate(`/person/${person.id}`)} style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ fontWeight: "bold" }}>
                                        {person.nachname} {person.vorname} ({person.typ})
                                    </Text>
                                    <Image style={{ width: 20, height: 20, marginLeft: 10 }} source={{ uri: `http://localhost:8080${person.imageUrl}` }} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    loader: { flex: 1, justifyContent: "center", alignItems: "center" },
    errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    errorText: { color: "red", fontSize: 16 },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    welcomeText: {fontWeight: "bold", fontSize: 50 },
    lightWelcomeText: {
        color: 'rgba(240,175,77,1)',
    },
    darkWelcomeText: {
        color: 'rgb(85, 129, 176)',
    },
    searchContainer: { flexDirection: "row", alignItems: "center", marginLeft: "auto" },
    searchBarWrapper: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, height: 40, marginLeft: 10},
    searchBarWrapperL:{borderColor: "gray"},
    searchBarWrapperD:{borderColor: 'rgb(85, 129, 176)'},
    searchBar: { flex: 1, paddingVertical: 5 },
    icon: { width: 20, height: 20, marginHorizontal: 5},
    filterButton: { padding: 5 },
    activeButton: { borderRadius: 5 },
    activeButtonD:{ backgroundColor: 'rgb(85, 129, 176)'},
    activeButtonL:{backgroundColor: "rgba(240,175,77,1)"},
    dropdown: { padding: 10, borderWidth: 1, borderColor: "lightgray", borderRadius: 5, marginTop: 10 },
    checkBoxItem: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
    scrollViewContent: { alignItems: "center" },
    personGrid: { flexDirection: "row", flexWrap: "wrap" },
    personBox: { width: "18%", borderWidth: 1, margin: 10, padding: 10, borderRadius: 5, alignItems: "center" },
    personBoxL:{ borderColor:"black"},
    personBoxD:{borderColor: "rgb(85, 129, 176)"},
    simpleList: { padding: 10, width: "100%" },
    simpleListItem: { paddingVertical: 10, borderBottomWidth: 1},
    simpleListItemD:{borderColor: "rgb(85, 129, 176)"},
    simpleListItemL:{borderColor: "#ddd"},
    personName: { fontSize: 14 },
    personType: { fontSize: 12, color: "gray" },
    images: { width: 50, height: 50 },
    line: { backgroundColor: "lightgrey", height: 2, width: "100%", marginVertical: 4 },
});

export default Persons;