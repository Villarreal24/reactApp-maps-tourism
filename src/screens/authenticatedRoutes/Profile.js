import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { authentication } from '../../../store/Services/Firebase';

class Profile extends Component {

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text> Profile </Text>
        <Button
          title="Cerrar Sesion"
          onPress={() =>
            authentication
              .signOut()
              .then(console.log("Cerro Sesion"), navigation.navigate('Auth'))
              .catch(console.log("No pudo cerrar sesion"))
          }
        />
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

export default Profile;
