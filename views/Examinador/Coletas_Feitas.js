
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../styles.js';
import React, { useState, useEffect } from 'react';
import { db } from '../../src/config/firebase.js';
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';

export default function Coletas_Feitas({navigation}) {

    async function getPendingExams(){
        let exams = new Array();
        let examsRef = collection(db, "exames");
        let acceptedQuery = query(examsRef, where("coletado", "==", true));
        let examsSnapshot = await getDocs(acceptedQuery);
        examsSnapshot.forEach(exam => {
                exams.push({'id': exam.id, 'dados': exam.data()});
        });
        // console.log(exams);
        return exams;
    }

    function start_exam(patient){
        var response = confirm("Começar coleta?");

        if(response){
            // const patientRef = doc(db, 'exames', patient['id']);
            // updateDoc(patientRef, {
            //     'aceito': true
            // });
            
            navigation.navigate('Exame', {
                patient: patient
            })
        }
    }

    const [exams, setExams] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    // let a = await getPendingExams();
    useEffect(() => {
        const getExams = async () => {
          const respExams = await getPendingExams();
          setExams(respExams);
          setIsLoaded(true);
        //   console.log(respExams);
        }
        getExams();
    }, []);
    
    // setExams(a);
    return (
        <View style={styles.container}>
            {/* <Text style={styles.subtitle}>Você é o examinador da semana!</Text> */}
            <Text style={styles.title}>Coletas feitas</Text>
            {!isLoaded && <p>Carregando...</p>}
            {isLoaded && exams.length == 0  && <p>Nenhum exame em realizado.</p>}
            {
                isLoaded && exams.length > 0 && exams.map(patient => {
                    return (
                        <Pressable key={patient.id} style={styles.list_button} /*onPress={() => start_exam(patient)}*/>  
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