import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../styles.js';
import { userGlobal } from '../../global.js';
import { db } from '../../src/config/firebase.js';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import Alert from 'react-native-awesome-alerts';
import Icon_person from 'react-native-vector-icons/Fontisto';

export default function Exames_Pendentes({navigation}) {
    const [examinador, setExaminador] = useState(userGlobal.examinador_da_semana);

    useEffect(() => {
        const getExams = async () => {
          const respExams = await getPendingExams();
          setExams(respExams);
          setIsLoaded(true);
          setCounter(counter);
        }
        getExams();
    });

    async function getPendingExams(){  
        let exams = new Array();
        let examsSnapshot = await getDocs(collection(db, "exames"));
        if(examinador == true){
            examsSnapshot.forEach(exam => {
                let examData = exam.data();
                if((!'examinador' in examData) || examData['examinador'] == "" || examData['examinador'] == userGlobal.email) {
                    exams.push({'id': exam.id, 'dados': exam.data()});
                }
            });
            return exams;
        } else {
            examsSnapshot.forEach(exam => {
                let examData = exam.data();
                if(!('examinador' in examData)) {
                    const patientRef = doc(db, 'exames', exam.id);
                    updateDoc(patientRef, {
                        'examinador': ""
                    })};
                if (examData['examinador'] == userGlobal.email) {
                    exams.push({'id': exam.id, 'dados': exam.data()});
                }
            });
            return exams;
        }
    }

    function simple_alert() {
        Alert.alert('Coleta', 'Coleta aceita!');
    }

    async function aceita_coleta(patient){
        var response = confirm("Aceitar coleta?");

        if(response){
            const patientRef = doc(db, 'exames', patient['id']);
            updateDoc(patientRef, {
                'aceito': true,
                'examinador': userGlobal.email
            });
            setShowAlert(true);
        }
        else if(examinador == true){
            var response_2 = confirm("Deseja atribuir esta coleta a outro examinador?");

            if(response_2==true){
                navigation.navigate('Atribuir_Coleta', {patient: patient})
            }
            else{
                navigation.navigate('Exames_Pendentes')
            }
        } else {
            var response_2 = confirm("Deseja rejeitar e retornar essa coleta para o examinador da semana?");

            if(response_2==true){
                const patientRef = doc(db, 'exames', patient['id']);
                updateDoc(patientRef, {
                    'examinador': ""
                });
                setShowAlert(true);
            }
            else{
                navigation.navigate('Exames_Pendentes')
            }

        return response;
        }
    }

    const [exams, setExams] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [counter, setCounter] = useState(1);

    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>Você é o examinador da semana!</Text>
            <Text style={styles.title}>Exames pendentes</Text>
            {!isLoaded && <p>Carregando...</p>}
            {isLoaded && exams.length == 0  && <p>Nenhum exame pendente.</p>}
            {
                isLoaded && exams.length > 0 && exams.map(patient => {
                    return (
                        counter && !patient['dados']['aceito'] && <Pressable style={styles.list_button} onPress={() => {
                            let collection_accepted = aceita_coleta(patient)
                            patient['dados']['aceito'] = collection_accepted
                        }}>
                            <View style={styles.list_information}>
                                <View style={styles.list_button_local}>
                                <Icon style={styles.camera_icon} name="hospital" color='#363636' size={20}/>
                                <Text style={styles.subtitle}>{patient['dados']["local"]}</Text>
                                </View>
                                <Text style={styles.patientText}>Paciente: {patient['dados']["nome_completo"]}</Text>
                            </View>
                        </Pressable>
                )
            })
            }
            <Alert
                show={showAlert}
                message="Coleta aceita!"
                closeOnTouchOutside={true}
                onDismiss={() => setShowAlert(false)}
            />
            <StatusBar style="auto" />
        </View>
    );
}