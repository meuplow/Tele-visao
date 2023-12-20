import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon_person from 'react-native-vector-icons/Fontisto';
import { useIsFocused } from '@react-navigation/native';
import styles from '../styles.js';
import { userGlobal } from '../../global.js';
import { db, storage } from '../../src/config/firebase.js';
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
import { uploadBytes, ref } from 'firebase/storage';
import { Buffer } from 'buffer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import loginStyle from '../Login/LoginStyle.js';

class ExamInfo {
  constructor(images, description) {
    this.images = images;
    this.description = description;
  }
}

async function uploadImage(image, id, eye) {
  try {
    const { uri } = image;
    const filename = `imagens_exames/${id}_Imagem_${eye}.jpg`;

    const response = await fetch(uri);
    const imageBytes = await response.arrayBuffer();

    const imageRef = ref(storage, filename);
    
    // Adicionando o tipo MIME ao salvar os bytes
    const metadata = {
      contentType: 'image/jpeg',
    };

    await uploadBytes(imageRef, imageBytes, metadata);

    return filename;
  } catch (error) {
    console.error('Erro ao fazer o upload da imagem:', error);
    throw error;
  }
}

export default function Exame({ route, navigation }) {
  const { patient } = route.params;
  const [description, setDescription] = useState('');
  const [imageRight, setImageRight] = useState(null);
  const [imageLeft, setImageLeft] = useState(null);

  const addInfo = async (patient, examInfo) => {
    try {
      let patientData = patient['dados'];
      const patientRef = doc(db, 'exames', patient['id']);
      
      const imageUrls = await Promise.all(examInfo.images.map(async (image, index) => {
        const imageUrl = await uploadImage(image.image, patient['id'], `${examInfo.images.length === 1 ? '' : index + 1}_Imagem_${image.eye}`);
        return imageUrl;
      }));

      patientData['images'] = imageUrls;

      await updateDoc(patientRef, {
        'images': imageUrls,
        'description': examInfo.description,
        'coletado': true,
      });
    } catch (error) {
      console.error('Erro ao adicionar informações do exame:', error);
      throw error;
    }
  };

  const uploadExam = async (patient, examInfo) => {
    try {
      await addInfo(patient, new ExamInfo([imageRight, imageLeft], description));
      simpleAlert();
      getUserNavigate();
    } catch (error) {
      console.error('Erro ao fazer o upload do exame:', error);
    }
  };

  const pickImage = async (eye) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        const image = { image: result, eye };
        eye === 'direito' ? setImageRight(image) : setImageLeft(image);
      }

      return result;
    } catch (error) {
      console.error('Erro ao selecionar a imagem:', error);
      throw error;
    }
  };

  const simpleAlert = () => {
    alert('Imagem e descrição enviados com sucesso!');
  };

  const getUserNavigate = async () => {
    try {
      let users = [];
      let userRef = collection(db, 'usuario');
      let acceptedQuery = query(userRef, where('email', '==', userGlobal.email));
      let userSnapshot = await getDocs(acceptedQuery);
      userSnapshot.forEach((u) => {
        users.push({ dados: u.data() });
      });

      navigation.navigate('Examinador_Home', {
        users: users,
      });
    } catch (error) {
      console.error('Erro ao navegar para a tela de usuário:', error);
      throw error;
    }
  };

  return (
    <View style={styles.containerCentralize}>
      <Text style={styles.title}>Dados da coleta</Text>

      <View style={styles.container}>
        <Text style={styles.field_name}> Exame realizado em {patient['dados']['nome_completo']}</Text>
        <Text style={styles.field_name}> Local: {patient['dados']['local']}</Text>
        <Text style={styles.field_name}> Matrícula: {patient['dados']['matricula']}</Text>
        <Text style={styles.field_name}> Solicitação: {patient['dados']['infos_solicitacao']}</Text>
      </View>

      <View style={styles.container_exame}>
        <Pressable style={styles.list_button} onPress={() => pickImage('direito')}>
          <Text style={styles.field}> Clique aqui e selecione a imagem do olho direito</Text>
          <Icon name="upload" size={30} color="#4864b0" />
        </Pressable>
      </View>

      {imageRight && (
        <View style={styles.container_exame}>
          <Icon_person style={styles.camera_icon} name="check" size={20} color="#A3E8A3" />
          <Text style={styles.subtitle}>Imagem Carregada - Olho direito</Text>
        </View>
      )}

      <View style={styles.container_exame}>
        <Pressable style={styles.list_button} onPress={() => pickImage('esquerdo')}>
          <Text style={styles.field}> Clique aqui e selecione a imagem do olho esquerdo</Text>
          <Icon name="upload" size={30} color="#4864b0" />
        </Pressable>
      </View>

      {imageLeft && (
        <View style={styles.container_exame}>
          <Icon_person style={styles.camera_icon} name="check" size={20} color="#A3E8A3" />
          <Text style={styles.subtitle}>Imagem Carregada - Olho esquerdo</Text>
        </View>
      )}

      <Text style={styles.field_name}>Descrição da imagem</Text>
      <TextInput
        onChangeText={(newDesc) => setDescription(newDesc)}
        defaultValue={description}
        id="descricao"
        multiline={true}
        style={styles.big_field}
        placeholder="Informe demais informações relevantes"
      />

      <View style={styles.container_exame}>
        <Pressable onPress={() => uploadExam(patient, new ExamInfo([imageRight, imageLeft], description))} style={styles.button_exam}>
          <Text style={styles.text}>Enviar exame</Text>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
