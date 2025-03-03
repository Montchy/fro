import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    TextInput,
    Image,
    CheckBox,
} from 'react-native';
import { useNavigate } from 'react-router-dom';
import Squ4 from './AlwaysActive/images/sq4.png';
import listic from './AlwaysActive/images/listic.png';
import sqw from './AlwaysActive/images/cl.png';
import listw from './AlwaysActive/images/wl.png';
import Filter from './AlwaysActive/images/filter.png';
import arrow from './AlwaysActive/images/arrow.png';
import { fetchAllExponate } from '../Application/Services/exponateService';

const Exponate = ({ darkMode, isEnglish }) => {
    const [exponate, setExponate] = useState([]);
    const [filteredExponate, setFilteredExponate] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchByTitle, setSearchByTitle] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadExponate = async () => {
            try {
                const allExponate = await fetchAllExponate();
                console.log('Geladene Exponate:', allExponate);
                setExponate(allExponate);
                setFilteredExponate(allExponate);
            } catch (err) {
                setError('Daten konnten nicht geladen werden.');
            } finally {
                setLoading(false);
            }
        };
        loadExponate();
    }, []);

    useEffect(() => {
        const filterExponate = () => {
            const lowercasedSearchText = searchText.toLowerCase();
            const filtered = exponate.filter((expo) =>
                searchByTitle ? expo.titel.toLowerCase().includes(lowercasedSearchText) : true
            );
            setFilteredExponate(filtered);
        };
        filterExponate();
    }, [searchText, searchByTitle, exponate]);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size='large' color='#f0af4d' />
                <Text>Daten werden geladen...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.title, darkMode ? styles.darkText : styles.lightText]}>
                {isEnglish ? 'Exhibits' : 'Exponate'}
            </Text>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {filteredExponate.map((expo, index) => (
                    <View key={index} style={styles.exponateBox}>
                        <TouchableOpacity onPress={() => navigate(`/exponat/${expo.id}`)}>
                            <Text style={styles.exponateTitle}>{expo?.titel ?? 'Unbekannt'}</Text>
                            <Text style={styles.detailText}>Kategorie: {expo?.kategorie?.name ?? 'Keine Kategorie'}</Text>
                            <Text style={styles.detailText}>Gewicht: {expo?.gewicht ?? 'Kein Gewicht'}</Text>
                            <Text style={styles.detailText}>Masse: {expo?.masse ?? 'Keine Masse'}</Text>
                            <Text style={styles.detailText}>Kommentar: {expo?.kommentar ?? 'Kein Kommentar'}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    errorText: { color: 'red', fontSize: 16 },
    title: { fontSize: 32, fontWeight: 'bold' },
    exponateBox: { padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 },
    exponateTitle: { fontWeight: 'bold', fontSize: 20, marginBottom: 5 },
    detailText: { fontSize: 16, marginVertical: 2 },
    darkText: { color: '#fff' },
    lightText: { color: '#000' },
});

export default Exponate;
