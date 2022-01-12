import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles.js';

export default function Admin_Home({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo</Text>
      <Text style={styles.subtitle}>José</Text>
      <Text style={styles.title}>Menu</Text>
      <Pressable style={styles.menu_button}>
        <Icon name="account-check" size={35} color='#5CE1CD' />
        <Text style={styles.text_menu_button}>Definir perfis</Text>
      </Pressable>
      <Pressable style={styles.menu_button}>
        <Icon name="calendar" size={35} color='#5CE1CD' />
        <Text style={styles.text_menu_button}>Selecione o coletor da semana</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}