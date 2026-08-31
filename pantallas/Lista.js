import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

export default function Lista({ navigation }) {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    onSnapshot(collection(db, "contactos"), (snapshot) => {
      const lista = [];
      snapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setContactos(lista);
      setCargando(false);
    });
  }, []);

  if (cargando) {
    return (
      <View style={[styles.pantalla, styles.centrado]}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.pantalla}>
      <FlatList
        data={contactos}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.textoVacio}>
            No hay contactos registrados aún.
          </Text>
        }
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
  centrado: { justifyContent: "center", alignItems: "center" },
  tarjeta: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
    borderRadius: 5,
  },
  textoNombre: { fontSize: 18 },
  textoVacio: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});
