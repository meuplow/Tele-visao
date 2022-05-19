import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './views/Home/Home';
import Login from './views/Home/Login';
import Cadastro_Perfil from './views/Home/Cadastro_Perfil';

import Oftalmologista_Home from './views/Oftalmologista/Oftalmologista_Home';
import Exames_Pendentes_Oftalmologista from './views/Oftalmologista/Exames_Pendentes_Oftalmologista';
import Laudo from './views/Oftalmologista/Laudo';
import Ver_Laudo from './views/Oftalmologista/Ver_Laudo';
import Laudos_Feitos from './views/Oftalmologista/Laudos_Feitos';


import Admin_Home from './views/Admin/Admin_Home';
import Aceita_Usuarios from './views/Admin/Aceita_Usuarios';
import Seleciona_Examinador_Da_Semana from './views/Admin/Seleciona_Examinador_Da_Semana';

import Examinador_Home from './views/Examinador/Examinador_Home';
import Exames_Pendentes from './views/Examinador/Exames_Pendentes';
import Exame from './views/Examinador/Exame';
import Atribuir_Coleta from './views/Examinador/Atribuir_Coleta';
import Exames_Atribuidos from './views/Examinador/Exames_Atribuidos';
import Coletas_Em_Andamento from './views/Examinador/Coletas_Em_Andamento';
import Coletas_Feitas from './views/Examinador/Coletas_Feitas';

import Requisitante_Home from './views/Requisitante/Requisitante_Home';
import Solicitacao_Exame from './views/Requisitante/Solicitacao_Exame';

import Ver_Laudos from './views/Ver_Laudos';

import { DefaultTheme } from '@react-navigation/native';

export default function App() {
  const Stack = createStackNavigator();

  const navTheme = DefaultTheme;
  navTheme.colors.background = '#fff';

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
        <Stack.Screen name='Requisitante_Home' component={Requisitante_Home} />
        <Stack.Screen name='Solicitacao_Exame' component={Solicitacao_Exame} />
        <Stack.Screen name='Ver_Laudos' component={Ver_Laudos} />

        <Stack.Screen name='Examinador_Home' component={Examinador_Home} options={{title:'Examinador'}}/>
        <Stack.Screen name='Exames_Pendentes' component={Exames_Pendentes} options={{title:'Examinador'}}/>
        <Stack.Screen name='Oftalmologista_Home' component={Oftalmologista_Home} />
        <Stack.Screen name='Exames_Pendentes_Oftalmologista' component={Exames_Pendentes_Oftalmologista} />
        <Stack.Screen name='Laudo' component={Laudo} />
        <Stack.Screen name='Laudos_Feitos' component={Laudos_Feitos} />

        <Stack.Screen name='Exame' component={Exame} />
        <Stack.Screen name='Atribuir_Coleta' component={Atribuir_Coleta} options={{title:'Examinador'}}/>
        <Stack.Screen name='Exames_Atribuidos' component={Exames_Atribuidos} options={{title:'Examinador'}}/>
        <Stack.Screen name='Coletas_Em_Andamento' component={Coletas_Em_Andamento} options={{title:'Examinador'}}/>
        <Stack.Screen name='Coletas_Feitas' component={Coletas_Feitas} options={{title:'Examinador'}}/>

        <Stack.Screen name='Admin_Home' component={Admin_Home} />
        <Stack.Screen name='Aceita_Usuarios' component={Aceita_Usuarios} />
        <Stack.Screen name='Seleciona_Examinador_Da_Semana' component={Seleciona_Examinador_Da_Semana} />

        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Cadastro_Perfil' component={Cadastro_Perfil} />
        <Stack.Screen name='Login' component={Login} />

      </Stack.Navigator>
    </NavigationContainer>  
  );
}