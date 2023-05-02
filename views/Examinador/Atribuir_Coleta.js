import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { userGlobal } from '../../global.js';
import { Text, View, Pressable } from 'react-native';
import styles from '../styles.js';
import { db } from '../../src/config/firebase.js';
import { collection, getDocs, updateDoc, query, where, doc } from 'firebase/firestore';

export default function Atribuir_Coleta({ navigation, route }) {
    const [examiners, setExaminers] = useState([]);
    const patient = route.params.patient;

    useEffect(() => {
        const getExaminers = async () => {
            const respExaminers = await getExaminer();
            setExaminers(respExaminers);
            setIsLoaded(true);
            setCounter(counter);
        }
        getExaminers();
    });

    async function getExaminer() {
        let exams = new Array();
        let examsRef = collection(db, "usuario");
        let acceptedQuery = query(examsRef, where("perfil", "==", "Examinador"), where("examinador_da_semana", "==", false));
        let examsSnapshot = await getDocs(acceptedQuery);
        examsSnapshot.forEach(examiner => {
            exams.push({ 'id': examiner.id, 'dados': examiner.data() });
        });
        return exams;
    }

    function atribui_coleta(email) {
        var response = confirm("Confirme se deseja atribuir coleta a este examinador.");

        if (response == true) {
            const patientRef = doc(db, 'exames', patient['id']);
            updateDoc(patientRef, {
                'examinador': email
            });
        }
        else {
            navigation.navigate('Atribuir_Coleta')
        }
    }
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [counter, setCounter] = useState(1);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Atribuir coleta</Text>
            {!isLoaded && <p>Carregando...</p>}
            {isLoaded && examiners.length == 0  && <p>Nenhum examinador.</p>}
            {isLoaded && examiners.length > 0 && examiners.map(examiner => {
                return (
                    counter && <Pressable key={examiner.id} style={styles.list_button} onPress={() => atribui_coleta(examiner['dados']['email'])}>
                        <Text style={styles.list_subtitle}><b>Examinador:</b> {examiner['dados']['nome']}</Text>
                        <Text style={styles.list_subtitle}>{examiner['dados']['email']}</Text>
                    </Pressable>
                )
            })}
            <StatusBar style="auto" />
        </View>
    );
}