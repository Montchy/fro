import React from 'react';
import { View, Text, StyleSheet, Switch, TextInput, TouchableOpacity } from 'react-native';

const Settings = ({ darkMode, setDarkMode, isEnglish, setEnglish }) => {
    const [username, setUsername] = React.useState('JohnDoe');
    const [email, setEmail] = React.useState('john.doe@example.com');
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

    return (
        <View style={[styles.container, darkMode ? styles.darkContainer : styles.lightContainer]}>
            <Text style={[styles.title, darkMode ? styles.darkText : styles.lightText]}>
                {isEnglish ? "Settings" : "Einstellungen"}
            </Text>

            {/* Benutzername */}
            <View style={styles.settingRow}>
                <Text style={[styles.label, darkMode ? styles.darkText : styles.lightText]}>
                    {isEnglish ? "Username:" : "Benutzername:"}
                </Text>
                <TextInput
                    style={[styles.input, darkMode ? styles.darkInput : styles.lightInput]}
                    value={username}
                    onChangeText={setUsername}
                    placeholder={isEnglish ? "Enter username" : "Benutzername eingeben"}
                />
            </View>

            {/* E-Mail */}
            <View style={styles.settingRow}>
                <Text style={[styles.label, darkMode ? styles.darkText : styles.lightText]}>
                    {isEnglish ? "E-Mail:" : "E-Mail:"}
                </Text>
                <TextInput
                    style={[styles.input, darkMode ? styles.darkInput : styles.lightInput]}
                    value={email}
                    onChangeText={setEmail}
                    placeholder={isEnglish ? "Enter email" : "E-Mail eingeben"}
                />
            </View>

            {/* Benachrichtigungen */}
            <View style={styles.settingRow}>
                <Text style={[styles.label, darkMode ? styles.darkText : styles.lightText]}>
                    {isEnglish ? "Enable Notifications:" : "Benachrichtigungen aktivieren:"}
                </Text>
                <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    thumbColor={darkMode ? "#f5dd4b" : "#f4f3f4"}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                />
            </View>

            {/* Dark Mode Toggle */}
            <View style={styles.settingRow}>
                <Text style={[styles.label, darkMode ? styles.darkText : styles.lightText]}>
                    {isEnglish ? "Dark Mode:" : "Dunkelmodus:"}
                </Text>
                <Switch
                    value={darkMode}
                    onValueChange={setDarkMode}  // Jetzt wird Dark Mode von App.js gesteuert
                    thumbColor={darkMode ? "#f5dd4b" : "#f4f3f4"}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                />
            </View>

            {/* Sprachumschaltung */}
            <View style={styles.settingRow}>
                <Text style={[styles.label, darkMode ? styles.darkText : styles.lightText]}>
                    {isEnglish ? "Language:" : "Sprache:"}
                </Text>
                <TouchableOpacity
                    style={[styles.languageButton, darkMode ? styles.darkButton : styles.lightButton]}
                    onPress={() => setEnglish(prev => !prev)}
                >
                    <Text style={darkMode ? styles.darkButtonText : styles.lightButtonText}>
                        {isEnglish ? "Switch to German" : "Wechsel zu Englisch"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    lightContainer: { backgroundColor: '#fff' },
    darkContainer: { backgroundColor: '#121212' },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
    lightText: { color: '#000' },
    darkText: { color: '#fff' },
    settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    label: { fontSize: 16, fontWeight: 'bold' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8, width: '60%' },
    lightInput: { backgroundColor: '#fff', color: '#000' },
    darkInput: { backgroundColor: '#333', color: '#fff' },
    languageButton: { padding: 10, borderRadius: 5 },
    lightButton: { backgroundColor: '#007BFF' },
    darkButton: { backgroundColor: '#1E90FF' },
    lightButtonText: { color: '#fff' },
    darkButtonText: { color: '#fff' },
});

export default Settings;