import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles.js';

export default function Cadastro_Perfil() {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de novo perfil</Text>
            <Text style={styles.field_name}>Nome completo</Text>
            <TextInput style={styles.field} placeholder="Digite aqui o seu nome completo" />
            <Text style={styles.field_name}>E-mail</Text>
            <TextInput style={styles.field} placeholder="Digite aqui o seu e-mail" />
            <Text style={styles.field_name}>Senha</Text>
            <TextInput secureTextEntry={true} style={styles.field} placeholder="Digite sua senha" />
            <Text style={styles.field_name}>Hospital/Clínica associado</Text>
            <Picker style={styles.picker}>
                <Picker.Item label='Santa Casa' value='Santa Casa' />
                <Picker.Item label='Moinhos de Vento' value='Moinhos de Vento' />
            </Picker>
            <Pressable style={styles.button}>
            <Text style={styles.text}>Cadastrar</Text>
            </Pressable>
            <StatusBar style="auto" />
        </View>
    );
}