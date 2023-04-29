import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles.js';

import { db } from '../../src/config/firebase.js';
import { addDoc, collection, query, getDocs } from 'firebase/firestore';

class UsuarioInfo {
    constructor(email, perfil, id_local) {
        this.email = email;
        this.perfil = perfil;
        this.id_local = id_local;
    }
}

async function addUsuarioInfo(usuarioInfo) {
    await addDoc(collection(db, 'usuario'), {
        'email': usuarioInfo.email,
        'perfil': usuarioInfo.perfil,
        'id_local': usuarioInfo.id_local
    });

    return;
}

export default function Cadastra_Usuario() {
    const [email, set_email] = useState('');
    const [perfil, set_perfil] = useState('');
    const [id_local, set_id_local] = useState('');

    const addInfo = async (usuarioInfo) => {
        await addUsuarioInfo(usuarioInfo);
    };

    const simpleAlert = () => {
        alert("Usuário autorizado com sucesso!");
    }

    const uploadUsuario = async (usuarioInfo) => {
        addInfo(new UsuarioInfo(email, perfil, id_local));
        simpleAlert();
    }

    async function getLocais(){
        let locais = new Array();
        let locaisRef = collection(db, "local");
        let acceptedQuery = query(locaisRef);
        let locaisSnapshot = await getDocs(acceptedQuery);
        locaisSnapshot.forEach(local => {
            locais.push({'id': local.id, 'dados': local.data()});
        });
        return locais;
    }

    const [locais, setLocais] = useState([]);

    useEffect(() => {
        const getLocs = async () => {
          const respLocais = await getLocais();
          setLocais(respLocais);
        }
        getLocs();
    }, []);

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Autorização de Novo Usuário</Text>
            <Text style={styles.field_name}>E-mail do Usuário</Text>
            <TextInput 
                onChangeText={new_email_usuario => set_email(new_email_usuario)}
                defaultValue={email}
                style={styles.field}
                placeholder="Digite aqui o e-mail do usuario" />
            <Text style={styles.field_name}>Perfil</Text>
            <Picker
                style={styles.picker}
                onValueChange={new_perfil => set_perfil(new_perfil)}
                defaultValue={perfil}>
                <Picker.Item style={styles.text} label='Examinador' value='examinador' />
                <Picker.Item style={styles.text} label='Requisitante' value='requisitante' />
                <Picker.Item style={styles.text} label='Oftalmologista' value='oftalmologista' />
            </Picker>
            <Text style={styles.field_name}>Local</Text>
            <Picker
                style={styles.picker}
                onValueChange={new_local => set_id_local(new_local)}
                defaultValue={id_local}>
                {locais.map(local => {
                    return (
                        <Picker.Item style={styles.text} key={local.id} label={local['dados']["nome_local"]} value={local.id} />
                    )
                })}
            </Picker>
            <Pressable
                onPress={() => uploadUsuario(new UsuarioInfo(email, perfil, id_local))}
                style={styles.button}>
                <Text style={styles.text}>Cadastrar</Text>
            </Pressable>
            <StatusBar style="auto" />
        </View>
    );
}