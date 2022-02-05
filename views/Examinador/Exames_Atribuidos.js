import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
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
            // volta pra lista do examinador da semana (backend)
            navigation.navigate('Exames_Pendentes')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Exames atribuídos</Text>
            {pending_exams.map((item) => {
                    return (
                        <Pressable style={styles.list_button} onPress={() => aceita_coleta()}>
                            <View style={styles.list_button_local}>
                                <Icon name="hospital" size={25}/>
                                <Text style={styles.list_subtitle}>{item[0]}</Text>
                            </View>
                            <Text style={styles.list_title}>Paciente: {item[1]}</Text>
                        </Pressable>
                    );
            })}
            <StatusBar style="auto" />
        </View>
    );
}