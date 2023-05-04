import React from 'react';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import styles from '../styles.js';
import { db } from '../../src/config/firebase.js';
import Icon_person from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { collection, getDocs, query, where } from 'firebase/firestore';

export default function Laudos_Feitos({navigation}) {

    async function examsData() {
        let exams = new Array();
        let examsRef = collection(db, "exames");
        let acceptedQuery = query(examsRef, where("laudo_finalizado", "==", true));
        let examsSnapshot = await getDocs(acceptedQuery);
        examsSnapshot.forEach(exam => {
            exams.push({ 'id': exam.id, 'dados': exam.data() });
        });
        return exams;
    }

    const [exams, setExams] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [counter, setCounter] = useState(1);

    useEffect(() => {
        const getExams = async () => {
          const respExams = await examsData();
          setExams(respExams);
          setIsLoaded(true);
          setCounter(counter);
        }
        getExams();
    }, []);

    function see_exam(patient){
        navigation.navigate('Ver_Laudo', {
            patient: patient
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Laudos</Text>
            {!isLoaded && <p>Carregando...</p>}
            {isLoaded && exams.length == 0 && <p>Nenhum laudo realizado.</p>}
            {
                isLoaded && exams.length > 0 && exams.map(patient => {
                    return (
                        <View style={styles.sub_container}>
                            <Pressable style={styles.list_button} onPress={() => see_exam(patient)}>
                                <View style={styles.list_icon}>
                                    <Icon_person name="person" size={30} color='#363636' />
                                </View>
                                <View style={styles.list_information}>
                                <View style={styles.list_button_local}>
                                    <Icon style={styles.camera_icon} name="hospital" color='#363636' size={20}/>
                                    <Text style={styles.subtitle}>{patient['dados']["local"]}</Text>
                                </View>
                                    <Text style={styles.patientText}>Paciente: {patient['dados']["nome_completo"]}</Text>
                                </View>
                        </Pressable>
                        </View>
                )
            })
            }
            <StatusBar style="auto" />
        </View>
    );
}