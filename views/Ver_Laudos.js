import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable, Div } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles.js';

export default function Ver_Laudos({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ver Laudos</Text>
            <Pressable style={styles.list_button} onPress={() => alert("Laudo")}>
                <Text style={styles.list_subtitle}><Icon name="hospital" size={25} style={styles.list_icon}/>Santa Casa</Text>
                <Text style={styles.list_title}>Paciente: Robson</Text>
            </Pressable>
            <Pressable style={styles.list_button} onPress={() => alert("Laudo")}>
                <Text style={styles.list_subtitle}><Icon name="hospital" size={25} style={styles.list_icon}/>Santa Casa</Text>
                <Text style={styles.list_title}>Paciente: Sofia</Text>
            </Pressable>
            <Pressable style={styles.list_button} onPress={() => alert("Laudo")}>
                <Text style={styles.list_subtitle}><Icon name="hospital" size={25} style={styles.list_icon}/>Santa Casa</Text>
                <Text style={styles.list_title}>Paciente: Julia</Text>
            </Pressable>
            <Pressable style={styles.list_button} onPress={() => alert("Laudo")}>
                <Text style={styles.list_subtitle}><Icon name="hospital" size={25} style={styles.list_icon}/>Santa Casa</Text>
                <Text style={styles.list_title}>Paciente: Alice</Text>
            </Pressable>
            <StatusBar style="auto" />
        </View>
    );
}