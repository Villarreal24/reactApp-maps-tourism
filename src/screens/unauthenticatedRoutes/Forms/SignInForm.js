import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Field, reduxForm } from 'redux-form';

const fieldName = (props) => (
  <View style={styles.containerInput}>
    <TextInput style={styles.textInput}
      placeholder={props.ph}
      paddingHorizontal={20}
      onChangeText={props.input.onChange}
      keyboardType={props.input.name === 'email' ? 'email-address' : 'default'}
      autoCapitalize="none"
      onBlur={props.input.onBlur}
    />
    {props.meta.touched &&
        props.meta.error && <Text style={styles.errors}>{props.meta.error}</Text>}
  </View>
  );

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'requerido';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'correo invalido';
  }

  if (!values.password) {
    errors.password = 'requerido';
  } else if (values.password.length < 5) {
    errors.password = 'deben ser al menos 5 caracteres';
  } else if (values.password.length > 15) {
    errors.password = 'debe ser menor de 15 caracteres';
  }

  return errors;
};

const SignInForm = (props) => (
  <View style={styles.containerInput}>
    <Field name="email" component={fieldName} ph="Tu correo electronico" />
    <Field name="password" component={fieldName} ph="********" />
    <TouchableOpacity style={styles.Button}
      onPress={props.handleSubmit(props.login)}
    >
      <Text style={{
        fontSize:14,
        color:'#FFFFFF',
        paddingTop:6,
        fontWeight:'bold',
        width:'88%',
        textAlign:'center'}}>INICIAR SESION</Text>
    </TouchableOpacity>
  </View>
  );

const styles = StyleSheet.create({
  containerInput: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  textInput:{
    height: 50,
    width: '90%',
    borderRadius: 15,
    borderColor: '#CECED2',
    borderWidth: 1,
  },
  Button: {
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 10,
    width: '90%',
    height:50,
    borderRadius:15,
    textAlign: 'center'
  },
  errors: {
    color: '#FF0000',
  },
});

export default reduxForm({
  form: 'SignInForm',
  validate
})(SignInForm);
