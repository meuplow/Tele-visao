import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, Pressable, ActivityIndicatorComponent } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateField from 'react-native-datefield';
import styles from '../styles.js';

import { db } from '../../src/config/firebase.js';
import { addDoc, collection } from 'firebase/firestore';

class ExamInfo {
    constructor(nome_completo, sexo, data_de_nascimento, raca, local, matricula, leito_atual, historico_paciente, infos_solicitacao) {
        this.nome_completo = nome_completo;
        this.sexo = sexo;
        this.data_de_nascimento = data_de_nascimento;
        this.raca = raca;
        this.local = local;
        this.matricula = matricula;
        this.leito_atual = leito_atual;
        this.historico_paciente = historico_paciente;
        this.infos_solicitacao = infos_solicitacao;
    }
}

async function addExamInfo(examInfo) {
    await addDoc(collection(db, 'exames'), {
        'nome_completo': examInfo.nome_completo,
        'sexo': examInfo.sexo,
        'data_de_nascimento': examInfo.data_de_nascimento,
        'raca': examInfo.raca,
        'local': examInfo.local,
        'matricula': examInfo.matricula,
        'leito_atual': examInfo.leito_atual,
        'historico_paciente': examInfo.historico_paciente,
        'infos_solicitacao': examInfo.infos_solicitacao
    });

    return;
}

export default function Cadastro_Perfil({}) {
    const [nome_completo, set_nome_completo] = useState('');
    const [sexo, set_sexo] = useState('M');
    const [data_de_nascimento, set_data_de_nascimento] = useState('');
    const [raca, set_raca] = useState('Branco');
    const [local, set_local] = useState('Santa Casa');
    const [matricula, set_matricula] = useState('');
    const [leito_atual, set_leito_atual] = useState('');
    const [historico_paciente, set_historico_paciente] = useState('');
    const [infos_solicitacao, set_infos_solicitacao] = useState('');

    const addInfo = async (examInfo) => {
        await addExamInfo(examInfo);
    };

    const simpleAlert = () => {
        alert("Exame solicitado com sucesso!");
    }

    const uploadExam = async (examInfo) => {
        addInfo(new ExamInfo(nome_completo, sexo, data_de_nascimento, raca, local, matricula, leito_atual, historico_paciente, infos_solicitacao));
        simpleAlert();
    }

    var options = ["Santa Casa", "Moinhos de Vento", "Mãe de Deus"];

    return (
        <View style={styles.container}>
            <View style={{ height: 50 }} />
            <Text style={styles.title}>Solicitar Exame</Text>
            <Text style={styles.field_name}>Nome completo</Text>
            <TextInput
                onChangeText={new_nome_completo => set_nome_completo(new_nome_completo)}
                defaultValue={nome_completo}
                style={styles.field}
                placeholder="Digite aqui o nome completo" />
            <Text style={styles.field_name}>Data de nascimento</Text>
            <DateField
                labelDate="Dia"
                labelMonth="Mês"
                labelYear="Ano"
                defaultValue={data_de_nascimento}
                minimumDate={new Date(1900, 1, 1)}
                containerStyle={{ marginVertical: 20 }}
                styleInput={{
                    fontSize: 15,
                    width: 305 / 3,
                    height: 55,
                    backgroundColor: '#F2F2F5',
                    marginLeft: 2,
                    marginRight: 2
                }}
                onSubmit={new_data_de_nascimento => set_data_de_nascimento(new_data_de_nascimento)}
            />
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.field_name}>Sexo</Text>
                    <Picker
                        style={styles.smallpicker}
                        onValueChange={new_sexo => set_sexo(new_sexo)}
                        defaultValue={sexo}
                    >
                        <Picker.Item style={styles.text} label='Masculino' value='Masculino' />
                        <Picker.Item style={styles.text} label='Feminino' value='Feminino' />
                    </Picker>
                </View>
                <View style={{ width: 10 }} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.field_name}>Raça</Text>
                    <Picker
                        onValueChange={new_raca => set_raca(new_raca)}
                        defaultValue={raca}
                        style={styles.smallpicker}
                    >
                        <Picker.Item label='Branco' value='Branco' />
                        <Picker.Item label='Negro' value='Negro' />
                        <Picker.Item label='Pardo' value='Pardo' />
                        <Picker.Item label='Amarelo' value='Amarelo' />
                        <Picker.Item label='Indígena' value='Indígena' />
                        <Picker.Item label='Outro' value='Outro' />
                    </Picker>
                </View>
            </View>
            <Text style={styles.field_name}>Local</Text>
            <Picker
                onValueChange={new_local => set_local(new_local)}
                defaultValue={local}
                style={styles.picker}>
                {options.map((item, index) => {
                    return (<Picker.Item label={item} value={index} key={index} />);
                })}
            </Picker>
            <Text style={styles.field_name}>Matrícula</Text>
            <TextInput
                onChangeText={new_matricula => set_matricula(new_matricula)}
                defaultValue={matricula}
                style={styles.field}
                placeholder="Digite aqui a matrícula" />
            <Text style={styles.field_name}>Leito atual</Text>
            <TextInput
                onChangeText={new_leito_atual => set_leito_atual(new_leito_atual)}
                defaultValue={leito_atual}
                style={styles.field}
                placeholder="Digite aqui o número" />
            <Text style={styles.field_name}>Histórico do paciente</Text>
            <TextInput
                onChangeText={new_historico_paciente => set_historico_paciente(new_historico_paciente)}
                defaultValue={historico_paciente}
                multiline={true}
                style={styles.big_field}
                placeholder="Digite aqui o histórico do paciente" />
            <Text style={styles.field_name}>Informações da solicitação</Text>
            <TextInput
                onChangeText={new_infos_solicitacao => set_infos_solicitacao(new_infos_solicitacao)}
                defaultValue={infos_solicitacao}
                multiline={true}
                style={styles.big_field}
                placeholder="Digite aqui as informações da solicitação do paciente" />
            <View style={styles.containerCentralize}>
            <Pressable
                onPress={() => uploadExam(new ExamInfo(nome_completo, sexo, data_de_nascimento, raca, local, matricula, leito_atual, historico_paciente, infos_solicitacao))}
                style={styles.button}>
                <Text style={styles.text}>Solicitar</Text>
            </Pressable>
            <StatusBar style="auto" />
            <View style={{ height: 50 }} />
        </View>
        </View>
    );
}