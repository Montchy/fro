import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Easing } from 'react-native';


const home = () => {
    return(
        <View style={stylesContainers.container}>
            <Text>Test test home</Text>
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
export default home;
 