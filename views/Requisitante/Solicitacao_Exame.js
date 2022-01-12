import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles.js';

export default function Cadastro_Perfil() {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Solicitar exame</Text>
            <Text style={styles.field_name}>Nome completo</Text>
            <TextInput style={styles.field} placeholder="Digite aqui o nome completo" />
            <Text style={styles.field_name}>Sexo</Text>
            <Picker style={styles.picker}>
                <Picker.Item style={styles.text} label='M' value='M' />
                <Picker.Item style={styles.text} label='F' value='F' />
            </Picker>
            <Text style={styles.field_name}>Data de nascimento</Text>
            <Text style={styles.subtext}>ainda vai ser adicionada</Text>
            <Text style={styles.field_name}>Raça</Text>
            <Picker style={styles.picker}>
                <Picker.Item label='Branco' value='Branco' />
                <Picker.Item label='Negro' value='Negro' />
                <Picker.Item label='Pardo' value='Pardo' />
                <Picker.Item label='Amarelo' value='Amarelo' />
                <Picker.Item label='Indígena' value='Indígena' />
                <Picker.Item label='Outro' value='Outro' />
            </Picker>
            <Text style={styles.field_name}>Hospital</Text>
            <Picker style={styles.picker}>
                <Picker.Item label='Santa Casa' value='Santa Casa' />
                <Picker.Item label='Moinhos de Vento' value='Moinhos de Vento' />
            </Picker>
            <Text style={styles.field_name}>Matrícula</Text>
            <TextInput style={styles.field} placeholder="Digite aqui a matrícula" />
            <Text style={styles.field_name}>Leito atual</Text>
            <TextInput style={styles.field} placeholder="Digite aqui o número" />
            <Text style={styles.field_name}>Histórico do paciente</Text>
            <TextInput multiline={true} style={styles.big_field} placeholder="Digite aqui o histórico do paciente" />
            <Text style={styles.field_name}>Informações da solicitação</Text>
            <TextInput multiline={true} style={styles.big_field} placeholder="Digite aqui as informações da solicitação" />
            <Pressable style={styles.button}>
            <Text style={styles.text}>Cadastrar</Text>
            </Pressable>
            <StatusBar style="auto" />
        </View>
    );
}