import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";


const contactosPrueba = [
  { id: "1", nombre: "Cristian", telefono: "3001234567", ciudad: "Medellín" },
  { id: "2", nombre: "Carolina", telefono: "3109876543", ciudad: "Bogotá" },
];


export default function Lista({ navigation }) {
  return (
    <View style={styles.pantalla}>
      <FlatList
        data={contactosPrueba} 
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
         
          <TouchableOpacity
            style={styles.tarjeta}
            onPress={() => navigation.navigate("Detalle", { contacto: item })}
          >
            <Text style={styles.textoNombre}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
      />
      <Button
        title="Crear un contacto nuevo"
        onPress={() => navigation.navigate("Nuevo")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, padding: 20, backgroundColor: "#fff" },
  tarjeta: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
    borderRadius: 5,
  },
  textoNombre: { fontSize: 18 },
});
