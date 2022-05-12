import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateField from 'react-native-datefield';
import styles from '../styles.js';

import { db } from '../../src/config/firebase.js';
import { updateDoc, doc } from 'firebase/firestore';

class ExamInfo {
    constructor(name, sex, birth_date, race, hospital, enrollment, current_bed, patient_history, solicitation_info) {
        this.name = name;
        this.sex = sex;
        this.birth_date = birth_date;
        this.race = race;
        this.hospital = hospital;
        this.enrollment = enrollment;
        this.current_bed = current_bed;
        this.patient_history = patient_history;
        this.solicitation_info = solicitation_info;
    }
}

async function addExamInfo(patient, examInfo) {
    let patientData = patient['dados'];
    
    // verificar nome da tabela no banco pra substituir 'exames'
    const patientRef = doc(db, 'exames', patient['id']);

    patientData['name'] = examInfo.name;
    patientData['sex'] = examInfo.sex;
    patientData['birthDate'] = examInfo.birthDate;
    patientData['race'] = examInfo.race;
    patientData['hospital'] = examInfo.hospital;
    patientData['enrollment'] = examInfo.enrollment;
    patientData['currentBed'] = examInfo.currentBed;
    patientData['patientHistory'] = examInfo.patientHistory;
    patientData['solicitationInfo'] = examInfo.solicitationInfo;

    await updateDoc(patientRef, {
        'name': examInfo.name,
        'sex': examInfo.sex,
        'birthDate': examInfo.birthDate,
        'race': examInfo.race,
        'hospital': examInfo.hospital,
        'enrollment': examInfo.enrollment,
        'currentBed': examInfo.currentBed,
        'patientHistory': examInfo.patientHistory,
        'solicitationInfo': examInfo.solicitationInfo
    });

    return;
}

export default function Cadastro_Perfil({ route }) {
    const { patient } = route.params;

    const [name, setName] = useState('');
    const [sex, setSex] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [race, setRace] = useState('');
    const [hospital, setHospital] = useState('');
    const [enrollment, setEnrollment] = useState('');
    const [currentBed, setCurrentBed] = useState('');
    const [patientHistory, setPatientHistory] = useState('');
    const [solicitationInfo, setSolicitationInfo] = useState('');

    const addInfo = async (patient, examInfo) => {
        await addExamInfo(patient, examInfo);
    };

    const simpleAlert = () => {
        alert("Exame solicitado com sucesso!");
    }

    const uploadExam = async (patient, examInfo) => {
        addInfo(patient, new ExamInfo(name, sex, birthDate, race, hospital, enrollment, currentBed, patientHistory, solicitationInfo));
        simpleAlert();
    }

    var options = ["Santa Casa","Moinhos de Vento","Mãe de Deus"];

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Solicitar exame</Text>
            <Text style={styles.field_name}>Nome completo</Text>
            <TextInput
                onChangeText={newName => setName(newName)}
                defaultValue={name}
                style={styles.field} 
                placeholder="Digite aqui o nome completo" />
            <Text style={styles.field_name}>Sexo</Text>
            <Picker
                style={styles.picker}
                onValueChange={newSex => setSex(newSex)}
                defaultValue={sex}>
                <Picker.Item style={styles.text} label='M' value='M' />
                <Picker.Item style={styles.text} label='F' value='F' />
            </Picker>
            <Text style={styles.field_name}>Data de nascimento</Text>
            <DateField 
                labelDate="Dia"
                labelMonth="Mês"
                labelYear="Ano"
                onValueChange={newBirthDate => setBirthDate(newBirthDate)}
                defaultValue={birthDate}
                styleInput={{ fontSize: 15 }}
                containerStyle={{ marginVertical: 20 }}
                styleInput={{ width: 244/3,
                            height: 50,
                            backgroundColor: '#F2F2F5',
                            marginLeft: 2,
                            marginRight: 2
                            }}
                onSubmit={(value) => console.log(value)}
            />
            <Text style={styles.field_name}>Raça</Text>
            <Picker 
                onValueChange={newRace => setRace(newRace)}
                defaultValue={race}
                style={styles.picker}>
                <Picker.Item label='Branco' value='Branco' />
                <Picker.Item label='Negro' value='Negro' />
                <Picker.Item label='Pardo' value='Pardo' />
                <Picker.Item label='Amarelo' value='Amarelo' />
                <Picker.Item label='Indígena' value='Indígena' />
                <Picker.Item label='Outro' value='Outro' />
            </Picker>
            <Text style={styles.field_name}>Hospital</Text>
            <Picker 
                onValueChange={newHospital => setHospital(newHospital)}
                defaultValue={hospital}
                style={styles.picker}>
                {options.map((item, index) => {
                    return (<Picker.Item label={item} value={index} key={index} />);
                })}
            </Picker>
            <Text style={styles.field_name}>Matrícula</Text>
            <TextInput 
                onChangeText={newEnrollment => setEnrollment(newEnrollment)}
                defaultValue={enrollment}
                style={styles.field}
                placeholder="Digite aqui a matrícula" />
            <Text style={styles.field_name}>Leito atual</Text>
            <TextInput 
                onChangeText={newCurrentBed => setCurrentBed(newCurrentBed)}
                defaultValue={currentBed}
                style={styles.field}
                placeholder="Digite aqui o número" />
            <Text style={styles.field_name}>Histórico do patiente</Text>
            <TextInput 
                onChangeText={newPatientHistory => setPatientHistory(newPatientHistory)}
                defaultValue={patientHistory}
                multiline={true}
                style={styles.big_field}
                placeholder="Digite aqui o histórico do patiente" />
            <Text style={styles.field_name}>Informações da solicitação</Text>
            <TextInput
                onChangeText={newSolicitationInfo => setSolicitationInfo(newSolicitationInfo)}
                defaultValue={solicitationInfo}
                multiline={true}
                style={styles.big_field}
                placeholder="Digite aqui as informações da solicitação do patiente" />
            <Pressable 
                onPress={ () => uploadExam(patient, new ExamInfo(name, sex, birth_date, race, hospital, enrollment, current_bed, patient_history, solicitation_info)) }
                style={styles.button}>
                <Text style={styles.text}>Cadastrar</Text>
            </Pressable>
            <StatusBar style="auto" />
        </View>
    );
}