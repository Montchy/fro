import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-dom';

// Mock-Daten oder tatsächliche Datenquellen importieren
import { fetchAllPersons } from '../Application/Services/personService';
import { exponateList } from '../Application/Classes/testDataGenerator';

const DynamicSearch = () => {
    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            try {
                const allPersons = await fetchAllPersons();
                const allExponate = exponateList;

                console.log("Persons:", allPersons);
                console.log("Exponate:", allExponate);

                const lowercasedSearchText = searchText.toLowerCase();

                const filteredPersons = allPersons.filter((person) =>
                    (`${person.vorname} ${person.nachname}`.toLowerCase().includes(lowercasedSearchText))
                ).map((person) => ({
                    type: 'Person',
                    id: person.id,
                    title: `${person.vorname} ${person.nachname}`
                }));

                const filteredExponate = allExponate.filter((exponat) =>
                    exponat.titel.toLowerCase().includes(lowercasedSearchText)
                ).map((exponat) => ({
                    type: 'Exponat',
                    id: exponat.exponatId,
                    title: exponat.titel
                }));

                console.log("Gefilterte Vorschläge:", [...filteredPersons, ...filteredExponate]);

                setSuggestions([...filteredPersons, ...filteredExponate]);
            } catch (error) {
                console.error("Fehler beim Laden der Daten:", error);
            }
        };

        if (searchText) {
            loadData();
        } else {
            setSuggestions([]);
        }
    }, [searchText]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Search</Text>
            <TextInput
                style={styles.searchBar}
                placeholder="Search..."
                placeholderTextColor="#bbb"
                value={searchText}
                onChangeText={(text) => {
                    setSearchText(text);
                    console.log("Eingegebener Suchtext:", text);
                }}
            />

            <FlatList
                data={suggestions}
                keyExtractor={(item) => `${item.type}-${item.id}`}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigate(`/${item.type.toLowerCase()}/${item.id}`)}>
                        <View style={styles.suggestionItem}>
                            <Text style={styles.suggestionText}>{item.title} ({item.type})</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    title: {
        color: 'rgba(240,175,77,1)',
        fontWeight: 'bold',
        fontSize: 50,
        marginBottom: 20,
    },
    searchBar: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 18,
        marginBottom: 20,
        backgroundColor: '#fff',
        color: '#000',
    },
    suggestionItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    suggestionText: {
        fontSize: 16
    }
});

export default DynamicSearch;
