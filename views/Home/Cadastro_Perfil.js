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

      if (registerPassword.length < 6) {
        setError('Senha muito curta');
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
      console.log(error.code);
      if(error.code == 'auth/email-already-in-use'){
        setError('Email já foi cadastrado');
      }
    }
  };

  return(
    <View style={styles.container}>
      <Text style={styles.titleCadastro}>Cadastro de novo perfil</Text>
      <Text style={styles.field_name_leftCadastro}>Nome completo</Text>
      <TextInput style={styles.fieldCadastro} placeholder="Digite aqui o seu nome completo" onChangeText={setRegisterName} />
      <Text style={styles.field_name_leftCadastro}>E-mail</Text>
      <TextInput style={styles.fieldCadastro} placeholder="Digite aqui o seu e-mail" onChangeText={setRegisterEmail} />
      <Text style={styles.field_name_leftCadastro}>Senha</Text>
      <TextInput secureTextEntry={true} style={styles.fieldCadastro} placeholder="Insira uma senha (mínimo 6 caracteres)" onChangeText={setRegisterPassword} />
      <Text style={styles.field_name_leftCadastro}>Hospital/Clínica associado</Text>
      <Picker style={styles.pickerCadastro} selectedValue={selectedLocal} onValueChange={(itemValue) => setSelectedLocal(itemValue)}>
        {local_options.map((item, index) => {
          return (<Picker.Item label={item} value={item} key={index} />);
        })}
      </Picker>
      <Text style={styles.field_name_leftCadastro}>Perfil</Text>
      <Picker style={styles.pickerCadastro} selectedValue={selectedProfile} onValueChange={(itemValue) => setSelectedProfile(itemValue)}>
        {profile_options.map((item, index) => {
          return (<Picker.Item label={item} value={item} key={index} />);
        })}
      </Picker>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable style={styles.buttonCadastro} onPress={register}>
        <Text style={styles.textCadastro}>Cadastrar</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}




