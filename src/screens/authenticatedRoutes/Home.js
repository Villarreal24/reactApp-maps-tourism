import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> Mapita </Text>
            </View>
        )
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

export default Home;