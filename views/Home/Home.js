import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import styles from '../styles.js';

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Tele-visão!</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Cadastro_Perfil')}>
        <Text style={styles.text}>Cadastrar usuário</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}