import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, Pressable } from 'react-native';
import styles from '../styles.js';

export default function Visualizar_Exame({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Paciente: Carolina</Text>
            <Pressable style={styles.list_button}>
                <Text style={styles.field_name}>Fazer download da imagem</Text>
            </Pressable>
            <Text style={styles.field_name}>Descrição</Text>
            <TextInput multiline={true} style={styles.big_field} value="Imagem do olho esquerdo" />
            <Text style={styles.field_name}>Diagnóstico</Text>
            <TextInput multiline={true} style={styles.big_field} placeholder="Digite aqui o diagnóstico" />
            <Pressable style={styles.button}>
                <Text style={styles.text}>Enviar diagnóstico</Text>
            </Pressable>
            <StatusBar style="auto" />
        </View>
    );
}