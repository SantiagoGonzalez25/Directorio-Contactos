import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';


import Lista from './pantallas/Lista';


function PantallaDetalle() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Formulario detallee</Text>
    </View>
  );
}

function PantallaNuevo() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Formulario nuevo</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lista">
        <Stack.Screen name="Lista" component={Lista} options={{ title: 'Directorio' }} />
        <Stack.Screen name="Detalle" component={PantallaDetalle} />
        <Stack.Screen name="Nuevo" component={PantallaNuevo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}