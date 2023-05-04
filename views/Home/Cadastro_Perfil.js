import { Alert } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles.js';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { db } from '../../src/config/firebase.js';
import { auth } from '../../src/config/firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Cadastro_Perfil({navigation}) {
  const local_options = ["Santa Casa","Moinhos de Vento","Mãe de Deus"];
  const profile_options = ["Examinador","Requisitante","Oftalmologista"];
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [selectedLocal, setSelectedLocal] = useState(local_options[0]);
  const [selectedProfile, setSelectedProfile] = useState(profile_options[0]);
  const [error, setError] = useState('');

  const register = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'RegistroPermitido'));
      const isAllowed = querySnapshot.docs.some(doc => doc.data().email === registerEmail);
  
      if (!isAllowed) {
        setError('Não é permitido registrar com esse e-mail');
        return;
      }
  
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      console.log(user);

      await addDoc(collection(db, 'usuario'), {
        nome: registerName,
        email: registerEmail,
        perfil: selectedProfile,
        examinador_da_semana: false
      });

        let users = new Array();
        let userRef = collection(db, "usuario");
        let acceptedQuery = query(userRef, where("email", "==", registerEmail));
        let userSnapshot = await getDocs(acceptedQuery);
        userSnapshot.forEach(u => {
        users.push({'dados': u.data()});
        });

    if (selectedProfile === 'Examinador') {
        navigation.navigate('Examinador_Home', {
            users: users
        })
    } else if (selectedProfile === 'Requisitante') {
        navigation.navigate('Requisitante_Home', {
            users: users
        });
    } else if (selectedProfile === 'Oftalmologista') {
        navigation.navigate('Oftalmologista_Home', {
            users: users
        });
    } 

    } catch (error) {
      console.log(error.message);
    }
  };

  return(
    <View style={styles.containerCentralize}>
      <Text style={styles.title}>Cadastro de novo perfil</Text>
      <Text style={styles.field_name}>Nome completo</Text>
      <TextInput style={styles.field} placeholder="Digite aqui o seu nome completo" onChangeText={setRegisterName} />
      <Text style={styles.field_name}>E-mail</Text>
      <TextInput style={styles.field} placeholder="Digite aqui o seu e-mail" onChangeText={setRegisterEmail} />
      <Text style={styles.field_name}>Senha</Text>
      <TextInput secureTextEntry={true} style={styles.field} placeholder="Digite sua senha" onChangeText={setRegisterPassword} />
      <Text style={styles.field_name}>Hospital/Clínica associado</Text>
      <Picker style={styles.picker} selectedValue={selectedLocal} onValueChange={(itemValue) => setSelectedLocal(itemValue)}>
        {local_options.map((item, index) => {
          return (<Picker.Item label={item} value={item} key={index} />);
        })}
      </Picker>
      <Text style={styles.field_name}>Perfil</Text>
      <Picker style={styles.picker} selectedValue={selectedProfile} onValueChange={(itemValue) => setSelectedProfile(itemValue)}>
        {profile_options.map((item, index) => {
          return (<Picker.Item label={item} value={item} key={index} />);
        })}
      </Picker>
      <Pressable style={styles.button} onPress={register}>
        <Text style={styles.text}>Cadastrar</Text>
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <StatusBar style="auto" />
    </View>
  );
}