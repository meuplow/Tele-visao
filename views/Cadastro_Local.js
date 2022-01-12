import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, Pressable } from 'react-native';
import styles from './styles.js';

export default function Cadastro_Local() {
  return(
    <View style={styles.container}>
        <Text style={styles.title}>Cadastro de novo local</Text>
        <Text style={styles.field_name}>Nome completo do administrador</Text>
        <TextInput style={styles.field} placeholder="Digite aqui o nome completo" />
        <Text style={styles.field_name}>E-mail do administrador</Text>
        <TextInput style={styles.field} placeholder="Digite aqui o e-mail" />
        <Text style={styles.field_name}>Senha</Text>
        <TextInput secureTextEntry={true} style={styles.field} placeholder="Digite aqui a senha" />
        <Text style={styles.field_name}>Hospital/Clínica</Text>
        <TextInput secureTextEntry={true} style={styles.field} placeholder="Digite aqui o nome" />
        <Pressable style={styles.button}>
          <Text style={styles.text}>Logar</Text>
        </Pressable>
        <StatusBar style="auto" />
    </View>
  );
}