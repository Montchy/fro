import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Switch } from 'react-native';

const Login = ({ setLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = () => {
        // Hier sollte die Login-Logik erfolgen
        if (email && password) {
            setLogin(true); // Beispiel: Setze Login-Status auf true nach erfolgreichem Login
        }
    };

    const handleSkipLogin = () => {
        setLogin(true); // Setze fLogin auf true beim "Skip Login temp"
    };

    return (
        <View style={styles.container}>
            <View style={styles.border}>
                <View style={styles.header}>
                    <Text style={styles.title}>Anmelden</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email eingeben"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Passwort</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Passwort eingeben"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true} // Versteckt die Eingabe des Passworts
                    />
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.rememberMeContainer}>
                    <Switch
                        value={rememberMe}
                        onValueChange={setRememberMe}
                    />
                    <Text style={styles.label}> Remember me</Text>
                </View>

                {/* Skip Login temp button */}
                <TouchableOpacity onPress={handleSkipLogin} style={styles.skipButton}>
                    <Text style={styles.skipButtonText}>Skip Login temp</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150,
    },
    border: {
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: 350,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'rgba(240,175,77,1)',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 13,
        marginBottom: 5,
        color: "grey",
    },
    input: {
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    loginButton: {
        backgroundColor: '#f0af4d',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    skipButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'lightgray',
        borderRadius: 5,
        alignItems: 'center',
    },
    skipButtonText: {
        color: '#333',
        fontSize: 14,
    },
});

export default Login;
