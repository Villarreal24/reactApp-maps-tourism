import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Camera extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text> Camera </Text>
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
    },
});

export default Camera;