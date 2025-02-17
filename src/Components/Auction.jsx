import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { fetchAllAuctions } from "../Application/Services/auktionenService";

const Auctions = ({ darkMode, isEnglish }) => {
    const [auctions, setAuctions] = useState([]);
    const [selectedAuction, setSelectedAuction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <View style={[styles.container, darkMode ? styles.darkBg : styles.lightBg]}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={[styles.title, darkMode ? styles.darkTitle : styles.lightTitle]}>
                    {isEnglish ? "Auctions" : "Auktionen"}
                </Text>
            </View>

            {/* Button-Leiste und Informationen-Leiste */}
            <View style={styles.topBar}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flexDirection: "column" }}>
                        <View style={[styles.buttonsContainer, darkMode ? styles.darkButtonBg : styles.lightButtonBg]}>
                            {[
                                isEnglish ? "General" : "Allgemein",
                                isEnglish ? "Bidding" : "Bieten",
                                isEnglish ? "Orders" : "Kaufaufträge",
                                isEnglish ? "Exhibits" : "Exponate",
                                isEnglish ? "Requests" : "Anforderungen",
                            ].map((button, index) => (
                                <TouchableOpacity key={index} style={styles.button}
                                >
                                    <Text style={[styles.buttonText, darkMode ? styles.darkText : styles.lightText]}>
                                        {button}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* ScrollView für die Auktionen */}
                        <ScrollView style={styles.listview}>
                            {loading ? (
                                <Text style={[styles.loadingText, darkMode ? styles.darkText : styles.lightText]}>
                                    {isEnglish ? "Loading auctions..." : "Auktionen werden geladen..."}
                                </Text>
                            ) : error ? (
                                <Text style={[styles.errorText, darkMode ? styles.darkText : styles.lightText]}>
                                    {error}
                                </Text>
                            ) : (
                                auctions.length > 0 ? (
                                    auctions.map((auction, index) => (
                                        <TouchableOpacity key={index}
                                                          style={[styles.auctionItem, darkMode ? styles.darkAuctionItem : styles.lightAuctionItem]}
                                                          onPress={() => setSelectedAuction(auction)}
                                        >
                                            <Text style={[styles.auctionTitle, darkMode ? styles.darkText : styles.lightText]}>
                                                {auction.title}
                                            </Text>
                                            <Text style={[styles.auctionDetails, darkMode ? styles.darkText : styles.lightText]}>
                                                {isEnglish ? "Start Date: " : "Startdatum: "} {auction.startDate}
                                            </Text>
                                            <Text style={[styles.auctionDetails, darkMode ? styles.darkText : styles.lightText]}>
                                                {isEnglish ? "End Date: " : "Enddatum: "} {auction.endDate}
                                            </Text>
                                            <Text style={[styles.auctionDetails, darkMode ? styles.darkText : styles.lightText]}>
                                                {isEnglish ? "Status: " : "Status: "} {auction.status}
                                            </Text>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <Text style={[styles.noDataText, darkMode ? styles.darkText : styles.lightText]}>
                                        {isEnglish ? "No auctions available." : "Keine Auktionen verfügbar."}
                                    </Text>
                                )
                            )}
                        </ScrollView>
                    </View>
                </View>

                <View style={styles.infoWrapper}>
                    <View style={[styles.infoContainer, darkMode ? styles.darkButtonBg : styles.lightButtonBg]}>
                        <Text style={[styles.infoText, darkMode ? styles.darkText : styles.lightText]}>
                            {isEnglish ? "Information" : "Informationen"}
                        </Text>
                    </View>

                    {/* Detailansicht der ausgewählten Auktion */}
                    <View style={[styles.mainContent, darkMode ? styles.darkMainContent : styles.lightMainContent]}>
                        {selectedAuction ? (
                            <View style={styles.infoDetails}>
                                {[
                                    { label: isEnglish ? "ID" : "ID", value: " "+selectedAuction.id },
                                    { label: isEnglish ? "Title" : "Titel", value: " "+selectedAuction.title },
                                    { label: isEnglish ? "Start Date" : "Startdatum", value: " "+selectedAuction.startDate },
                                    { label: isEnglish ? "End Date" : "Enddatum", value: " "+selectedAuction.endDate },
                                    { label: isEnglish ? "Status" : "Status", value: " "+selectedAuction.status },
                                ].map((item, index) => (
                                    <View key={index} style={styles.detailRow}>
                                        <Text style={[styles.detailLabel, darkMode ? styles.darkText : styles.lightText]}>
                                            {item.label}:
                                        </Text>
                                        <Text style={[styles.detailValue, darkMode ? styles.darkText : styles.lightText]}>
                                            {item.value}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        ) : (
                            <Text style={[styles.noSelectionText, darkMode ? styles.darkText : styles.lightText]}>
                                {isEnglish ? "Select an auction to view details." : "Wählen Sie eine Auktion für Details."}
                            </Text>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    lightBg: { backgroundColor: "#fff" },
    darkBg: { backgroundColor: "rgb(18, 18, 18)" },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontWeight: "bold",
        fontSize: 50,
    },
    lightTitle: { color: "rgba(240,175,77,1)" },
    darkTitle: { color: "rgb(85, 129, 176)" },

    topBar: {
        flexDirection: "row",
        marginBottom: 0,
        flex: 1,
    },
    buttonsContainer: {
        flex: 3,
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        width: 800,
    },
    listview: {
        width: 800,
        height: 575,
        backgroundColor: "rgba(255,255,255,0.1)",
        marginTop: 10,
        borderRadius: 5,
        padding: 10,
    },

    lightButtonBg: { backgroundColor: "rgb(247,203,105)" },
    darkButtonBg: { backgroundColor: "rgb(29, 67, 158)" },

    button: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontWeight: "bold",
    },
    lightText: { color: "black" },
    darkText: { color: "white" },

    auctionItem: {
        padding: 15,
        marginVertical: 5,
        borderRadius: 5,
    },
    lightAuctionItem: {
        backgroundColor: "rgb(253,241,219)",
        borderWidth: 1,
        borderColor: "rgb(247,203,105)",
    },
    darkAuctionItem: {
        backgroundColor: "rgb(34, 34, 34)",
        borderWidth: 1,
        borderColor: "rgb(85, 129, 176)",
    },

    auctionTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    auctionDetails: {
        fontSize: 14,
        marginTop: 3,
    },
    loadingText: {
        fontSize: 16,
        textAlign: "center",
        paddingVertical: 10,
    },
    errorText: {
        fontSize: 16,
        textAlign: "center",
        color: "red",
        paddingVertical: 10,
    },
    noDataText: {
        fontSize: 16,
        textAlign: "center",
        paddingVertical: 10,
    },

    infoWrapper: {
        flex: 1,
        marginLeft: 10,
    },
    infoContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 50,
    },
    infoText: {
        fontWeight: "bold",
        textAlign: "center",
    },
    mainContent: {
        flex: 1,
        borderTopWidth: 1,
    },
    lightMainContent: {
        backgroundColor: "rgb(253,241,219)",
        borderTopColor: "rgb(247,203,105)",
    },
    darkMainContent: {
        backgroundColor: "rgb(34, 34, 34)",
        borderTopColor: "rgb(85, 129, 176)",
    },
    infoDetails: { marginTop: 10 },
    detailRow: { flexDirection: "row", marginBottom: 5 },
    detailLabel: { fontWeight: "bold", fontSize: 14 },
    detailValue: { fontSize: 14 },
    noSelectionText: { textAlign: "center", fontSize: 16 },
});

export default Auctions;