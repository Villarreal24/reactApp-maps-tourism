import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, isAndroid } from 'react-native';
// import { RNCamera, FaceDetector } from 'react-native-camera';

class Camera extends Component {
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
        <Text> Camara </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF'
  }
});

export default Camera;