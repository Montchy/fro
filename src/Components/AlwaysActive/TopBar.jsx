import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigate } from 'react-router-dom';
import cut from "./images/cut.png";

const TopBar = ({ darkMode }) => { // Dark Mode als Prop empfangen

    const navigate = useNavigate();

    const handleNavigation = (route) => {
        navigate(route);
    };

    return(
        <View style={stylesContainers.container}>
            <View style={stylesContainers.titlev}>
                <Text style={[stylesContainers.iksk, darkMode ? stylesContainers.ikskDark : stylesContainers.ikskLight]}>
                    Im Kinsky
                </Text>
            </View>
            <View style={stylesContainers.ocon}>
                <View style={{ paddingRight: 10 }}>
                    <TouchableOpacity onPress={() => handleNavigation("/login")}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View>
                                <Text style={stylesContainers.gr}>Angemeldete Person </Text>
                            </View>
                            <Image style={stylesContainers.images} source={cut} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const stylesContainers = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'center',
        width: 1800,
        height: 76,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
    },
    titlev: {
        paddingLeft: 30,
    },
    iksk: {
        fontSize: 25,
        fontWeight: "bold",
    },
    ikskLight: {
        color: 'rgba(246,203,108,1)', // Standardfarbe für Light Mode
    },
    ikskDark: {
        color: 'rgb(85, 129, 176)', // Blaue Schrift im Dark Mode
    },
    gr: {
        color: "grey",
    },
    ocon: {
        paddingLeft: 1050,
        alignItems: 'center',
        flexDirection: "row",
    },
    images: {
        width: 55,
        height: 55,
    },
});

export default TopBar;