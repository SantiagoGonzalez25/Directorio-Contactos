import { View, Text, StyleSheet, Button } from "react-native";

export default function Detalle({ route, navigation }) {
  const { contacto } = route.params;

  return (
    <View style={styles.pantalla}>
      <Text style={styles.textoInfo}>Nombre: {contacto.nombre}</Text>
      <Text style={styles.textoInfo}>Teléfono: {contacto.telefono}</Text>
      <Text style={styles.textoInfo}>Ciudad: {contacto.ciudad}</Text>

      <Button title="Volver" onPress={() => navigation.goBack()} />

    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, padding: 20, backgroundColor: "#fff" },
  textoInfo: { fontSize: 20, marginBottom: 15 },
});
