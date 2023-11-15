import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import styles from '../styles.js';

import { db } from '../../src/config/firebase.js';
import { collection, getDocs, deleteDoc, doc, where, query } from 'firebase/firestore';

export default function Verifica_Usuarios({navigation}) {
    async function getUsuarios(){
        let usuarios = new Array();
        let usuariosRef = collection(db, "usuario");
        let acceptedQuery = query(usuariosRef);
        let usuariosSnapshot = await getDocs(acceptedQuery);
        usuariosSnapshot.forEach(usuario => {
                usuarios.push({'id': usuario.id, 'dados': usuario.data()});
        });
        console.log(usuarios);
        return usuarios;
    }

    const [usuarios, setUsuarios] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const getExs = async () => {
          const respUsuarios = await getUsuarios();
          setUsuarios(respUsuarios);
          setIsLoaded(true);
          console.log(respUsuarios);
        }
        getExs();
    }, []);

    function desautoriza_usuario(usuario){
        var response = confirm("Confirme se deseja desautorizar este usuário.");

        if(response==true){
            const usuarioRef = doc(db, 'usuario', usuario['id']);
            deleteDoc(usuarioRef);
            navigation.navigate('Admin_Home')
        }
        else{
            navigation.navigate('Verifica_Usuarios')
        }
    }

    function Usuario({ nome }) {
        const iniciais = nome.split(' ').map(parte => parte[0]).join('').toUpperCase();
    
        return (
            <View style={styles.examinadorContainer}>
                <View style={styles.circle}>
                    <Text style={styles.initials}>{iniciais}</Text>
                </View>
                <Text style={styles.name}>{nome}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verifique os usuários já autorizados</Text><br></br>
            <Text>Clique em cima de um usuário se desejar desautorizar o acesso dele.</Text>
            {!isLoaded && <p>Carregando...</p>}
            {isLoaded && usuarios.length == 0  && <p>Nenhum usuário disponível.</p>}
            {
                isLoaded && usuarios.length > 0 && usuarios.map(usuario => {
                    return (
                        <Pressable key={usuario.id} style={styles.list_button} onPress={() => desautoriza_usuario(usuario)}>  
                            <Usuario nome={usuario['dados']["nome"]} />
                        </Pressable>
                )
            })
            }
            <StatusBar style="auto" />
        </View>
    );
}