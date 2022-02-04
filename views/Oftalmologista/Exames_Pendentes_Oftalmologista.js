import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable, Div } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../styles.js';

export default function Ver_Laudos({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Exames pendentes</Text>
            <Pressable style={styles.list_button} onPress={() => navigation.navigate('Visualizar_Exame')}>
                <Text style={styles.list_subtitle}><Icon name="hospital" size={25} style={styles.list_icon}/>Santa Casa</Text>
                <Text style={styles.list_title}>Paciente: Carolina</Text>
            </Pressable>
            <Pressable style={styles.list_button} onPress={() => navigation.navigate('Visualizar_Exame')}>
                <Text style={styles.list_subtitle}><Icon name="hospital" size={25} style={styles.list_icon}/>Santa Casa</Text>
                <Text style={styles.list_title}>Paciente: Tainá</Text>
            </Pressable>
            <Pressable style={styles.list_button} onPress={() => navigation.navigate('Visualizar_Exame')}>
                <Text style={styles.list_subtitle}><Icon name="hospital" size={25} style={styles.list_icon}/>Santa Casa</Text>
                <Text style={styles.list_title}>Paciente: Paulo</Text>
            </Pressable>
            <Pressable style={styles.list_button} onPress={() => navigation.navigate('Visualizar_Exame')}>
                <Text style={styles.list_subtitle}><Icon name="hospital" size={25} style={styles.list_icon}/>Santa Casa</Text>
                <Text style={styles.list_title}>Paciente: Pedro</Text>
            </Pressable>
            <StatusBar style="auto" />
        </View>
    );
}