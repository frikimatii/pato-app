import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground, Modal, TextInput } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import appFirebase from "../firebase"; // Asegúrate de importar correctamente tu configuración de Firebase

const auth = getAuth(appFirebase);



 

export default function Dashboard({ navigation }) {
  const [userEmail, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [modalVisible, setModalVisible] = useState(true);
  const [inputUsername, setInputUsername] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    } else {
      setUserEmail("No autenticado");
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate("Log"); // Redirige a la pantalla de inicio de sesión después de cerrar sesión
    } catch (error) {
      Alert.alert("Error", "No se pudo cerrar sesión. Inténtalo de nuevo.");
    }
  };

  const handleUsernameSubmit = () => {
    setUsername(inputUsername);
    console.log("Nombre de usuario ingresado:", inputUsername);
    setModalVisible(false);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://example.com/your-background-image.jpg' }} // Reemplaza con la URL de tu imagen de fondo
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.text}>Email: {userEmail}</Text>
        <Text style={styles.text}>Nombre de usuario: {username}</Text>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Por favor, ingresa tu nombre de usuario:</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre de usuario"
              placeholderTextColor="#ccc"
              value={inputUsername}
              onChangeText={setInputUsername}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleUsernameSubmit}
            >
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Añade una capa semi-transparente
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff", // Color del texto para mejor legibilidad
    marginBottom: 20,
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: "#FF5C5C", // Color rojo para el botón de cerrar sesión
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: 250,
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
});
