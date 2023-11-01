import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import styles from '../styles.js';

export default function Home({navigation}) {
  return (
    <View style={styles.containerHome}>
      <Text style={styles.titleHome}>Bem-vindo ao Tele-visão!</Text>
      <Pressable style={styles.buttonHome} onPress={() => navigation.navigate('Cadastro_Perfil')}>
        <Text style={styles.textHome}>Cadastrar usuário</Text>
      </Pressable>
      <Pressable style={styles.buttonHome} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.textHome}>Login</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}