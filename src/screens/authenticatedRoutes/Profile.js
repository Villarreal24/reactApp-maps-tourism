import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  StatusBar,
  isAndroid
} from "react-native";
import { connect } from 'react-redux';
import { actionSignOut } from "../../../store/ACTIONS";

class Profile extends Component {
  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      isAndroid && StatusBar.setBackgroundColor('#EBEBEB');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Profile </Text>
        <Button title="Cerrar Sesion" onPress={() => this.props.SignOut()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
});

const mapStateToProps = state => ({
  numero: state.reducerPrueba,
});

const mapDispatchToProps = dispatch => ({
  SignOut: () => {
    dispatch(actionSignOut());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
