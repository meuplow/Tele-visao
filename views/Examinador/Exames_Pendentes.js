import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable, Div, InteractionManager } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../styles.js';

export default function Ver_Laudos({navigation}) {
    var pending_exams = [['Santa Casa','Carolina'],
                        ['Moinhos de Vento','Carlos'],
                        ['Mãe de Deus','José']];

    function aceita_coleta(){
        var response = confirm("Aceitar coleta?");

        if(response==true){
            navigation.navigate('Exame')
        }
        else{
            var response_2 = confirm("Deseja atribuir esta coleta a outro examinador?");

            if(response_2==true){
            }
            else{
                () => navigation.navigate('Exames_Pendentes')
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Exames pendentes</Text>
            {pending_exams.map((item) => {
                    return (
                        <Pressable style={styles.list_button} onPress={() => aceita_coleta()}>
                            <Text style={styles.list_subtitle}><Icon name="hospital" size={25} style={styles.list_icon}/>{item[0]}</Text>
                            <Text style={styles.list_title}>Paciente: {item[1]}</Text>
                        </Pressable>
                    );
            })}
            <StatusBar style="auto" />
        </View>
    );
}