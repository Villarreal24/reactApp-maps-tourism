import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';

class Header extends Component {
  static navigationOptions = {
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    }
  };

  render() {
    return (
      <View>
        <StatusBar barStyle="dark-content" hidden={false} />
      </View>
    );
  }
}

export default Header;