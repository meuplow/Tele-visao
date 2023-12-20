import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon_person from 'react-native-vector-icons/Fontisto';
import { useIsFocused } from '@react-navigation/native';
import styles from '../styles.js';
import { userGlobal } from '../../global.js';
import { db, storage } from '../../src/config/firebase.js';
import { collection, getDocs, updateDoc, doc,  query, where} from 'firebase/firestore';
import { uploadBytes, ref } from "firebase/storage";
import { Buffer } from "buffer";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import loginStyle from '../Login/LoginStyle.js';


class ExamInfo {
    constructor(image1, image2, description) {
        this.image1 = image1;
        this.image2 = image2;
        this.description = description;
    }
}

async function uploadImage1(image, id) {
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

async function uploadImage2(image, id) {
    const { uri } = image;
    const filename = 'imagens_exames/2' + id + '.jpg';

    // caso seja exportado para iOS, usar essa linha
    // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    const imageBase642 = uri.replace('data:image/jpeg;base64,', '');
    const imageBytes2 = Buffer.from(imageBase642, "base64");

    const imageRef2 = ref(storage, filename);
    const result = await uploadBytes(imageRef2, imageBytes2);

    return filename;
}

async function addExamInfo(patient, examInfo) {
    let patientData = patient['dados'];
    
    // cria referência do documento do paciente no banco de dados
    const patientRef = doc(db, 'exames', patient['id']);

    // envia imagem para o Firebase Storage
    const imageUrl1 = await uploadImage1(examInfo.image1, patient['id']);
    const imageUrl2 = await uploadImage2(examInfo.image2, patient['id']);
    patientData['image1'] = imageUrl1;
    patientData['image2'] = imageUrl2;
    patientData['description'] = examInfo.description;

    // atualiza somente os campos image e description a partir de um JSON
    await updateDoc(patientRef, {
        'image1': imageUrl1,
        'image2': imageUrl2,
        'description': examInfo.description,
        'coletado': true,
        'laudo_finalizado': false,
    });
    return;
}

export default function Exame({ route, navigation }) {

    const { patient } = route.params;

    const getUserNavigate = async () => {
        let users = new Array();
        let userRef = collection(db, "usuario");
        let acceptedQuery = query(userRef, where("email", "==", userGlobal.email));
        let userSnapshot = await getDocs(acceptedQuery);
        userSnapshot.forEach(u => {
        users.push({'dados': u.data()});
        });
        
        navigation.navigate('Examinador_Home', {
          users: users
      })
    }

    const pickImage1 = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
        setImage1(result);
        return result;
    };

    const pickImage2 = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        setImage2(result);
        return result;
    };

    const [description, setDescription] = useState('');
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);

    const addInfo = async (patient, examInfo) => {
        await addExamInfo(patient, examInfo);
    };

    const simpleAlert = () => {
        alert("Imagem e descrição enviados com sucesso!");
    }

    const uploadExam = async (patient, examInfo) => {
        addInfo(patient, new ExamInfo(image1, image2, description));
        simpleAlert();
        getUserNavigate();
    }

    return (
        <View style={styles.containerCentralize}>
            <Text style={styles.title}>Dados da coleta</Text>
            {/* <View style={styles.list_button_local}><Text style={styles.field_name_left}>{patient['dados']['nome_completo']}</Text></View> */}
            <View style={styles.container}>
            <Text style={styles.field_name}> Exame realizado para {patient['dados']['nome_completo']}</Text>
            <Text style={styles.field_name}> Local: {patient['dados']['local']}</Text>
            <Text style={styles.field_name}> Matrícula: {patient['dados']['matricula']}</Text>
            <Text style={styles.field_name}> Solicitação: {patient['dados']['infos_solicitacao']}</Text>
            </View>
            <View style={styles.container_exame}>
                <Pressable style={styles.list_button} onPress={ () => pickImage1() }>
                    <Text style={styles.field_name}>Selecionar a primeira Imagem</Text>
                </Pressable></View>
            {image1 && <View style={styles.container_exame}>
                <Icon_person style={styles.camera_icon} name="check" size={20} color='#A3E8A3'/>
                <Text style={styles.subtitle}>Imagem 1 Carregada</Text>
            </View>}

            <View style={styles.container_exame}>
                <Pressable style={styles.list_button} onPress={ () => pickImage2() }>
                    <Text style={styles.field_name}>Selecionar a segunda Imagem</Text>
                </Pressable></View>
            {image2 && <View style={styles.container_exame}>
                <Icon_person style={styles.camera_icon} name="check" size={20} color='#A3E8A3'/>
                <Text style={styles.subtitle}>Imagem 2 Carregada</Text>
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
            <Pressable onPress={ () => uploadExam(patient, new ExamInfo(image1, image2, description)) } style={styles.button_exam}>
                <Text style={styles.text}>Enviar exame</Text>
            </Pressable></View>
            <StatusBar style="auto" />
        </View>
    );
}
