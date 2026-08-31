import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export default function Nuevo({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");

  const guardarContacto = async () => {
    if (nombre === "" || telefono === "" || ciudad === "") {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    try {
      await addDoc(collection(db, "contactos"), {
        nombre: nombre,
        telefono: telefono,
        ciudad: ciudad,
      });

      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar");
      console.log(error);
    }
  };

  return (
    <View style={styles.pantalla}>
      <Text style={styles.titulo}>Nuevo contacto</Text>

      <TextInput
        placeholder="Nombre"
        style={styles.cajaTexto}
        value={nombre}
        onChangeText={(texto) => setNombre(texto)}
      />
      <TextInput
        placeholder="Teléfono"
        style={styles.cajaTexto}
        value={telefono}
        keyboardType="numeric" 
        maxLength={10}
        onChangeText={(texto) => {
          const soloNumeros = texto.replace(/[^0-9]/g, "");
          setTelefono(soloNumeros);
        }}
      />
      <TextInput
        placeholder="Ciudad"
        style={styles.cajaTexto}
        value={ciudad}
        onChangeText={(texto) => setCiudad(texto)}
      />

      <Button title="Guardar" onPress={guardarContacto} />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, padding: 20, backgroundColor: "#fff" },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  cajaTexto: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
});
