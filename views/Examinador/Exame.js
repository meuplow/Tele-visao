import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon_person from 'react-native-vector-icons/Fontisto';

import styles from '../styles.js';
import { db, storage } from '../../src/config/firebase.js';
import { updateDoc, doc } from 'firebase/firestore';
import { uploadBytes, ref } from "firebase/storage";
import { Buffer } from "buffer";

class ExamInfo {
    constructor(image, description) {
        this.image = image;
        this.description = description;
    }
}

// function descExame(exame) {
//     addDoc(collection(db, "exames"), {
//         descricao: exame
//       });
// };

async function uploadImage(image, id) {
    const { uri } = image;
    const filename = 'imagens_exames/' + id + '.jpg';

    // caso seja exportado para iOS, usar essa linha
    // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    const imageBase64 = uri.replace('data:image/jpeg;base64,', '');

    const imageBytes = Buffer.from(imageBase64, "base64");

    const imageRef = ref(storage, filename);
    const result = await uploadBytes(imageRef, imageBytes);

    return filename;
}

async function addExamInfo(patient, examInfo) {
    let patientData = patient['dados'];
    
    // cria referência do documento do paciente no banco de dados
    const patientRef = doc(db, 'exames', patient['id']);

    // envia imagem para o Firebase Storage
    const imageUrl = await uploadImage(examInfo.image, patient['id']);
    patientData['image'] = imageUrl;
    patientData['description'] = examInfo.description;

    // atualiza somente os campos image e description a partir de um JSON
    await updateDoc(patientRef, {
        'image': imageUrl,
        'description': examInfo.description,
        'coletado': true,
    });
    return;
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
        setImage(result);
        return result;
    };
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const addInfo = async (patient, examInfo) => {
        console.log(image)
        await addExamInfo(patient, examInfo);
    };

    const simpleAlert = () => {
        alert("Imagem e descrição enviados com sucesso!");
    }

    const uploadExam = async (patient, examInfo) => {
        addInfo(patient, new ExamInfo(image, description));
        simpleAlert();
    }

    return (
        <View style={styles.container}>
            {/* <View style={styles.list_button_local}><Text style={styles.field_name_left}>{patient['dados']['nome_completo']}</Text></View> */}
            <Text style={styles.field_name}>{patient['dados']['nome_completo']}</Text>
            <View style={styles.container_exame}>
                <Pressable style={styles.list_button} onPress={ () => pickImage() }>
                    <Text style={styles.field_name}>Selecionar imagem da galeria</Text>
                </Pressable></View>
            {image&& <View style={styles.container_exame}>
                <Icon_person style={styles.camera_icon} name="check" size={20} color='#A3E8A3'/>
                <Text style={styles.subtitle}>Imagem Carregada</Text>
            </View>}
                <Text style={styles.field_name}>Descrição</Text>
            <View style={styles.container_exame}>
                <TextInput 
                    onChangeText={newDesc => setDescription(newDesc)}
                    defaultValue={description}
                    id="descricao"
                    multiline={true}
                    style={styles.big_field}
                    placeholder="Informe o olho que a imagem foi capturada e demais informações relevantes" />
            </View>
            <View style={styles.container_exame}>
            <Pressable onPress={ () => uploadExam(patient, new ExamInfo(image, description)) } style={styles.button_exam}>
                <Text style={styles.text}>Enviar exame</Text>
            </Pressable></View>
            <StatusBar style="auto" />
        </View>
    );
}