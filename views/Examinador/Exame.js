import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, Pressable, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import styles from '../styles.js';
import { db } from '../../src/config/firebase.js';
import { getFirestore, collection, where, addDoc, updateDoc, query, getDocs, documentId } from 'firebase/firestore';

class ExamInfo {
    constructor(image, description) {
        this.image = image;
        this.description = description;
    }
}

function descExame(exame) {
    addDoc(collection(db, "exames"), {
        descricao: exame
      });
};

async function uploadImage(image) {
    // TODO
    // como upar imagem: https://instamobile.io/mobile-development/react-native-firebase-storage/
     return;
}

async function addExamInfo(patient, examInfo) {
    // busca pelo paciente feita da forma mais porca possível
    const examsRef = collection(db, 'exames');
    const q = query(examsRef, where(documentId(), '==', patient.id));
    const patientDoc = await getDocs(q)[0];


    // imagem precisa ser enviada ao Firebase Storage
    patient['image'] = examInfo.image;
    patient['description'] = examInfo.description;
    
    updateDoc(patientDoc, patient);
}

export default function Exame({ route, navigation }) {

    const { patient } = route.params;

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
      return result;
    };
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const addInfo = async (patient, examInfo) => {
        await addExamInfo(patient, examInfo);
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.list_button} onPress={ () => setImage(pickImage()) }>
                <Text style={styles.field_name}>Selecionar imagem da galeria</Text>
            </Pressable>
            <Text style={styles.field_name}>Descrição</Text>
            <TextInput 
                onChangeText={newDesc => setDescription(newDesc)}
                defaultValue={description}
                id="descricao"
                multiline={true}
                style={styles.big_field}
                placeholder="Informe o olho que a imagem foi capturada e demais informações relevantes" />
            <Pressable onPress={ () => addInfo(patient, new ExamInfo(image, description)) } style={styles.button}>
                <Text style={styles.text}>Enviar exame</Text>
            </Pressable>
            <StatusBar style="auto" />
        </View>
    );
}