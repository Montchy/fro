import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Gallery = ({ darkMode, isEnglish }) => {
    return (
        <View style={[styles.container, darkMode ? styles.darkBg : styles.lightBg]}>
            <Text style={[styles.text, darkMode ? styles.darkText : styles.lightText]}>
                {isEnglish ? "Gallery" : "Galerie"}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lightBg: { backgroundColor: "#fff" },
    darkBg: { backgroundColor: "rgb(18, 18, 18)" },
    lightText: { color: "#000" },
    darkText: { color: "#fff" },
});

export default Gallery;