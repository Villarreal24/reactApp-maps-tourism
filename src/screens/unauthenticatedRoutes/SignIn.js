/* eslint-disable prettier/prettier */
// import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, StatusBar, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Logo from '../../components/common/Logo';
import { connect } from 'react-redux';
import SignInForm from './Forms/SignInForm';
import { actionLogin } from '../../../store/ACTIONS';


// create a component
class SignIn extends Component {
  signinUser = (values) => {
    this.props.login(values);
  }

  static navigationOptions = {
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    }
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar barStyle = "dark-content"
          hidden = {false}/>
        <KeyboardAvoidingView style={styles.containerKeyboard} behavior='height'>
          <Logo/>
          <SignInForm login = {this.signinUser} navigation/>
        
        <View style={{ flexDirection: "row", margin:5, marginTop:20 }}>
          <View style={{ flex: 1, paddingLeft:10 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ForgotPass');
              }}
            >
              <Text style={{
                fontSize:11 }}
                >Olvidaste la contraseña?</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems:'flex-end', paddingRight:10 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            >
              <Text style={{
                fontSize:11 }}
              >No tienes una cuenta?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lineStyle} />
        <View style={styles.LoginSocial}>
          <Button
            title='Iniciar Sesion con Facebook'>
          </Button>
        </View>
        </KeyboardAvoidingView>
      </View>
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
    backgroundColor: '#FFFFFF'
  },
  containerKeyboard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  containerInputs: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
    marginTop: 40,
  },
  LoginSocial: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineStyle: {
    borderWidth: .4,
    borderColor: '#CECED2',
    margin: 10,
    width: '90%'
  },
});

const mapStateToProps = state => ({
  numero: state.reducerPrueba,
});

const mapDispatchToProps = dispatch => ({
  login: (data) => {
    dispatch(actionLogin(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);