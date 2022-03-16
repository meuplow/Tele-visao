import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../styles.js';
import { db } from '../../src/config/firebase.js';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import Alert from 'react-native-awesome-alerts';

export default function Ver_Laudos({navigation}) {
    // var pending_exams = [['Santa Casa','Carolina'],
    //                     ['Moinhos de Vento','Carlos'],
    //                     ['Mãe de Deus','José']];

    async function getPendingExams(){
        let exams = new Array();
        let examsSnapshot = await getDocs(collection(db, "exames"));
        examsSnapshot.forEach(exam => exams.push({'id': exam.id, 'dados': exam.data()}));
        // console.log(exams);
        return exams;
    }

    function simple_alert() {
        Alert.alert('Coleta', 'Coleta aceita!');
    }

    async function aceita_coleta(patient){
        var response = confirm("Aceitar coleta?");

        if(response){
            const patientRef = doc(db, 'exames', patient['id']);
            updateDoc(patientRef, {
                'aceito': true
            });
            setShowAlert(true);
            // setShowAlert(false);
            
            // navigation.navigate('Examinador_Home');
        }
        else{
            var response_2 = confirm("Deseja atribuir esta coleta a outro examinador?");

            if(response_2==true){
                navigation.navigate('Atribuir_Coleta')
            }
            else{
                navigation.navigate('Exames_Pendentes')
            }
        }
        return response;
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
    
    // setExams(a);
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
                            <View style={styles.list_button_local}>
                                <Icon name="hospital" size={25}/>
                                <Text style={styles.list_subtitle}>{patient['dados']["local"]}</Text>
                            </View>
                            <Text style={styles.list_title}>Paciente: {patient['dados']["nome_completo"]}</Text>
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


// {Array.prototype.forEach.call(getPendingExams(), item => {
//     return (
//         <Pressable style={styles.list_button} onPress={() => aceita_coleta()}>  
//             <View style={styles.list_button_local}>
//                 <Icon name="hospital" size={25}/>
//                 <Text style={styles.list_subtitle}>{item.local}</Text>
//             </View>
//             <Text style={styles.list_title}>Paciente: {item.nome_completo}</Text>
//         </Pressable>
//     );
// })}