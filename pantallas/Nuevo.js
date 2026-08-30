import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function Nuevo({ navigation }) {
  return (
    <View style={styles.pantalla}>
      
      <TextInput placeholder="Escribe el nombre aquí" style={styles.cajaTexto} />
      <TextInput placeholder="Escribe el teléfono" style={styles.cajaTexto} />
      <TextInput placeholder="Escribe la ciudad" style={styles.cajaTexto} />
      
      <Button 
        title="Guardar" 
        onPress={() => navigation.goBack()} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, padding: 20, backgroundColor: '#fff' },
  cajaTexto: { borderWidth: 1, borderColor: '#aaa', padding: 10, marginBottom: 15, borderRadius: 8 }
});
