import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import styles from '../styles.js';

export default function Exame({navigation}) {
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.list_button} onPress={pickImage}>
                <Text style={styles.field_name}>Selecionar imagem da galeria</Text>
            </Pressable>
            <Text style={styles.field_name}>Descrição</Text>
            <TextInput multiline={true} style={styles.big_field} placeholder="Informe o olho que a imagem foi capturada e demais informações relevantes" />
            <Pressable style={styles.button}>
                <Text style={styles.text}>Enviar exame</Text>
            </Pressable>
            <StatusBar style="auto" />
        </View>
    );
}