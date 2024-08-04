import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";

import appFirebase from "../firebase";

const auth = getAuth(appFirebase);

export default function Log({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const logueo = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "El correo electrónico no es válido");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Iniciando Sesión", ("Bienvenido "+ email));
      navigation.navigate("Dashboard"); // Cambiado de FirstPage a Dashboard
    } catch (error) {
      Alert.alert("Error", "Contraseña incorrecta o usuario no encontrado");
    }
  };

  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Image source={require("../img/perfil.jpg")} style={styles.logo} />
        <Text style={styles.title}>Iniciar Sesión</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry={secureTextEntry}
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholderTextColor="#888"
          />
          <TouchableOpacity
            onPress={toggleSecureEntry}
            style={styles.eyeButton}
          >
            <Text style={styles.eyeButtonText}>
              {secureTextEntry ? "Mostrar" : "Ocultar"}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={logueo}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerLink}
          onPress={() => navigation.navigate("SignIn")} // Cambiado de Singin a SignIn
        >
          <Text style={styles.registerText}>
            ¿No tienes una cuenta? Regístrate
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 16,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 70,
    borderRadius: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#fff",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 16,
  },
  input: {
    width: 300,
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  registerLink: {
    marginTop: 16,
  },
  registerText: {
    color: "white",
    fontSize: 16,
  },
  eyeButton: {
    position: "absolute",
    right: 15,
    bottom: 28,
  },
  eyeButtonText: {
    color: "#bbb",
    fontSize: 20,
    alignItems: "center",
  },
});
