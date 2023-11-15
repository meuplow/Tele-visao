import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, Pressable } from 'react-native';
import styles from '../styles.js';

import { db } from '../../src/config/firebase.js';
import { addDoc, collection } from 'firebase/firestore';

class LocalInfo {
    constructor(nome_local, administrador) {
        this.nome_local = nome_local;
        this.administrador = administrador;
    }
}

async function addLocalInfo(localInfo) {
    await addDoc(collection(db, 'local'), {
        'nome_local': localInfo.nome_local,
        'administrador': localInfo.administrador
    });

    return;
}

export default function Cadastra_Local() {
    const [nome_local, set_nome_local] = useState('');
    const [administrador] = useState('aaaa');

    const addInfo = async (localInfo) => {
        await addLocalInfo(localInfo);
    };

    const simpleAlert = () => {
        alert("Local cadastrado com sucesso!");
    }

    const uploadLocal = async (localInfo) => {
        addInfo(new LocalInfo(nome_local, administrador));
        simpleAlert();
    }

    return(
        <View style={styles.containerCentralize}>
            <Text style={styles.title}>Cadastro de Novo Local</Text>
            <View style={styles.separator} />
            <Text style={styles.field_name}>Nome do Local</Text>
            <TextInput 
                onChangeText={new_nome_local => set_nome_local(new_nome_local)}
                defaultValue={nome_local}
                style={styles.fieldLocal}
                placeholder="Digite aqui o nome do local" />
            <Pressable
                onPress={() => uploadLocal(new LocalInfo(nome_local, administrador))}
                style={styles.button}>
                <Text style={styles.text}>Cadastrar</Text>
            </Pressable>
            <StatusBar style="auto" />
        </View>
    );
}