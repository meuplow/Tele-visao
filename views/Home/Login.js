import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, Pressable } from 'react-native';
import styles from '../styles.js';

export default function Login() {
  return(
    <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.field_name}>E-mail</Text>
        <TextInput style={styles.field} placeholder="Digite seu e-mail" />
        <Text style={styles.field_name}>Senha</Text>
        <TextInput secureTextEntry={true} style={styles.field} placeholder="Digite sua senha" />
        <Pressable style={styles.button}>
          <Text style={styles.text}>Logar</Text>
        </Pressable>
        <StatusBar style="auto" />
    </View>
  );
}