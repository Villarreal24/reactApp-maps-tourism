// import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';

// const text='INICIAR SESION';
// create a component
class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../../assets/images/Logo.png')}
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    margin: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image: {
    width: 120,
    height: 90,
    position: 'absolute',
  },
  image: {
    width: 120,
    height: 90,
    position: 'absolute'
  }
});

export default Logo;