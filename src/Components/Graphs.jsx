import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview"; // Falls du mobil testen willst

const Graphs = () => {
    return (
        <View style={styles.container}>

            <iframe
                src="/html/dashboardAnalysen.html"  // Stelle sicher, dass die Datei in `public/html/` liegt
                width="100%"
                height="800px"
                style={{ border: "none" }}
                title="Statistics"
            ></iframe>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
});

export default Graphs;