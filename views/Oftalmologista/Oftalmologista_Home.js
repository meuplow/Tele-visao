import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles.js';

export default function Oftalmologista_Home({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo</Text>
      <Text style={styles.subtitle}>Manuel</Text>
      <Text style={styles.title}>Menu</Text>
      <Pressable style={styles.menu_button}>
        <Icon name="alert" size={35} color='#F08F5F' />
        <Text style={styles.text_menu_button}>Exames pendentes</Text>
      </Pressable>
      <Pressable style={styles.menu_button}>
        <Icon name="clipboard-text-multiple" size={35} color='#F0D05F' />
        <Text style={styles.text_menu_button}>Ver laudos</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}