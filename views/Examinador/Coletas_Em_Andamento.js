import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../styles.js';
import { db } from '../../src/config/firebase.js';
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';



export default function Ver_Laudos({navigation}) {
    // var pending_exams = [['Santa Casa','Carolina'],
    //                     ['Moinhos de Vento','Carlos'],
    //                     ['Mãe de Deus','José']];

    async function getPendingExams(){
        let exams = new Array();
        let examsRef = collection(db, "exames");
        let acceptedQuery = query(examsRef, where("aceito", "==", true));
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
            <Text style={styles.subtitle}>Você é o examinador da semana!</Text>
            <Text style={styles.title}>Exames pendentes</Text>
            {!isLoaded && <p>Carregando...</p>}
            {isLoaded && exams.length == 0  && <p>Nenhum exame em andamento.</p>}
            {
                isLoaded && exams.length > 0 && exams.map(patient => {
                    return (
                        <Pressable style={styles.list_button} onPress={() => start_exam(patient)}>  
                            <View style={styles.list_button_local}>
                                <Icon name="hospital" size={25}/>
                                <Text style={styles.list_subtitle}>{patient['dados']["local"]}</Text>
                            </View>
                            <Text style={styles.list_title}>Paciente: {patient['dados']["nome_completo"]}</Text>
                        </Pressable>
                )
            })
            }
            <StatusBar style="auto" />
        </View>
    );
}



// import React from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { Text, View, Pressable } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import styles from '../styles.js';

// export default function Coletas_Em_Andamento({navigation}) {
//     var pending_exams = [['Santa Casa','Carolina'],
//                         ['Moinhos de Vento','Carlos'],
//                         ['Mãe de Deus','José']];

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Coletas em andamento</Text>
//             {pending_exams.map((item) => {
//                     return (
//                         <Pressable style={styles.list_button}>
//                             <View style={styles.list_button_local}>
//                                 <Icon name="hospital" size={25}/>
//                                 <Text style={styles.list_subtitle}>{item[0]}</Text>
//                             </View>
//                             <Text style={styles.list_title}>Paciente: {item[1]}</Text>
//                         </Pressable>
//                     );
//             })}
//             <StatusBar style="auto" />
//         </View>
//     );
// }