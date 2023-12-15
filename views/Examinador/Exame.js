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
    constructor(images, description) {
        this.images = images;
        this.description = description;
    }
}

async function uploadImage(images, id) {
    const imageUrls = [];

    for (const image of images) {
      const { uri } = image;
      const filename = 'imagens_exames/' + id + '_' + imageUrls.length + '.jpg';
  
      const imageBase64 = uri.replace('data:image/jpeg;base64,', '');
      const imageBytes = Buffer.from(imageBase64, "base64");
  
      const imageRef = ref(storage, filename);
      await uploadBytes(imageRef, imageBytes);
  
      imageUrls.push(filename);
    }
  
    return imageUrls;
  }

async function addExamInfo(patient, examInfo) {
    let patientData = patient['dados'];
    
    // cria referência do documento do paciente no banco de dados
    const patientRef = doc(db, 'exames', patient['id']);

    // envia imagem para o Firebase Storage
    const imageUrl = await uploadImage(examInfo.images, patient['id']);
    patientData['images'] = imageUrl;
    patientData['description'] = examInfo.description;

    // atualiza somente os campos image e description a partir de um JSON
    await updateDoc(patientRef, {
        'images': imageUrl,
        'description': examInfo.description,
        'coletado': true,
    });
    return;
}

export default function Exame({ route, navigation }) {

    const { patient } = route.params;

    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
  
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

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

        if (!result.cancelled) {
            // Add a imagem da coleta ao array de imagens
            setImages([...images, result]);
        }
        return result;
    };
 
    const addInfo = async (patient, examInfo) => {
        console.log(images)
        await addExamInfo(patient, examInfo);
    };

    const simpleAlert = () => {
        alert("Imagem e descrição enviados com sucesso!");
    }

    const uploadExam = async (patient, examInfo) => {
        addInfo(patient, new ExamInfo(images, description));
        simpleAlert();
        getUserNavigate();
    }

    const renderImageInfo = (images, index) => (
        <View key={index} style={styles.container_exame}>
            <Icon_person style={styles.camera_icon} name="check" size={20} color="#A3E8A3" />
            <Text style={styles.subtitle}>Imagem {index + 1} Carregada</Text>
        </View>
    );

    return (
        <View style={styles.containerCentralize}>
            <Text style={styles.title}>Dados da coleta</Text>
            {/* <View style={styles.list_button_local}><Text style={styles.field_name_left}>{patient['dados']['nome_completo']}</Text></View> */}
            <View style={styles.container}>
            <Text style={styles.field_name}> Exame realizado em {patient['dados']['nome_completo']}</Text>
            <Text style={styles.field_name}> Local: {patient['dados']['local']}</Text>
            <Text style={styles.field_name}> Matrícula: {patient['dados']['matricula']}</Text>
            <Text style={styles.field_name}> Solicitação: {patient['dados']['infos_solicitacao']}</Text>
            </View>
            <View style={styles.container_exame}>
            <Pressable style={styles.list_button} onPress={() => pickImage()}>
                 <Text style={styles.field}> Clique aqui e selecione a imagem do exame na galeria </Text>
                 <Icon name="upload" size={30} color="#4864b0" />
             </Pressable>

             {images.map(renderImageInfo)}

            </View>
            {images&& <View style={styles.container_exame}>
                <Icon_person style={styles.camera_icon} name="check" size={20} color='#A3E8A3'/>
                <Text style={styles.subtitle}>Imagem Carregada</Text>
            </View>}
                <Text style={styles.field_name}>Descrição da imagem coletada </Text>
                <TextInput 
                    onChangeText={newDesc => setDescription(newDesc)}
                    defaultValue={description}
                    id="descricao"
                    multiline={true}
                    style={styles.big_field}
                    placeholder="Informe o olho que a imagem foi capturada e demais informações relevantes" />
            <View style={styles.container_exame}>
            <Pressable onPress={() => uploadExam(patient, new ExamInfo(images, description))} style={styles.button_exam}>
                 <Text style={styles.text}>Enviar exame</Text>
             </Pressable>
            <StatusBar style="auto" />
           </View>
        </View>
    );
}
