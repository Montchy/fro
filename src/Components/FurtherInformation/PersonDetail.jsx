import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Switch, Picker } from 'react-native';

const PersonDetail = ({ persons }) => {
    const { id } = useParams(); // ID aus der URL
    const [person, setPerson] = useState(null);
    const [imageUri, setImageUri] = useState('https://via.placeholder.com/250');
    const [selectedTab, setSelectedTab] = useState('Allgemein'); // Initialer Tab
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("DETAILS: ", JSON.stringify(persons, null, 2));
        console.log("URL Parameter (id): ", id);

        if (id && persons) {
            const foundPerson = persons?.find((p) => p?.id?.toString() === id);
            console.log("Gefundene Person: ", foundPerson);

            if (!foundPerson) {
                setError(`Keine Person mit der ID ${id} gefunden.`);
            } else {
                setPerson(foundPerson);
            }
        } else {
            setError("Fehlerhafte Daten: URL-Parameter oder Personenliste fehlt.");
        }
    }, [id, persons]);

    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => setImageUri(reader.result);
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    const renderField = (field) => {
        if (field.type === 'text') {
            return (
                <TextInput
                    style={styles.input}
                    value={field.value?.toString() || 'Nicht angegeben'}
                    placeholder={field.placeholder || 'Nicht angegeben'}
                    editable={false}
                />
            );
        } else if (field.type === 'boolean') {
            return (
                <Switch
                    value={field.value || false}
                    disabled={true}
                />
            );
        } else if (field.type === 'enum') {
            return (
                <Picker
                    selectedValue={field.value || ''}
                    style={styles.input}
                    enabled={false}
                >
                    {field.options.map((option, index) => (
                        <Picker.Item key={index} label={option} value={option} />
                    ))}
                </Picker>
            );
        }
        return null;
    };

    const renderTabContent = (fields) => (
        <View style={styles.contentColumns}>
            <View style={styles.leftColumn}>
                {fields.slice(0, Math.ceil(fields.length / 2)).map((field, index) => (
                    <View key={index} style={styles.row}>
                        <Text style={styles.label}>{field.label}:</Text>
                        {renderField(field)}
                    </View>
                ))}
            </View>
            <View style={styles.rightColumn}>
                {fields.slice(Math.ceil(fields.length / 2)).map((field, index) => (
                    <View key={index} style={styles.row}>
                        <Text style={styles.label}>{field.label}:</Text>
                        {renderField(field)}
                    </View>
                ))}
            </View>
        </View>
    );

    const renderContent = () => {
        if (!person) return null;

        return renderTabContent([
            { label: 'Personen-Nummer', value: person.id, type: 'text' },
            { label: 'Vorname', value: person.vorname, type: 'text' },
            { label: 'Nachname', value: person.nachname, type: 'text' },
            { label: 'E-Mail', value: person.email, type: 'text' },
            { label: 'Telefon', value: person.telefon, type: 'text' },
            { label: 'Adresse', value: person.adresse, type: 'text' },
            { label: 'Typ', value: person.typ, type: 'text' },
            {label: "ImageBitea",value:person.imageData, type: "text"}
        ]);
    };

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.nameContainer}>
                    <Text style={styles.welcomeText}>{person?.vorname || 'Unbekannt'}</Text>
                    <Text style={styles.welcomeText}>{person?.nachname || 'Unbekannt'}</Text>
                </View>
                <TouchableOpacity onPress={handleImageUpload} style={styles.imageContainer}>
                    <Image source={{ uri: imageUri }} style={styles.image} />
                    <Text style={styles.imageHint}>Bild hinzufügen</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.optionsBar}>
                {['Allgemein', 'Kontakte', 'Zuordnung', 'Einbringer', 'Verrechnung'].map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.optionButton,
                            selectedTab === option && styles.activeOptionButton,
                        ]}
                        onPress={() => setSelectedTab(option)}
                    >
                        <Text
                            style={[
                                styles.optionText,
                                selectedTab === option && styles.activeOptionText,
                            ]}
                        >
                            {option}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.content}>{renderContent()}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#fff', height: '100vh' },
    error: { color: 'red', fontSize: 20, textAlign: 'center' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, height: 300 },
    nameContainer: { justifyContent: 'center', flex: 1 },
    welcomeText: { color: 'rgba(240,175,77,1)', fontWeight: 'bold', fontSize: 40, marginBottom: 5 },
    imageContainer: { alignItems: 'flex-end', justifyContent: 'center', flex: 1 },
    image: { width: 250, height: 250, borderWidth: 2, borderColor: '#ddd', backgroundColor: '#f0f0f0' },
    imageHint: { marginTop: 5, fontSize: 12, color: 'gray' },
    optionsBar: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'rgb(247,203,105)', paddingVertical: 8, marginBottom: 15 },
    optionButton: { padding: 5 },
    activeOptionButton: { backgroundColor: 'rgb(240,175,77)', borderRadius: 5 },
    optionText: { color: 'black', fontWeight: 'bold' },
    activeOptionText: { color: 'white' },
    content: { backgroundColor: '#fff', flex: 1, padding: 10 },
    contentColumns: { flexDirection: 'row', justifyContent: 'space-between' },
    leftColumn: { width: '45%' },
    rightColumn: { width: '45%' },
    row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    label: { fontSize: 14, fontWeight: 'bold', width: '40%' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 5, width: '58%' },
});

export default PersonDetail;