import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import { getDownloadURL, ref, getStorage } from 'firebase/storage';
import styles from './styles.js';


export default function Ver_Laudos({ navigation }) {
    var laudos = [['Santa Casa', 'Carolina'],
    ['Moinhos de Vento', 'Carlos'],
    ['Mãe de Deus', 'José']];

    return (
        <View style={styles.container}>
            <View style={{ height: 50 }} />
            <Text style={styles.title}>Verificação de Laudos</Text>
            {laudos.map((item) => {
                return (
                    <Pressable style={styles.list_button} onPress={() => alert("Laudo")}>
                        <View style={styles.list_button_local}>
                            <Icon name="hospital" size={25} />
                            <Text style={styles.list_subtitle}>{item[0]}</Text>
                        </View>
                        <Text style={styles.patientText}>Paciente: {item[1]}</Text>
                    </Pressable>
                );
            })}
            <StatusBar style="auto" />
        </View>
    );
}