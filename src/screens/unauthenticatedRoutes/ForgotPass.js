// import liraries
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar
} from "react-native";
import Logo from '../../components/common/Logo';

const HeightBar = StatusBar.currentHeight;

// create a component
class ForgotPass extends React.Component {
  static navigationOptions = {
    headerStyle: {
      marginTop: HeightBar,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0
    }
  };

  hideKeyboard() {
    Keyboard.dismiss();
  }

  render() {
    const { navigation } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.hideKeyboard}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            style={styles.containerKeyboard}
            behavior="height"
          >
            <Logo />
            <View style={styles.containerTexto}>
              <Text
                style={{
                  color: '#8D8D8D',
                  fontSize: 24,
                  paddingHorizontal: 22,
                  textAlign: 'justify'
                }}
              >
                Ingresa tu correo{"\n"}electrónico te mandaremos un enlace para
                que reinicies tu contraseña
              </Text>
            </View>
            <TextInput
              style={{
                height: 50,
                width: '90%',
                borderRadius: 15,
                borderColor: '#CECED2',
                borderWidth: 1,
                marginBottom: 25
              }}
              placeholder="Ingresa tu correo registrado"
              paddingHorizontal={26}
            />
            <TouchableOpacity
              style={styles.Button}
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            >
              <Text
                style={{
                  fontSize:14,
                  color:'#FFFFFF',
                  paddingTop:6,
                  fontWeight:'bold',
                  width:'100%',
                  textAlign: "center"
                }}
              >
                CONTINUAR
              </Text>
            </TouchableOpacity>

            <View style={styles.containerSignIn}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Text style={{ fontSize: 11 }}>
                  Tienes una cuenta?
                  <Text style={{ color: "#516EFE" }}>  Iniciar Sesion</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
    },
    containerKeyboard: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    containerTexto: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30
    },
    containerSignIn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Button: {
      alignItems: 'center',
      backgroundColor: '#007AFF',
      padding: 10,
      width: '90%',
      height:50,
      borderRadius:15,
      textAlign: 'center',
    },
});

export default ForgotPass;