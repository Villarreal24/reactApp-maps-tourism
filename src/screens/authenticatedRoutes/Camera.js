import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  isAndroid,
  Dimensions
} from "react-native";
import { RNCamera } from 'react-native-camera';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

class Camera extends Component {
  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      isAndroid && StatusBar.setBackgroundColor('#EBEBEB');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }
  render() {
    return (
      <View style={styles.container}>
        <RNCamera style={styles.preview} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    height: winHeight,
    width: winWidth,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
});

export default Camera;
