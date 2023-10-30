import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles.js';
import { userGlobal } from '../../global.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useLayoutEffect } from 'react';

function Requisitante_Home({ route, navigation }) {
  const { users } = route.params;

  const handleLogout = () => {
    userGlobal.email = null
    userGlobal.perfil = null
    userGlobal.examinador_da_semana = null
    userGlobal.name = null
    userGlobal.isLoggedIn = false
    navigation.navigate('Login');
  };

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Requisitante Home' });
  }, [navigation]);


  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <div>
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
        <Text style={styles.menu}>Menu</Text>
        <View style={{ flexDirection: 'row' }}>
          <Pressable style={styles.menu_button} onPress={() => navigation.navigate('Solicitacao_Exame')}>
            <View style={styles.buttonContent}>
              <Icon name="clipboard-text-multiple" size={35} color='#5CE1CD' />
              <Text style={styles.text_menu_button}>Solicitar exame</Text>
            </View>
          </Pressable>
          <Pressable style={styles.menu_button} onPress={() => navigation.navigate('Ver_Laudos')}>
            <View style={styles.buttonContent}>
              <Icon name="clipboard-text-multiple" size={35} color='#F0D05F' />
              <Text style={styles.text_menu_button}>Ver laudos</Text>
            </View>
          </Pressable>
          </View>
          <StatusBar style="auto" />
      </View>
  </View>
  );
}
export default Requisitante_Home;