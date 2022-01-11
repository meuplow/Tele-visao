import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginBottom: 16,
    textAlign: 'left',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 40
  },
  field_name: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  field: {
    backgroundColor: '#F2F2F5',
    borderRadius: 5,
    height: 40,
    width: 250,
    marginBottom: 20,
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  button: {
    marginTop: 30,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#6A79A8',
    width: 200
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold'
  }
});