// import liraries
import React, { Component } from "react";
import { SafeAreaView } from 'react-navigation';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

// create a component
class Login extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={require('../../../assets/images/Login.png')}
        />
        <View style={styles.ContainerTexto}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 40,
              paddingHorizontal: 15,
              textAlign: 'center'
            }}
          >
            Explora el mundo desde tu celular!
          </Text>
        </View>
        <SafeAreaView style={{ flex: 1, width: "100%" }}>
          <View style={styles.ContainerButtons}>
            <TouchableOpacity
              style={styles.ButtonSignIn}
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  paddingTop: 6,
                  fontWeight: "bold",
                  width: "100%",
                  textAlign: 'center',
                }}
              >
                INICIAR SESION
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ButtonSignUp}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#FFFFFF",
                  paddingTop: 6,
                  fontWeight: "bold",
                  width: "100%",
                  textAlign: 'center',
                }}
              >
                REGISTRARSE
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.8)",
    paddingHorizontal: 16
  },
  ContainerTexto: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  ContainerButtons: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: 30
  },
  ButtonSignIn: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    width: "90%",
    height: 50,
    borderRadius: 15,
    textAlign: "center",
  },
  ButtonSignUp: {
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 10,
    width: "90%",
    height: 50,
    borderRadius: 15,
    textAlign: "center",
    marginTop: 20,
  },
  image: {
    position: "absolute",
    width: "125%",
    height: "100%",
    opacity: 0.4
  }
});

export default Login;
