// import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';

// const text='INICIAR SESION';
// create a component
class Logo extends Component {

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Image style={styles.Image}
          source={require('../../../assets/images/Logo.png')}
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingTop: 120,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  Image: {
    width: 120,
    height: 90,
    position: 'absolute'
  }
});

export default Logo;