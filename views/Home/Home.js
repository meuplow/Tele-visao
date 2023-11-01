import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable, Image } from 'react-native';
import styles from '../styles.js';
import logo from '../../assets/logo.png';

export default function Home({navigation}) {
  return (
    <View style={styles.containerHome}>
        <View style={styles.viewImageLogo} >
          <Image source={logo} style={styles.logo} /> 
        </View>
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