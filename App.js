import React, { useRef, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './views/Login/Login';
import Cadastro_Perfil from './views/Home/Cadastro_Perfil';

import Oftalmologista_Home from './views/Oftalmologista/Oftalmologista_Home';
import Exames_Pendentes_Oftalmologista from './views/Oftalmologista/Exames_Pendentes_Oftalmologista';
import Laudo from './views/Oftalmologista/Laudo';
import Ver_Laudo from './views/Oftalmologista/Ver_Laudo';
import Laudos_Feitos from './views/Oftalmologista/Laudos_Feitos';


import Admin_Home from './views/Admin/Admin_Home';
import Cadastra_Local from './views/Admin/Cadastra_Local';
import Autoriza_Usuarios from './views/Admin/Autoriza_Usuarios';
import Verifica_Usuarios from './views/Admin/Verifica_Usuarios';
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

import { userGlobal } from './global';

import { DefaultTheme } from '@react-navigation/native';
import Home from './views/Home/Home';

export default function App() {
  const Stack = createStackNavigator();

  const navTheme = DefaultTheme;
  navTheme.colors.background = '#fff';

  return (
    <NavigationContainer theme={navTheme}>
       <Stack.Navigator>
      {userGlobal.isLoggedIn == false && <Stack.Screen options={{ headerShown: false }} name='Home' component={Home} />}
      
       <Stack.Screen options={{ headerTitle: '',  headerTransparent: true, headerLeft: null}} name='Cadastro_Perfil' component={Cadastro_Perfil} />

       <Stack.Screen options={{ headerTitle: '',  headerTransparent: true, headerLeft: null}} name='Login' component={Login} />

       <Stack.Screen options={{ headerTitle: '', headerTransparent: true, headerLeft: null}} name='Admin_Home' component={Admin_Home} />
       <Stack.Screen options={{ title: '', headerTransparent: true,  }} name='Cadastra_Local' component={Cadastra_Local} />
       <Stack.Screen options={{ title: '', headerTransparent: true,  }} name='Autoriza_Usuarios' component={Autoriza_Usuarios} />
       <Stack.Screen options={{ title: '', headerTransparent: true,  }} name='Verifica_Usuarios' component={Verifica_Usuarios} />
       <Stack.Screen options={{ title: '', headerTransparent: true,  }} name='Seleciona_Examinador_Da_Semana' component={Seleciona_Examinador_Da_Semana} />

       <Stack.Screen options={{ headerTitle: '', headerTransparent: true, headerLeft: null}}  name='Requisitante_Home' component={Requisitante_Home} />
       <Stack.Screen options={{ headerTitle: '', headerTransparent: true}} name='Solicitacao_Exame' component={Solicitacao_Exame} />
       <Stack.Screen options={{ headerTitle: '', headerTransparent: true}} name='Ver_Laudos' component={Ver_Laudos} />

       <Stack.Screen options={{ headerTitle: '', headerTransparent: true, headerLeft: null}} name='Oftalmologista_Home' component={Oftalmologista_Home} />
       <Stack.Screen options={{ headerTitle: '', headerTransparent: true}} name='Exames_Pendentes_Oftalmologista' component={Exames_Pendentes_Oftalmologista} />
       <Stack.Screen options={{ headerTitle: '', headerTransparent: true}} name='Laudo' component={Laudo} />
       <Stack.Screen options={{ headerTitle: '', headerTransparent: true}} name='Laudos_Feitos' component={Laudos_Feitos} />
       <Stack.Screen options={{ headerTitle: '', headerTransparent: true}} name='Ver_Laudo' component={Ver_Laudo} />

       <Stack.Screen options={{ headerTitle: '', headerTransparent: true, headerLeft: null}} name='Examinador_Home' component={Examinador_Home} />
       <Stack.Screen  options={{ headerTitle: '', headerTransparent: true}} name='Exame' component={Exame} />
       <Stack.Screen options={{ headerTitle: '', headerTransparent: true}}  name='Atribuir_Coleta' component={Atribuir_Coleta} />
       <Stack.Screen  options={{ headerTitle: '', headerTransparent: true}} name='Exames_Atribuidos' component={Exames_Atribuidos}/>
       <Stack.Screen  options={{ headerTitle: '', headerTransparent: true}} name='Coletas_Em_Andamento' component={Coletas_Em_Andamento}/>
       <Stack.Screen  options={{ headerTitle: '', headerTransparent: true}} name='Coletas_Feitas' component={Coletas_Feitas}/>
     </Stack.Navigator>
    </NavigationContainer>
  );
}