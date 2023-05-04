import { useState, useEffect } from 'react';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../styles.js';
import { db } from '../../src/config/firebase.js';
import Icon_person from 'react-native-vector-icons/Fontisto';
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';

export default function Exames_Pendentes_Oftalmologista({ navigation }) {
    //var exames_pendentes_oftalmologista = [['Santa Casa', 'Carolina'],
    //['Moinhos de Vento', 'Carlos'],
    //['Mãe de Deus', 'José']];

    async function getPendingExams() {
        let exams = new Array();
        let examsRef = collection(db, "exames");
        let acceptedQuery = query(examsRef, where("laudo_finalizado", "==", false));
        let examsSnapshot = await getDocs(acceptedQuery);
        examsSnapshot.forEach(exam => {
            exams.push({ 'id': exam.id, 'dados': exam.data() });
        });
        // console.log(exams);
        return exams;
    }


    function start_exam(patient) {
        var response = confirm("Começar laudo?");

        if (response) {
            // const patientRef = doc(db, 'exames', patient['id']);
            // updateDoc(patientRef, {
            //     'aceito': true
            // });

            navigation.navigate('Laudo', {
                patient: patient
            })
        }
    }

    const [exams, setExams] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [counter, setCounter] = useState(1);
    // let a = await getPendingExams();
    useEffect(() => {
        const getExams = async () => {
          const respExams = await getPendingExams();
          setExams(respExams);
          setIsLoaded(true);
          setCounter(counter);
        //   console.log(respExams);
        }
        getExams();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Exames pendentes</Text>
            {!isLoaded && <p>Carregando...</p>}
            {isLoaded && exams.length == 0 && <p>Nenhum exame em andamento.</p>}
            {
                isLoaded && exams.length > 0 && exams.map(patient => {
                    return (
                        <View style={styles.sub_container}>
                            <Pressable style={styles.list_button} onPress={() => start_exam(patient)}>
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