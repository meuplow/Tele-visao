import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { userGlobal } from '../../global.js';
import styles from '../styles.js';
import { db } from '../../src/config/firebase.js';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function Coletas_Em_Andamento({navigation}) {
    const examinador = userGlobal.examinador_da_semana;

    async function getPendingExams(){
        let exams = new Array();
        let examsRef = collection(db, "exames");
        if(examinador == true){
            let acceptedQuery = query(examsRef, where("aceito", "==", true), where("coletado", "==", false));
            let examsSnapshot = await getDocs(acceptedQuery);
            examsSnapshot.forEach(exam => {
                exams.push({'id': exam.id, 'dados': exam.data()});
            });
            return exams;
        } else {
            let acceptedQuery = query(examsRef, where("aceito", "==", true), where("coletado", "==", false), where("examinador", "==", userGlobal.email));
            let examsSnapshot = await getDocs(acceptedQuery);
            examsSnapshot.forEach(exam => {
                    exams.push({'id': exam.id, 'dados': exam.data()});
            });
            return exams;
        }
    }

    function start_exam(patient){
        var response = confirm("Começar coleta?");

        if(response){
            navigation.navigate('Exame', {
                patient: patient
            })
        }
    }

    const [exams, setExams] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const getExams = async () => {
          const respExams = await getPendingExams();
          setExams(respExams);
          setIsLoaded(true);
        }
        getExams();
    }, []);
    
    return (
        <View style={styles.container}>
            {examinador && <Text style={styles.subtitle}>Você é o examinador da semana!</Text>}
            <Text style={styles.title}>Coletas em andamento</Text>
            {!isLoaded && <p>Carregando...</p>}
            {isLoaded && exams.length == 0  && <p>Nenhum exame em andamento.</p>}
            {
                isLoaded && exams.length > 0 && exams.map(patient => {
                    return (
                        <Pressable key={patient.id} style={styles.list_button} onPress={() => start_exam(patient)}>  
                            <View style={styles.list_button_local}>
                                <Icon style={styles.camera_icon} name="hospital" color='#363636' size={20}/>
                                <Text style={styles.subtitle}>{patient['dados']["local"]}</Text>
                            </View>
                            <Text style={styles.patientText}>Paciente: {patient['dados']["nome_completo"]}</Text>
                        </Pressable>
                )
            })
            }
            <StatusBar style="auto" />
        </View>
    );
}