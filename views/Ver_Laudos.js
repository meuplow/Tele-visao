import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable, Div } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles.js';
import { useLayoutEffect } from 'react';

function Ver_Laudos({ navigation }) {
    var laudos = [['Santa Casa', 'Carolina'],
    ['Moinhos de Vento', 'Carlos'],
    ['Mãe de Deus', 'José']];

    useLayoutEffect(() => {
        navigation.setOptions({ title: 'Visualização de laudos' });
    }, [navigation]);


    return (
        <View style={styles.container}>
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

export default Ver_Laudos;