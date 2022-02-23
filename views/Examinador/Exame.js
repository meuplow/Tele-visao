import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, Pressable, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import styles from '../styles.js';
import { db } from '../../src/config/firebase.js';
import { getFirestore, collection, getDocs, addDoc} from 'firebase/firestore';

//Save exams discription

//*****Need to send the discription to the correct patient******
function descExame(exame) {
    // let exame = "new exame"
    addDoc(collection(db, "exames"), {
        descricao: exame
      });
};

export default function Exame({navigation}) {
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
    };
    const [text, setText] = useState('');

    return (
        <View style={styles.container}>
            <Pressable style={styles.list_button} onPress={pickImage}>
                <Text style={styles.field_name}>Selecionar imagem da galeria</Text>
            </Pressable>
            <Text style={styles.field_name}>Descrição</Text>
            <TextInput 
                onChangeText={newText => setText(newText)}
                defaultValue={text}
                id="descricao"
                multiline={true}
                style={styles.big_field}
                placeholder="Informe o olho que a imagem foi capturada e demais informações relevantes" />
            <Pressable onPress={()=>descExame(text)} style={styles.button}>
                <Text style={styles.text}>Enviar exame</Text>
            </Pressable>
            <StatusBar style="auto" />
        </View>
    );
}