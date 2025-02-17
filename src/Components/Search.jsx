import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Easing } from 'react-native';


const search = () => {
    return(
        <View style={stylesContainers.container}>
            <Text>Search</Text>

        </View>
    );

};

const stylesContainers = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },

});
export default search;
