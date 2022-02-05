import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable, Div, InteractionManager } from 'react-native';
import styles from '../styles.js';

export default function Seleciona_Examinador_Da_Semana({navigation}) {
    var examinadores = [['Maria','7 dias sem coletar'],
                         ['Paulo','5 dias sem coletar'],
                         ['Kelly','4 dias sem coletar']];

    function confirma_examinador(){
        var response = confirm("Confirme se deseja selecionar este usuário como examinador da semana.");

        if(response==true){
            // muda usuário pra examinador da semana
            navigation.navigate('Admin_Home')
        }
        else{
            navigation.navigate('Selecionar_Examinador_Da_Semana')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Selecionar examinador da semana</Text>
            {examinadores.map((item) => {
                    return (
                        <Pressable style={styles.list_button} onPress={() => confirma_examinador()}>
                            <Text style={styles.list_subtitle}><b>Examinador:</b> {item[0]}</Text>
                            <Text style={styles.list_subtitle}>{item[1]}</Text>
                        </Pressable>
                    );
            })}
            <StatusBar style="auto" />
        </View>
    );
}