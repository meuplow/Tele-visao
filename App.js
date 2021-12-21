import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Tele-visão!</Text>
      <Pressable style={styles.button}>
        <Text style={styles.text}>Cadastrar novo local</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.text}>Cadastrar usuário</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold'
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#6A79A8',
    width: 200
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold'
  }
});