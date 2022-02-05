import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles.js';

export default function Examinador_Home({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vinda</Text>
      <Text style={styles.subtitle}>Maria</Text>
      <Text style={styles.title}>Menu</Text>
      <Pressable style={styles.menu_button} onPress={() => navigation.navigate('Coletas_Em_Andamento')}>
        <Icon name="clipboard-text-multiple" size={35} color='#5A6CF3' />
        <Text style={styles.text_menu_button}>Coletas em andamento</Text>
      </Pressable>
      <Pressable style={styles.menu_button} onPress={() => navigation.navigate('Exames_Pendentes')}>
        <Icon name="alert" size={35} color='#F08F5F' />
        <Text style={styles.text_menu_button}>Exames pendentes</Text>
      </Pressable>
      <Pressable style={styles.menu_button} onPress={() => navigation.navigate('Exames_Atribuidos')}>
        <Icon name="alert" size={35} color='#F08F5F' />
        <Text style={styles.text_menu_button}>Exames atribuídos</Text>
      </Pressable>
      <Pressable style={styles.menu_button} onPress={() => navigation.navigate('Coletas_Feitas')}>
        <Icon name="clipboard-check-multiple-outline" size={35} color='#5CE1CD' />
        <Text style={styles.text_menu_button}>Coletas feitas</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}