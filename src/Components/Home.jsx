import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { useNavigate } from 'react-router-dom';
import arrow from "./AlwaysActive/images/arrow.png";
import { personList,exponateList } from '../Application/Classes/testDataGenerator';
import {fetchAllPersons} from "../Application/Services/personService";
import {fetchAllExponate} from "../Application/Services/exponateService";
import {fetchAllAuctions} from "../Application/Services/auktionenService";

const persons = personList;
const exponate = exponateList;
//const auctions = auctionList; TODO

const Home = ({ darkMode, setDarkMode, isEnglish, setEnglish }) => {
    const [persons, setPersons] = useState([]);
    const [auctions, setAuctions] = useState([]);
    const [exponate, setExponate] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadAuctions = async () => {
            try {
                const data = await fetchAllAuctions();
                setAuctions(data);
            } catch (err) {
                setError(isEnglish ? "Error loading auctions." : "Fehler beim Laden der Auktionen.");
            } finally {
                setLoading(false);
            }
        };

        loadAuctions();
        console.log(auctions);
    }, []);
    useEffect(() => {
        const loadExponate = async () => {
            try {
                const allExponate = await fetchAllExponate();
                console.log('Geladene Exponate:', allExponate);
                setExponate(allExponate);
            } catch (err) {
                setError('Daten konnten nicht geladen werden.');
            } finally {
                setLoading(false);
            }
        };
        loadExponate();
    }, []);

    useEffect(() => {
        const loadPersons = async () => {
            try {
                const allPersons = await fetchAllPersons();
                setPersons(allPersons);
            } catch (err) {
                setError("Daten konnten nicht geladen werden.");
            } finally {
                setLoading(false);
            }
        };

        loadPersons();
        console.log(persons);
    }, []);


    const handleNavigation = (route) => {
        navigate(route);
    };

    const handleHover = (index) => {
        setHoveredIndex(index);
    };

    const renderPerson = ({ item, index }) => (
        <View
            style={{ width: 400, flexDirection: "row" }}
            key={index}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleHover(null)}
        >
            <View style={stylesTexts.simpleListItem}>
                <View style={{ flexDirection: "row", width: 400 }}>
                    <Text style={[darkMode ? { fontWeight:"bold",fontSize: 12 , color:"white"} : { fontWeight:"bold",fontSize: 12 , color:"rgba(33,33,33,1)"}]}>
                        {item.nachname}
                    </Text>
                    <Text> </Text>
                    <Text style={[{fontSize: 12,width:100},darkMode ? {color:"white"}:{color:"black"}]}>{item.vorname}</Text>
                </View>
            </View>
        </View>
    );

    const renderAuction = ({ item, index }) => (
        <View
            style={{ width: 400, flexDirection: "row" }}
            key={index}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleHover(null)}
        >
            <View style={stylesTexts.simpleListItem}>
                <View style={{ flexDirection: "row", width: 400 }}>
                    <Text style={[darkMode ? { fontWeight:"bold",fontSize: 12 , color:"black"} : { fontWeight:"bold",fontSize: 12 , color:"rgba(33,33,33,1)"}]}>
                        {item.id}
                    </Text>
                    <Text>                </Text>
                    <Text style={[darkMode ? { fontWeight:"bold",fontSize: 12 , color:"white"} : { fontWeight:"bold",fontSize: 12 , color:"rgba(33,33,33,1)"}]}>
                        {item.title}
                    </Text>
                    <Text> </Text>
                </View>
            </View>
        </View>
    );

    const renderExpon = ({ item, index }) => (
        <View
            style={{ width: 400, flexDirection: "row" }}
            key={index}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleHover(null)}
        >
            <View style={stylesTexts.simpleListItem}>
                <View style={{ flexDirection: "row", width: 1000 }}>
                    <Text style={[{width:100},darkMode ? { fontWeight:"bold",fontSize: 12 , color:"white"} : { fontWeight:"bold",fontSize: 12 , color:"rgba(33,33,33,1)"}]}>
                        {item.exponatId}
                    </Text>
                    <Text style={[{fontSize: 12,width:180}, darkMode ? {color:"white"}:{color:"black"}]}>{item?.titel}</Text>
                    <Text style={[{fontSize: 12,width:100}, darkMode ? {color:"white"}:{color:"black"}]}>{item?.kategorie?.name}</Text>
                    <Text style={[{fontSize: 12,width:100}, darkMode ? {color:"white"}:{color:"black"}]}>{item?.masse}</Text>
                    <Text style={[{fontSize: 12,width:100}, darkMode ? {color:"white"}:{color:"black"}]}>{item?.gewicht}</Text>
                    <Text style={[{fontSize: 12,width:300}, darkMode ? {color:"white"}:{color:"black"}]}>{item?.kommentar}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={stylesContainers.container}>
            <View style={stylesContainers.welcomeView}>
                <Text style={[stylesTexts.welcomeText, darkMode ? stylesTexts.darkWelcomeText : stylesTexts.lightWelcomeText]}>
                    {isEnglish ? "Welcome!" : "Willkommen!"}
                </Text>
            </View>
            <View style={stylesContainers.diffcont}>
                <View style={[stylesContainers.viewListExponate, darkMode ? stylesContainers.viewListColD : stylesContainers.viewListColL]}>
                    <View>
                        <View style={{ flexDirection: "row", marginLeft:20, marginRight:20, marginTop: 20 }}>
                            <Text style={[stylesTexts.titleOfLists, darkMode ? stylesTexts.titleOfListsD : stylesTexts.titleOfListsL]}>{isEnglish ? "Exhibits" : "Exponate"}</Text>
                            <View style={{ paddingLeft: 850 }}>
                                <TouchableOpacity onPress={() => handleNavigation("/exponate")}>
                                    <Image style={stylesTexts.images} source={arrow} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginLeft:20, marginRight:20, marginTop: 3 }}>
                        <View style={{flexDirection:"row"}}>
                            <Text style={[stylesTexts.listValueName, { width: 100 }, darkMode ? stylesTexts.listValueNameD : stylesTexts.listValueNameL]}>ID</Text>
                            <Text style={[stylesTexts.listValueName, { width: 180 }, darkMode ? stylesTexts.listValueNameD : stylesTexts.listValueNameL]}>{isEnglish ? "Title" : "Titel"}</Text>
                            <Text style={[stylesTexts.listValueName, { width: 100 }, darkMode ? stylesTexts.listValueNameD : stylesTexts.listValueNameL]}>{isEnglish ? "Category" : "Kategorie"}</Text>
                            <Text style={[stylesTexts.listValueName, { width: 100 }, darkMode ? stylesTexts.listValueNameD : stylesTexts.listValueNameL]}>{isEnglish ? "Mass" : "Mass"}</Text>
                            <Text style={[stylesTexts.listValueName, { width: 100 }, darkMode ? stylesTexts.listValueNameD : stylesTexts.listValueNameL]}>{isEnglish ? "Weight" : "Gewicht"}</Text>
                            <Text style={[stylesTexts.listValueName, { width: 100 }, darkMode ? stylesTexts.listValueNameD : stylesTexts.listValueNameL]}>{isEnglish ? "Comment" : "Kommentar"}</Text>

                        </View>
                        <View style={{height: 230,marginTop:3 }}>
                            <FlatList
                                data={exponate}
                                renderItem={renderExpon}  // Render jede Person
                                keyExtractor={(item, index) => index.toString()}
                                initialNumToRender={10}   // Zeige die ersten 10 Elemente an
                                maxToRenderPerBatch={10}  // Maximal 10 Elemente gleichzeitig rendern
                                windowSize={5}            // Fenstergröße für das virtuelle Rendering
                            />
                        </View>
                    </View>
                </View>
                <View style={[stylesContainers.viewListPersonen, darkMode ? stylesContainers.viewListColD : stylesContainers.viewListColL]}>
                    <View>
                        <View style={{ flexDirection: "row", marginLeft:20, marginRight:20, marginTop: 20 }}>
                            <Text style={[stylesTexts.titleOfLists, darkMode ? stylesTexts.titleOfListsD : stylesTexts.titleOfListsL]}>{isEnglish ? "Persons" : "Personen"}</Text>
                            <View style={{ paddingLeft: 150 }}>
                                <TouchableOpacity onPress={() => handleNavigation("/persons")}>
                                    <Image style={stylesTexts.images} source={arrow} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginLeft:20, marginRight:20, marginTop: 3 }}>
                        <Text style={[stylesTexts.listValueName, { width: 100 }, darkMode ? stylesTexts.listValueNameD : stylesTexts.listValueNameL]}>Name</Text>
                        <View style={{height: 230,marginTop:3 }}>
                            <FlatList
                                data={persons}
                                renderItem={renderPerson}  // Render jede Person
                                keyExtractor={(item, index) => index.toString()}
                                initialNumToRender={10}   // Zeige die ersten 10 Elemente an
                                maxToRenderPerBatch={10}  // Maximal 10 Elemente gleichzeitig rendern
                                windowSize={5}            // Fenstergröße für das virtuelle Rendering
                            />
                        </View>
                    </View>
                </View>
            </View>
            <View style={[stylesContainers.viewListAuktionen, darkMode ? stylesContainers.viewListColD : stylesContainers.viewListColL]}>
                <View>
                    <View style={{ flexDirection: "row", marginLeft:20, marginRight:20, marginTop: 20 }}>
                        <Text style={[stylesTexts.titleOfLists, darkMode ? stylesTexts.titleOfListsD : stylesTexts.titleOfListsL]}>{isEnglish ? "Auctions" : "Auktionen"}</Text>
                        <View style={{ paddingLeft: 1175 }}>
                            <TouchableOpacity onPress={() => handleNavigation("/auction")}>
                                <Image style={stylesTexts.images} source={arrow} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ marginLeft:20, marginRight:20, marginTop: 3 }}>
                    <View style={{flexDirection:"row"}}>
                    <Text style={[stylesTexts.listValueName, { width: 67 }, darkMode ? stylesTexts.listValueNameD : stylesTexts.listValueNameL]}>ID</Text>
                    <Text style={[stylesTexts.listValueName, { width: 100 }, darkMode ? stylesTexts.listValueNameD : stylesTexts.listValueNameL]}>Name</Text>
                    </View>
                    <View style={{height: 230,marginTop:3 }}>
                        <FlatList
                            data={auctions}
                            renderItem={renderAuction}  // Render jede Person
                            keyExtractor={(item, index) => index.toString()}
                            initialNumToRender={10}   // Zeige die ersten 10 Elemente an
                            maxToRenderPerBatch={10}  // Maximal 10 Elemente gleichzeitig rendern
                            windowSize={5}            // Fenstergröße für das virtuelle Rendering
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const stylesContainers = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        width: 1350,
        paddingLeft: 20
    },
    diffcont: {
        flexDirection: "row",
        padding: 20
    },
    viewListExponate: {
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        height: 300,
        width: 1000,
        margin: 10
    },
    viewListPersonen: {
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        height: 300,
        width: 300,
        margin: 10
    },
    viewListAuktionen: {
        borderWidth: 1,
        borderRadius: 5,
        height: 300,
        width: 1325,
    },
    viewListColD:{
        borderColor: 'rgb(85, 129, 176)',

    },
    viewListColL:{
        borderColor: 'lightgray',
    },
    welcomeView: {
        paddingTop: 40,
        paddingBottom: 20,
    },
    simpleList: {
        padding: 10,
        borderRadius: 5,
        width: '100%',
    },
});

const stylesTexts = StyleSheet.create({
    welcomeText: {
        color: 'rgba(240,175,77,1)',
        fontWeight: "bold",
        fontSize: 50,
    },
    lightWelcomeText: {
        color: 'rgba(240,175,77,1)',
    },
    darkWelcomeText: {
        color: 'rgb(85, 129, 176)',
    },
    titleOfLists: {
        fontWeight: "bold",
        fontSize: 17
    },
    titleOfListsL:{
        color: 'rgba(141,69,85,1)',
    },
    titleOfListsD:{
        color: 'rgba(85,129,176,1)',
    },
    listValueName: {
        fontWeight: "bold",
        fontSize: 14
    },
    listValueNameL:{
        color: "black"
    },
    listValueNameD:{
        color: "white"
    },
    images: {
        width: 20,
        height: 20,
    },
    simpleListItem: {
        flexDirection: "row",
        fontSize: 16,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});

export default Home;