import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, CheckBox } from 'react-native';
import listic from "./AlwaysActive/images/listic.png";
import Filter from "./AlwaysActive/images/filter.png";
import Squ4 from "./AlwaysActive/images/sq4.png";
import arrow from "./AlwaysActive/images/arrow.png";
import { exponateList } from '../Application/Classes/testDataGenerator';

const Exponate = ({ darkMode, isEnglish }) => {  // Dark Mode & Sprache als Props
    const [searchText, setSearchText] = useState('');
    const [searchByTitle, setSearchByTitle] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    const filteredExponate = exponateList.filter(exponat => {
        const title = exponat.title?.toLowerCase();
        const searchQuery = searchText.toLowerCase().trim();
        return searchByTitle && searchQuery ? title?.includes(searchQuery) : true;
    });

    return (
        <View style={[styles.container, darkMode ? styles.darkBg : styles.lightBg]}>
            <View style={{ flexDirection: "row" }}>
                <Text style={[styles.welcomeText, darkMode ? styles.darkWelcomeText : styles.lightWelcomeText]}>
                    {isEnglish ? "Exhibits" : "Exponate"}
                </Text>

                <View style={styles.searchContainer}>
                    <View style={[
                        styles.searchBox,
                        darkMode ? styles.darkInputBorder : styles.lightInputBorder
                    ]}>
                        <TextInput
                            style={[styles.searchBar, darkMode ? styles.darkInputText : styles.lightInputText]}
                            placeholder={isEnglish ? "Search Exhibits" : "Exponate suchen"}
                            placeholderTextColor={darkMode ? "#bbb" : "#333"}
                            value={searchText}
                            onChangeText={text => setSearchText(text)}
                        />
                        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilters(!showFilters)}>
                            <Image style={{ width: 20, height: 20 }} source={Filter} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {showFilters && (
                <View style={[styles.dropdown, darkMode ? styles.darkDropdown : styles.lightDropdown]}>
                    <View style={styles.checkBoxItem}>
                        <CheckBox
                            value={searchByTitle}
                            onValueChange={() => setSearchByTitle(!searchByTitle)}
                        />
                        <Text style={darkMode ? styles.darkText : styles.lightText}>
                            {isEnglish ? "Search by Title" : "Suche nach Titel"}
                        </Text>
                    </View>
                </View>
            )}

            <View style={{ margin: 10, flexDirection: "row" }}>
                <Text style={[styles.listValueName, { width: 300 }, darkMode ? styles.darkText : styles.lightText]}>Exponate-ID</Text>
                <Text style={[styles.listValueName, { width: 300 }, darkMode ? styles.darkText : styles.lightText]}>{isEnglish ? "Title" : "Titel"}</Text>
                <Text style={[styles.listValueName, { width: 300 }, darkMode ? styles.darkText : styles.lightText]}>{isEnglish ? "Category" : "Kategorie"}</Text>
                <Text style={[styles.listValueName, { width: 1000 }, darkMode ? styles.darkText : styles.lightText]}>{isEnglish ? "Weight" : "Gewicht"}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.simpleList}>
                    {filteredExponate.length > 0 ? (
                        filteredExponate.map((exponat, index) => (
                            <View style={{ width: 1300, flexDirection: "row" }} key={index}>
                                <View style={[styles.simpleListItem, darkMode ? styles.darkListItem : styles.lightListItem]}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={[styles.listText, { width: 300 }, darkMode ? styles.darkText : styles.lightText]}>
                                            {exponat.exponatId}
                                        </Text>
                                        <Text style={[styles.listText, { width: 300 }, darkMode ? styles.darkText : styles.lightText]}>
                                            {exponat.titel}
                                        </Text>
                                        <Text style={[styles.listText, { width: 300 }, darkMode ? styles.darkText : styles.lightText]}>
                                            {exponat.kategorie}
                                        </Text>
                                        <Text style={[styles.listText, { width: 1000 }, darkMode ? styles.darkText : styles.lightText]}>
                                            {exponat.gewicht}
                                        </Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity>
                                            <Image style={{ width: 25, height: 25 }} source={arrow} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text style={darkMode ? styles.darkText : styles.lightText}>
                            {isEnglish ? "No exhibits found" : "Keine Exponate gefunden"}
                        </Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'flex-start',
    },
    lightBg: {
        backgroundColor: '#fff',
    },
    darkBg: {
        backgroundColor: 'rgb(18, 18, 18)',
    },
    welcomeText: {
        fontWeight: "bold",
        fontSize: 50,
        marginBottom: 20,
    },
    lightWelcomeText: {
        color: 'rgba(240,175,77,1)',
    },
    darkWelcomeText: {
        color: 'rgb(85, 129, 176)',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginLeft: 635,
        width: '30%',
    },
    searchBox: {
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: "row",
        width: 467.5,
    },
    lightInputBorder: {
        borderColor: 'gray',
    },
    darkInputBorder: {
        borderColor: 'rgb(85, 129, 176)',
    },
    searchBar: {
        flex: 1,
        padding: 10,
    },
    lightInputText: {
        color: '#000',
    },
    darkInputText: {
        color: '#fff',
    },
    filterButton: {
        padding: 10,
        borderRadius: 5,
    },
    dropdown: {
        position: 'absolute',
        top: 70,
        left: 872,
        right: 20,
        borderRadius: 5,
        padding: 10,
        elevation: 50,
        width: 468,
        zIndex: 10,
        borderWidth: 1,
    },
    lightDropdown: {
        backgroundColor: 'white',
        borderColor: 'lightgray',
    },
    darkDropdown: {
        backgroundColor: 'rgb(34, 34, 34)',
        borderColor: 'rgb(85, 129, 176)',
    },
    checkBoxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    scrollViewContent: {
        alignItems: 'center',
    },
    simpleList: {
        padding: 10,
        borderRadius: 5,
        width: '100%',
    },
    simpleListItem: {
        flexDirection: "row",
        fontSize: 16,
        paddingVertical: 5,
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
    },
    lightListItem: {
        borderBottomColor: '#ddd',
    },
    darkListItem: {
        borderBottomColor: 'rgb(85, 129, 176)',
    },
    listText: {
        fontWeight: "bold",
        fontSize: 12,
    },
    lightText: {
        color: "#000",
    },
    darkText: {
        color: "#fff",
    },
    listValueName: {
        fontWeight: "bold",
        fontSize: 18,
    },
});

export default Exponate;