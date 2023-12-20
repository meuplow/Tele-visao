import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, Pressable, Image } from 'react-native';
import { getDownloadURL, ref, getStorage } from 'firebase/storage';

import styles from '../styles.js';
import { db } from '../../src/config/firebase.js';
import { updateDoc, doc } from 'firebase/firestore';

class ExamInfo {
    constructor(diagnostico) {
        this.diagnostico = diagnostico;
    }
}

async function addExamInfo(patient, examInfo) {
   try {
        let patientData = patient['dados'];
        
        // cria referência do documento do paciente no banco de dados
        const patientRef = doc(db, 'exames', patient['id']);

        patientData['diagnostico'] = examInfo.diagnostico;

        // atualiza somente os campos diagnostico a partir de um JSON
        await updateDoc(patientRef, {
            'diagnostico': examInfo.diagnostico,
            'laudo_finalizado': true
        });
        return;
   } catch (error) {
        alert('Erro ao adicionar informações do exame no laudo:', error);
        throw error;
   }
}

export default function Laudo({ route }) {

    const { patient } = route.params;
    const [ url1, setUrl1 ] = useState('');
    const [ url2, setUrl2 ] = useState('');
    const [ data, setData ] = useState('');
    const [diagnostico, setDiagnostico] = useState('');

    const addInfo = async (patient, examInfo) => {
        await addExamInfo(patient, examInfo);
    };

    const simpleAlert = () => {
        alert("Laudo enviado com sucesso!");
    }

    const uploadLaudo = async (patient, examInfo) => {
        addInfo(patient, new ExamInfo(diagnostico));
        simpleAlert();
    }

    useEffect(() => {
        const func = async () => {
            const storage = getStorage();
            const reference1 = ref(storage, patient['dados']['image1']);
            const reference2 = ref(storage, patient['dados']['image2']);

            setData(formatDate(patient['dados']['data_de_nascimento'].toDate()));
            
            await getDownloadURL(reference1).then((x => {
                setUrl1(x);
            }));

            await getDownloadURL(reference2).then((x => {
                setUrl2(x);
            }));
            
        };
        func();
    }, []);

    const formatDate = (dateString) => {// Alterar, está dando data invalida
        const options = { year: "numeric", month: "long", day: "numeric"}
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const [showFullScreen1, setShowFullScreen1] = useState(false);
    const [showFullScreen2, setShowFullScreen2] = useState(false);

    const handleImageClick1 = () => {
        setShowFullScreen1(true);
    };

    const handleCloseFullScreen1 = () => {
        setShowFullScreen1(false);
    };

    const handleImageClick2 = () => {
        setShowFullScreen2(true);
    };

    const handleCloseFullScreen2 = () => {
        setShowFullScreen2(false);
    };
    

    return (
        <View style={styles.container}>
            <View style={{ height: 50 }} />
            <Text style={styles.title}>Paciente</Text>
            <Text style={styles.field_name_left_small}>{patient['dados']['nome_completo']}</Text>
            <Text style={styles.title}>Sexo</Text>
            <Text style={styles.field_name_left_small}>{patient['dados']['sexo']}</Text>
            <Text style={styles.title}>Data de nascimento</Text>
            <Text style={styles.field_name_left_small}>{data}</Text>
            <Text style={styles.title}>Raça</Text>
            <Text style={styles.field_name_left_small}>{patient['dados']['raca']}</Text>
            <Text style={styles.title}>Local</Text>
            <Text style={styles.field_name_left_small}>{patient['dados']['local']}</Text>
            <Text style={styles.title}>Matrícula</Text>
            <Text style={styles.field_name_left_small}>{patient['dados']['matricula']}</Text>
            <Text style={styles.title}>Leito atual</Text>
            <Text style={styles.field_name_left_small}>{patient['dados']['leito_atual']}</Text>
            <Text style={styles.title}>Histórico</Text>
            <Text style={styles.field_name_left_small}>{patient['dados']['historico_paciente']}</Text>
            <Text style={styles.title}>Informações da solicitação</Text>
            <Text style={styles.field_name_left_small}>{patient['dados']['infos_solicitacao']}</Text>
            <Text style={styles.title}>Examinador</Text>
            <Text style={styles.field_name_left_small}>{patient['dados']['examinador']}</Text>

            <Text style={styles.title}>Exame</Text>
            <Text style={styles.field_name_img}>
                Visualizar Imagem 1
                <View style={{ width: 20 }} />
                <Image onClick={handleImageClick1} source={{ uri: url1 }} style={{ height: 80, width:120}} />

                {showFullScreen1 && (
                    <Image onClick={handleCloseFullScreen1} source={{ uri: url1 }} style={styles.img_full} />
                )}
            </Text>
            <Text style={styles.field_name_img}>
                Visualizar Imagem 2
                <View style={{ width: 20 }} />
                <Image onClick={handleImageClick2} source={{ uri: url2 }} style={{ height: 80, width:120}} />

                {showFullScreen2 && (
                    <Image onClick={handleCloseFullScreen2} source={{ uri: url2 }} style={styles.img_full} />
                )}
            </Text>
            <Text style={styles.title}>Descrição</Text>
            <Text style={styles.field_name_left_small}>{patient['dados']['description']}</Text>
           
            <Text style={styles.title}>Diagnóstico</Text>
            <TextInput 
                onChangeText={newDesc => setDiagnostico(newDesc)}
                defaultValue={diagnostico}
                id="diagnostico"
                multiline={true}
                style={styles.big_field}
                placeholder="Descreva o diagnóstico" />
            <Pressable onPress={ () => uploadLaudo(patient, new ExamInfo(diagnostico)) } style={styles.button}>
                <Text style={styles.text}>Enviar laudo</Text>
            </Pressable>
            <View style={{ height: 25 }} />
            <StatusBar style="auto" />
        </View>
    );
}