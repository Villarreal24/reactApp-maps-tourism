// import liraries
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
// import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Logo from '../../components/common/Logo';
import { connect } from 'react-redux';
import SignUpForm from './Forms/SignUpForm';
import { actionRegistry } from '../../../store/ACTIONS';

// create a component
class SignUp extends Component {
  registerUser = values => {
    this.props.registry(values);
  };

  static navigationOptions = {
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    }
  };

  hideKeyboard() {
    Keyboard.dismiss();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.hideKeyboard}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            style={styles.containerKeyboard}
            behavior="padding"
          >
            <Logo />
            <View style={styles.containerTexto}>
              <Text
                style={{
                  color: '#8D8D8D',
                  fontSize: 24,
                  paddingHorizontal: 22,
                  textAlign: 'left',
                }}
              >
                Bienvenido, regístrate y disfruta de tu aplicacion
              </Text>
            </View>
            <SignUpForm registry={this.registerUser} />
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ fontSize: 11 }}>
                Al crear un espacio usted acepta nuestra
              </Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 11, color: "#516EFE" }}>
                  Terminos y condiciones y politica de privacidad
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
    marginBottom: 20,
  }
});

const mapStateToProps = state => ({
  numero: state.reducerPrueba,
});

const mapDispatchToProps = dispatch => ({
  registry: values => {
    dispatch(actionRegistry(values));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
