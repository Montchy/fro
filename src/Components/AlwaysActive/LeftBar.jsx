import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigate } from 'react-router-dom';
import balk1 from "./images/speisekarte.png";
import lup2 from "./images/suche.png";
import haus3 from "./images/haus.png";
import user4 from "./images/nutzer.png";
import bild5 from "./images/galerie.png";
import auk6 from "./images/richter.png";
import gra7 from "./images/gr.png";
import rob from "./images/roboz.png";
import setting8 from "./images/die-einstellungen.png";

const LeftBar = ({ darkMode }) => {  // Dark Mode als Prop empfangen
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const navigate = useNavigate();

    const buttons = [
        { image: balk1, route: '/' },
        { image: lup2, route: '/search' },
        { image: haus3, route: '/exponate' },
        { image: user4, route: '/persons' },
<<<<<<< HEAD
        { image: bild5, route: '/gallery' },
        
=======
>>>>>>> 24c475ca6a2224661c71331dbd75c207ce0d39c8
        { image: auk6, route: '/auction' },
        { image: gra7, route: '/graphs' },
        { image: rob, route: '/chatbot' },
    ];

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const handleNavigation = (route) => {
        navigate(route);
    };

    return (
        <View style={[styles.container, darkMode ? styles.darkContainer : styles.lightContainer]}>
            <View>
                {buttons.map((button, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.buttons,
                            hoveredIndex === index && (darkMode ? styles.darkHoveredButton : styles.lightHoveredButton),
                        ]}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        onPress={() => handleNavigation(button.route)}
                    >
                        <Image style={styles.images} source={button.image} />
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.setdownview}>
                <TouchableOpacity
                    style={[
                        styles.buttons,
                        hoveredIndex === buttons.length && (darkMode ? styles.darkHoveredButton : styles.lightHoveredButton),
                    ]}
                    onMouseEnter={() => handleMouseEnter(buttons.length)}
                    onMouseLeave={handleMouseLeave}
                    onPress={() => handleNavigation('/settings')}
                >
                    <Image style={styles.images} source={setting8} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 77,
        height: '100vh',
    },
    lightContainer: {
        backgroundColor: 'rgba(250,228,181,1)', // Standard-Hintergrundfarbe (hell)
    },
    darkContainer: {
        backgroundColor: 'rgb(139, 175, 249)', // Dark Mode Hintergrund
    },
    buttons: {
        padding: 25,
        backgroundColor: 'transparent',
    },
    lightHoveredButton: {
        backgroundColor: 'rgba(246,203,108,1)', // Heller Hover-Effekt
    },
    darkHoveredButton: {
        backgroundColor: 'rgb(85, 129, 176)', // Dark Mode Hover-Farbe
    },
    images: {
        width: 25,
        height: 25,
    },
    setdownview: {
        marginTop: 280,
    },
});

export default LeftBar;