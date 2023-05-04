import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import styles from '../styles.js';
import { getDownloadURL, ref, getStorage } from 'firebase/storage';

export default function Ver_Laudo({route}) {
    
    const { patient } = route.params;
    const [ url, setUrl ] = useState('');
    const [ data, setData ] = useState('');

    useEffect(() => {
        const func = async () => {
            const storage = getStorage();
            const reference = ref(storage, patient['dados']['image']);

            setData(formatDate(patient['dados']['data_de_nascimento']));

            await getDownloadURL(reference).then((x => {
                setUrl(x);
            })
            );};
            func();
    }, []);

    const formatDate = (dateString) => {// Alterar, está dando data invalida
        const options = { year: "numeric", month: "long", day: "numeric"}
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return (
        <View style={styles.containerCentralize}>
            <Text style={styles.title}>Laudo</Text>
            <Text style={styles.title}>Paciente</Text>
            <Text style={styles.field_name}>{patient['dados']['nome_completo']}</Text>
            <Text style={styles.title}>Sexo</Text>
            <Text style={styles.field_name}>{patient['dados']['sexo']}</Text>
            <Text style={styles.title}>Data de nascimento</Text>
            <Text style={styles.field_name}>{data}</Text>
            <Text style={styles.title}>Raça</Text>
            <Text style={styles.field_name}>{patient['dados']['raca']}</Text>
            <Text style={styles.title}>Local</Text>
            <Text style={styles.field_name}>{patient['dados']['local']}</Text>
            <Text style={styles.title}>Matrícula</Text>
            <Text style={styles.field_name}>{patient['dados']['matricula']}</Text>
            <Text style={styles.title}>Leito atual</Text>
            <Text style={styles.field_name}>{patient['dados']['leito_atual']}</Text>
            <Text style={styles.title}>Histórico</Text>
            <Text style={styles.field_name}>{patient['dados']['historico_paciente']}</Text>
            <Text style={styles.title}>Informações da solicitação</Text>
            <Text style={styles.field_name}>{patient['dados']['infos_solicitacao']}</Text>
           
            <Text style={styles.title}>Examinador</Text>
            <Text style={styles.field_name}>{patient['dados']['examinador']}</Text>
            <Text style={styles.title}>Exame</Text>
            {/* Imagem ta cortada */}
            <Image source={{ uri: url }} style={{ height: "20%",width:"20%"}} /> 
            <Text style={styles.title}>Descrição</Text>
            <Text style={styles.field_name}>{patient['dados']['description']}</Text>

            <Text style={styles.title}>Diagnóstico</Text>
            <Text style={styles.field_name}>{patient['dados']['diagnostico']}</Text>
            
            <StatusBar style="auto" />
        </View>
    );
}