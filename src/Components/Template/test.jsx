import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Easing } from 'react-native';
import  * as appleAuth from 'expo-apple-authentication';
import { Ionicons } from '@expo/vector-icons';
import logo1 from '../items/logo1.png';

const StartSite = () => {
    const [isVisible, setIsVisible] = useState(true);
    const fadeAnim = new Animated.Value(0);

    const hideStartSite = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => setIsVisible(false));
    };

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }, []);

    const handleAppleLogin = async () => {
        try {
            const { user, email } = await appleAuth.signInAsync();
            console.log('Apple User:', user);
            console.log('Apple Email:', email);
            // Hier kannst du den erhaltenen Benutzer und die E-Mail-Adresse weiterverarbeiten
        } catch (error) {
            console.error('Error with Apple Authentication:', error);
        }
    };

    const handleGoogleLogin = () => {
        // Hier kannst du die Logik für die Google-Anmeldung hinzufügen
    };

    const handleFacebookLogin = () => {
        // Hier kannst du die Logik für die Facebook-Anmeldung hinzufügen
    };

    return isVisible ? (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Image source={logo1} style={styles.headerImage} />
            <Text style={styles.title}>Welcome to Wien Local!</Text>
            <TouchableOpacity style={styles.appleButton} onPress={handleAppleLogin}>
                <Ionicons name="logo-apple" size={24} color="white" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Sign in with Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
                <Ionicons name="logo-google" size={24} color="white" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Sign in with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.facebookButton} onPress={handleFacebookLogin}>
                <Ionicons name="logo-facebook" size={24} color="white" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Sign in with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.startButton} onPress={hideStartSite}>
                <Text style={styles.startButtonText}>Continue without signing in</Text>
            </TouchableOpacity>
        </Animated.View>
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        width: 1000,
    },
    headerImage: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 30,
        fontFamily: 'Helvetica Neue',
        color: '#333',
    },
    appleButton: {
        flexDirection: 'row',
        backgroundColor: '#000',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
        width: 300,
    },
    googleButton: {
        flexDirection: 'row',
        backgroundColor: '#DB4437', // Google Rot
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
        width: 300,
    },
    facebookButton: {
        flexDirection: 'row',
        backgroundColor: '#4267B2', // Facebook Blau
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
        width: 300,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
        fontFamily: 'Helvetica Neue',
    },
    buttonIcon: {
        marginRight: 10,
    },
    startButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#999',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
    },
    startButtonText: {
        color: '#999',
        fontSize: 18,
        fontFamily: 'Helvetica Neue',
    },
});

export default StartSite;
