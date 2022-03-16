import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../styles.js';
import Icon_person from 'react-native-vector-icons/Fontisto';

export default function Coletas_Feitas({navigation}) {
    var pending_exams = [['Santa Casa','Carolina'],
                        ['Moinhos de Vento','Carlos'],
                        ['Mãe de Deus','José']];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Coletas Feitas</Text>
            {pending_exams.map((item) => {
                    return (
                        <Pressable style={styles.list_button}>
                            <View style={styles.list_icon}>
                                    <Icon_person name="person" size={30} color='#363636' />
                            </View>
                            <View style={styles.list_information}>
                            <View style={styles.list_button_local}>
                                <View style={styles.sublist_icon}>
                                    <Icon name="hospital" size={16} color='#6A79A8'/>
                                </View>
                                <Text style={styles.list_subtitle}>{item[0]}</Text>
                            </View>
                            <Text style={styles.list_title}>Paciente: {item[1]}</Text>
                            </View>
                        </Pressable>
                    );
            })}
            <StatusBar style="auto" />
        </View>
    );
}