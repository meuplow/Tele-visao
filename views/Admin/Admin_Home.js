import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { userGlobal } from '../../global.js'; 

export default function Admin_Home({route, navigation}) {
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
      <Text style={styles.menu}>Menu</Text>
      
      <View style={styles.menu_button_container}>
        <Pressable style={styles.menu_button} onPress={() => navigation.navigate('Cadastra_Local')}>
          <Icon name="hospital" size={35} color='#5CE1CD' />
          <Text style={styles.text_menu_button}>Cadastrar Local</Text>
        </Pressable>
        <Pressable style={styles.menu_button} onPress={() => navigation.navigate('Autoriza_Usuarios')}>
          <Icon name="account-check" size={35} color='#5CE1CD' />
          <Text style={styles.text_menu_button}>Autorizar Usuários</Text>
        </Pressable>
      </View>
      <View style={styles.menu_button_container_low}>
        <Pressable style={styles.menu_button} onPress={() => navigation.navigate('Verifica_Usuarios')}>
          <Icon name="account-box-multiple" size={35} color='#5CE1CD' />
          <Text style={styles.text_menu_button}>Verificar Usuários</Text>
        </Pressable>
        <Pressable style={styles.menu_button} onPress={() => navigation.navigate('Seleciona_Examinador_Da_Semana')}>
          <Icon name="calendar" size={35} color='#5CE1CD' />
          <Text style={styles.text_menu_button}>Selecione o Coletor da Semana</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
    </View>
  );
}