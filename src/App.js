import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Components/Home";
import Gallery from "./Components/Gallery";
import Settings from "./Components/Settings";
import Exponate from "./Components/Exponate";
import Auction from "./Components/Auction";
import Persons from "./Components/Persons";
import Graphs from "./Components/Graphs";
import LeftBar from "./Components/AlwaysActive/LeftBar";
import TopBar from './Components/AlwaysActive/TopBar';
import Search from './Components/Search';
import Login from "./Components/Login";
import PersonDetail from './Components/FurtherInformation/PersonDetail';
import { StyleSheet, View } from 'react-native';
import { fetchAllPersons } from './Application/Services/personService';

function App() {
    const [fLogin, setLogin] = useState(false); // Login-Status
    const [persons, setPersons] = useState([]); // Personenliste
    const [darkMode, setDarkMode] = useState(false); // Dark Mode global steuern
    const [isEnglish, setEnglish] = useState(false); // Sprache global steuern

    useEffect(() => {
        const loadPersons = async () => {
            try {
                const data = await fetchAllPersons();
                setPersons(data);
            } catch (error) {
                console.error("Fehler beim Laden der Personen:", error);
            }
        };

        loadPersons();
    }, []);

    return (
        <Router>
            <div className={`Kinsky-Frontend ${darkMode ? "dark-mode" : "light-mode"}`}>
                {fLogin ? (
                    <View style={[stylesContainers.containerRow, darkMode ? stylesContainers.darkBg : stylesContainers.lightBg]}>
                        <LeftBar darkMode={darkMode} isEnglish={isEnglish} />
                        <View style={stylesContainers.containerColumn}>
                            <TopBar darkMode={darkMode} isEnglish={isEnglish} />
                            <View style={[stylesContainers.content, darkMode ? stylesContainers.darkBg : stylesContainers.lightBg]}>
                                <Routes>
                                    <Route path="/" element={<Home darkMode={darkMode} isEnglish={isEnglish} />} />
                                    <Route path="/gallery" element={<Gallery darkMode={darkMode} isEnglish={isEnglish} />} />
                                    <Route path="/settings" element={
                                        <Settings
                                            darkMode={darkMode} setDarkMode={setDarkMode}
                                            isEnglish={isEnglish} setEnglish={setEnglish}
                                        />
                                    }/>
                                    <Route path="/exponate" element={<Exponate darkMode={darkMode} isEnglish={isEnglish} />} />
                                    <Route path="/persons" element={<Persons persons={persons} darkMode={darkMode} isEnglish={isEnglish} />} />
                                    <Route path="/person/:id" element={<PersonDetail persons={persons} darkMode={darkMode} isEnglish={isEnglish} />} />
                                    <Route path="/search" element={<Search darkMode={darkMode} isEnglish={isEnglish} />} />
                                    <Route path="/auction" element={<Auction darkMode={darkMode} isEnglish={isEnglish} />} />
                                    <Route path="/graphs" element={<Graphs darkMode={darkMode} isEnglish={isEnglish} />} />
                                </Routes>
                            </View>
                        </View>
                    </View>
                ) : (
                    <Login setLogin={setLogin} />
                )}
            </div>
        </Router>
    );
}

const stylesContainers = StyleSheet.create({
    containerRow: { flexDirection: "row", height: '100vh' },
    containerColumn: { flexDirection: "column", flex: 1 },
    content: { flex: 1, padding: 10 },
    lightBg: { backgroundColor: "#FFFFFF" }, // Heller Modus
    darkBg: { backgroundColor: "rgb(18, 18, 18)" }, // Dark Mode Hintergrund
});

export default App;