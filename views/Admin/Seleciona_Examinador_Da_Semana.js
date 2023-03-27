import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../styles.js';

import { db } from '../../src/config/firebase.js';
import { collection, getDocs, updateDoc, doc, where, query } from 'firebase/firestore';

export default function Seleciona_Examinador_Da_Semana({navigation}) {
    async function getExaminadores(){
        let examinadores = new Array();
        let examinadoresRef = collection(db, "usuario");
        let acceptedQuery = query(examinadoresRef, where("perfil", "==", "examinador"));
        let examinadoresSnapshot = await getDocs(acceptedQuery);
        examinadoresSnapshot.forEach(examinador => {
                examinadores.push({'id': examinador.id, 'dados': examinador.data()});
        });
        console.log(examinadores);
        return examinadores;
    }

    const [examinadores, setExaminadores] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const getExs = async () => {
          const respExaminadores = await getExaminadores();
          setExaminadores(respExaminadores);
          setIsLoaded(true);
          console.log(respExaminadores);
        }
        getExs();
    }, []);

    function confirma_examinador(examinador){
        var response = confirm("Confirme se deseja selecionar este usuário como examinador da semana.");

        if(response==true){
            examinadores.map(examinador => {
                const examinadorRef = doc(db, 'usuario', examinador['id']);

                updateDoc(examinadorRef, {
                    'examinador_da_semana': false
                })
            })
            
            const examinadorRef = doc(db, 'usuario', examinador['id']);

            updateDoc(examinadorRef, {
                'examinador_da_semana': true
            });
                    
            navigation.navigate('Admin_Home')
        }
        else{
            navigation.navigate('Selecionar_Examinador_Da_Semana')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Selecionar examinador da semana</Text>
            {!isLoaded && <p>Carregando...</p>}
            {isLoaded && examinadores.length == 0  && <p>Nenhum examinador disponível.</p>}
            {
                isLoaded && examinadores.length > 0 && examinadores.map(examinador => {
                    return (
                        <Pressable key={examinador.id} style={styles.list_button} onPress={() => confirma_examinador(examinador)}>  
                            <Text style={styles.title}>Examinador: {examinador['dados']["nome"]}</Text>
                        </Pressable>
                )
            })
            }
            <StatusBar style="auto" />
        </View>
    );
}