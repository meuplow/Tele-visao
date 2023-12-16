import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable } from 'react-native';
import { getDownloadURL, ref, getStorage } from 'firebase/storage';

import styles from '../styles.js';
import { db } from '../../src/config/firebase.js';
import { updateDoc, doc } from 'firebase/firestore';

class ExamInfo {
  constructor(diagnostico, images) {
    this.diagnostico = diagnostico;
    this.images = images;
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
      'laudo_finalizado': true,
    });

    return;
  } catch (error) {
    console.error('Erro ao adicionar informações do exame no laudo:', error);
    throw error;
  }
}

export default function Laudo({ route }) {
  const { patient } = route.params;
  const [urlRight, setUrlRight] = useState('');
  const [urlLeft, setUrlLeft] = useState('');
  const [data, setData] = useState('');
  const [diagnostico, setDiagnostico] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storage = getStorage();
  
        // Verifica se 'images' está definido e possui pelo menos um elemento
        if (patient['dados']['images'] && patient['dados']['images'].length > 0) {
          const referenceRight = ref(storage, patient['dados']['images'][0]);
          await getDownloadURL(referenceRight).then((x) => {
            setUrlRight(x);
          });
        }
  
        // Verifica se 'images' está definido e possui mais de um elemento
        if (patient['dados']['images'] && patient['dados']['images'].length > 1) {
          const referenceLeft = ref(storage, patient['dados']['images'][1]);
          await getDownloadURL(referenceLeft).then((x) => {
            setUrlLeft(x);
          });
        }
  
        setData(formatDate(patient['dados']['data_de_nascimento'].toDate()));
      } catch (error) {
        console.error('Erro ao obter dados do paciente:', error);
      }
    };
  
    fetchData();
  }, []); 

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const [showFullScreenRight, setShowFullScreenRight] = useState(false);
  const [showFullScreenLeft, setShowFullScreenLeft] = useState(false);

  const handleImageClick = (eye) => {
    eye === 'direito' ? setShowFullScreenRight(true) : setShowFullScreenLeft(true);
  };

  const handleCloseFullScreen = (eye) => {
    eye === 'direito' ? setShowFullScreenRight(false) : setShowFullScreenLeft(false);
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
        Visualizar Imagem Olho Direito
        <View style={{ width: 20 }} />
        <Image onClick={() => handleImageClick('direito')} source={{ uri: urlRight }} style={{ height: 80, width: 120 }} />

        {showFullScreenRight && (
          <Image onClick={() => handleCloseFullScreen('direito')} source={{ uri: urlRight }} style={styles.img_full} />
        )}
      </Text>

      {urlLeft && (
        <Text style={styles.field_name_img}>
          Visualizar Imagem Olho Esquerdo
          <View style={{ width: 20 }} />
          <Image onClick={() => handleImageClick('esquerdo')} source={{ uri: urlLeft }} style={{ height: 80, width: 120 }} />

          {showFullScreenLeft && (
            <Image onClick={() => handleCloseFullScreen('esquerdo')} source={{ uri: urlLeft }} style={styles.img_full} />
          )}
        </Text>

        <View>
            <Text style={styles.title}>Imagem Olho Esquerdo</Text>
            {urlLeft && <Image source={{ uri: urlLeft }} style={{ height: 200, width: 300 }} />}
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}
