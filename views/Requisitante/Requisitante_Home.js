import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles.js';

export default function Requisitante_Home({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vinda</Text>
      <Text style={styles.subtitle}>Carla</Text>
      <Text style={styles.title}>Menu</Text>
      <Pressable style={styles.menu_button} onPress={() => navigation.navigate('Solicitacao_Exame')}>
        <Icon name="clipboard-text-multiple" size={35} color='#5CE1CD' />
        <Text style={styles.text_menu_button}>Solicitar exame</Text>
      </Pressable>
      <Pressable style={styles.menu_button} onPress={() => navigation.navigate('Ver_Laudos')}>
        <Icon name="clipboard-text-multiple" size={35} color='#F0D05F' />
        <Text style={styles.text_menu_button}>Ver laudos</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}