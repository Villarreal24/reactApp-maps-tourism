// import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, StatusBar, Picker } from 'react-native';
// import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Logo from '../../components/common/Logo';
import { connect } from 'react-redux';
import SignUpForm from './Forms/SignUpForm';
import { actionRegistry } from '../../../store/ACTIONS';
import BarStatus from '../../components/common/BarStatus';

// create a component
class SignUp extends Component {

  registerUser = (values) => {
    this.props.registry(values);
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

     {/* ----------------------------------------------------- 
                      FUNCTION RADIO BUTTON
    -----------------------------------------------------*/}
    // const radio_props = [
    //   {label: 'M', value: 0 },
    //   {label: 'F', value: 1 }
    // ];
   
    // const RadioButtonProject = ({
    //   getInitialState: function() {
    //     return {
    //       value: 0,
    //     }
    //   },
    // });

    return (
      <View style={styles.container}>
        <BarStatus />
          <KeyboardAvoidingView style={styles.containerKeyboard} behavior='padding'>
            <Logo/>
              <View style={styles.containerTexto}>
                <Text style={{
                  color: '#8D8D8D',
                  fontSize: 24,
                  paddingHorizontal: 22,
                  textAlign: 'left',
                  }}
                  >Bienvenido,
                  regístrate y disfruta de
                  tu aplicacion
                </Text>
              </View>
            <SignUpForm registry={this.registerUser} navigation={this.props} />
          
      {/* ----------------------------------------------------- 
                        RADIO BUTTONS
      -----------------------------------------------------*/}
            {/* <View style={{ flexDirection: "row", marginHorizontal: 45, marginBottom:10}}>
              <View style={styles.containerSelectionAge}>
                <Text style={{paddingLeft: 20, fontSize: 16}}>Edad</Text>
                <Picker
                  // selectedValue={this.state.language}
                  style={{height: 50, width: 100}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({language: itemValue})
                  }>
                  <Picker.Item label="13-17" value="java" />
                  <Picker.Item label="18-23" value="js" />
                  <Picker.Item label="24+" value="java" />
                  <Picker.Item label="50+" value="js" />
                </Picker>
              </View>
              <View style={styles.containerSelectionSex}>
                <Text style={{paddingRight: 25, fontSize: 16, paddingBottom: 17}}>Sexo</Text>
                <RadioForm
                  radio_props={radio_props}
                  initial={0}
                  formHorizontal={true}
                  buttonColor={'#707070'}
                  borderWidth={.3}
                  buttonSize={15}
                  onPress={(value) => {this.setState({value:value})}}
                />
              </View>
            </View> */}
            <View style={{flex:1,justifyContent:'center'}}>
              <Text style={{fontSize:11}}
                >Al crear un espacio usted acepta nuestra</Text>
              <TouchableOpacity>
                <Text style={{fontSize:11, color:'#516EFE'}}
                  >Terminos y condiciones y politica de privacidad</Text>
              </TouchableOpacity>
              {/* <View style={styles.lineStyle} /> */}
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
  },
  // containerSelectionSex: {
  //   flex: 1,
  //   alignItems:'flex-end',
  //   justifyContent: 'center',
  // },
  // containerSelectionAge: {
  //   flex: 1,
  //   alignItems: 'flex-start',
  //   justifyContent: 'center',
  // },
});


const mapStateToProps = state => ({
  numero: state.reducerPrueba,
});

const mapDispatchToProps = dispatch => ({
  registry: (values) => {
    dispatch(actionRegistry(values));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);