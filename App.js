import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './views/Home';
import Login from './views/Login';
import Cadastro_Local from './views/Cadastro_Local';
import Cadastro_Perfil from './views/Cadastro_Perfil';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Cadastro_Local' component={Cadastro_Local} />
        <Stack.Screen name='Cadastro_Perfil' component={Cadastro_Perfil} />
      </Stack.Navigator>
    </NavigationContainer>  
  );
}