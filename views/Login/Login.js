import React, { useRef, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, Pressable } from 'react-native';
import loginStyle from  './LoginStyle.js';
import { db } from '../../src/config/firebase.js';
import { useAuth } from '../../src/context/AuthContext.js';
import { auth } from '../../src/config/firebase.js';
import { collection, getDocs, updateDoc, doc,  query, where} from 'firebase/firestore';
import { createUserWithEmailAndPassword,
          onAuthStateChanged,
          signInWithEmailAndPassword,
          signOut,
} from "firebase/auth";

export default function Login({navigation}){
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});
  const [emailNotFound, setEmailNotFound] = useState(false);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  const login = async () => {
    try{
      let users = new Array();
      let userRef = collection(db, "usuario");
      let acceptedQuery = query(userRef, where("email", "==", loginEmail));
      let userSnapshot = await getDocs(acceptedQuery);
      userSnapshot.forEach(u => {
        users.push({'dados': u.data()});
      });

      if (users.length === 0) {
        setEmailNotFound(true);
        return;
      }

      if(users[0].dados["perfil"] == "examinador"){
        navigation.navigate('Examinador_Home', {
          users: users
      })
      } else if(users[0].dados["perfil"] == "requisitante"){
        navigation.navigate('Requisitante_Home', {
          users: users
      })
      } else if(users[0].dados["perfil"] == "oftalmologista"){
        navigation.navigate('Oftalmologista_Home', {
          users: users
      })
      }

    } catch (error){
      console.log(error.message);
    }
  }

  const signUp = async () => {
    navigation.navigate('Cadastro_Perfil')
  }

  const logout = async () => {
    await signOut(auth);
  }

  return(
      <View style={loginStyle.containerCentralize}>
        <View style={loginStyle.containerLogin}>
          {/* <Text>{error && <Alert variant="danger">{error}</Alert>}</Text> */}
          <Text style={loginStyle.titleLogin}>Login</Text>
          <Text style={loginStyle.textLogin}>E-mail</Text>
          <TextInput 
            style={[
              loginStyle.fieldLogin, 
              emailNotFound && {borderColor: 'red', borderWidth: 1}
            ]} 
            placeholder="Digite seu e-mail" 
            type="email" 
            ref={emailRef} 
            value={loginEmail}
            onChangeText={(value) => {setLoginEmail(value); setEmailNotFound(false);}}
            required
          />
          {emailNotFound && <Text style={{color: 'red'}}>Email não encontrado.</Text>}
          <View style={loginStyle.containerLeft}>
            <Text style={loginStyle.textLogin}>Senha</Text>
          </View>
          <TextInput secureTextEntry={true} style={loginStyle.fieldLogin} placeholder="Digite sua senha" type="password" ref={passwordRef} onChange={(event) => {setLoginPassword(event.target.value)}}/>
          <Text style={loginStyle}>
            Não tem uma conta?{' '} 
            <Text style={loginStyle.link} onPress={signUp}>
              Cadastre-se
            </Text>
          </Text>
         
          <View style={loginStyle.containerCentralize}>
            <Pressable style={loginStyle.buttonLogin} type="submit" disabled={loading} onPress={login}>
              <Text style={loginStyle.titleButton}>Entrar</Text>
            </Pressable>
          </View>
          <StatusBar style="auto" />
        </View>
      </View>
  );
}