import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles.js';
import { userGlobal } from '../../global.js';
/* Test examinador branch */

export default function Examinador_Home({ route, navigation }) {
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
      
      {userGlobal.examinador_da_semana && <Text style={{ marginBottom: -20, fontWeight: 'bold', backgroundColor: "#F7EFEE", borderRadius: 10, width: 180, padding: 10}}>Examinador da semana</Text>}
      <Text style={styles.menu}>Menu</Text>
      <View style={styles.menu_button_container}>
      <Pressable style={styles.menu_button} onPress={() => navigation.navigate('Coletas_Em_Andamento')}>
        <Icon name="clipboard-text-multiple" size={40} color='#5A6CF3' />
        <Text style={styles.text_menu_button}>Coletas em andamento</Text>
      </Pressable>
      <Pressable style={styles.menu_button} onPress={() => navigation.navigate('Exames_Pendentes')}>
        <Icon name="alert" size={40} color='#F08F5F' />
        <Text style={styles.text_menu_button}>Exames pendentes</Text>
      </Pressable>
      </View>
      <View style={styles.menu_button_container_low}>
      <View style={styles.menu_button_container_inside}>
      <Pressable style={styles.menu_button} onPress={() => navigation.navigate('Coletas_Feitas')}>
        <Icon name="clipboard-check-multiple-outline" size={40} color='#5CE1CD' />
        <Text style={styles.text_menu_button}>Coletas feitas</Text>
      </Pressable></View></View>
      <StatusBar style="auto" />
    </View>
  );
}