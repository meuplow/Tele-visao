import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, Pressable } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import styles from '../styles.js';

export default function Exame({navigation}) {
    function abre_galeria(){
        launchImageLibrary(result)

        const result = async () => await launchImageLibrary();
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.list_button} onPress={abre_galeria()}>
                <Text style={styles.field_name}>Selecionar imagem da galeria</Text>
            </Pressable>
            <Text style={styles.field_name}>Descrição</Text>
            <TextInput multiline={true} style={styles.big_field} placeholder="Informe o olho que a imagem foi capturada e demais informações relevantes" />
            <Pressable style={styles.button}>
                <Text style={styles.text}>Enviar exame</Text>
            </Pressable>
            <StatusBar style="auto" />
        </View>
    );
}