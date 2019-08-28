import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, Platform } from 'react-native';

class BarStatus extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          margin={30}
          barStyle="dark-content"
          hidden={false}
          translucent={true}
          backgroundColor="rgba(0,0,0, .3)"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  }
});

export default BarStatus;
