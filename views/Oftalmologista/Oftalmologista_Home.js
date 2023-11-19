import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { userGlobal } from '../../global.js';

export default function Oftalmologista_Home({ route, navigation }) {
  const { users } = route.params;

  const handleLogout = () => {
    userGlobal.email = null
    userGlobal.perfil = null
    userGlobal.examinador_da_semana = null
    userGlobal.name = null
    userGlobal.isLoggedIn = false
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
    <View style={styles.welcome}>
      <div>
          <Text style={styles.title}>Bem-vindo(a)</Text>
          <br />
          <Text style={styles.subtitle}>{users[0]['dados']['nome']}</Text>
        </div>
        <View>
          <Pressable style={{ backgroundColor: "#F7EFEE", padding: 10,
              borderRadius: 4, }} onPress={handleLogout}>
                <MaterialIcons name="logout" size={20} color="#363636" />
          </Pressable>
        </View>
    </View>
    <View style={styles.containerCentralize}>
      <Text style={styles.title}>Menu</Text>
      <View style={{ flexDirection: 'row' }}>
        <Pressable style={styles.menu_button} onPress={() => navigation.navigate('Exames_Pendentes_Oftalmologista')}>
          <Icon name="alert" size={35} color='#F08F5F' />
          <Text style={styles.text_menu_button}>Exames pendentes</Text>
        </Pressable>
        <Pressable style={styles.menu_button} onPress={() => navigation.navigate('Laudos_Feitos')}>
          <Icon name="clipboard-text-multiple" size={35} color='#F0D05F' />
          <Text style={styles.text_menu_button}>Ver laudos</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  </View>
  );
}