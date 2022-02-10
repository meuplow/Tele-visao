import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import styles from '../styles.js';

export default function Ver_Laudos({navigation}) {
    var examinadores = [['Maria','7 dias sem coletar'],
                         ['Paulo','5 dias sem coletar'],
                         ['Kelly','4 dias sem coletar']];

    function atribui_coleta(){
        var response = confirm("Confirme se deseja atribuir coleta a este examinador.");

        if(response==true){
            navigation.navigate('Examinador_Home')
        }
        else{
            navigation.navigate('Atribuir_Coleta')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Atribuir coleta</Text>
            {examinadores.map((item) => {
                    return (
                        <Pressable style={styles.list_button} onPress={() => atribui_coleta()}>
                            <Text style={styles.list_subtitle}><b>Examinador:</b> {item[0]}</Text>
                            <Text style={styles.list_subtitle}>{item[1]}</Text>
                        </Pressable>
                    );
            })}
            <StatusBar style="auto" />
        </View>
    );
}