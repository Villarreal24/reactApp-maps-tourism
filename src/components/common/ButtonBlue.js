// import liraries
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';


// create a component
class ButtonBlue extends Component {
    
    render() {

    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.BotonR}
            onPress={() => page }
            >
            <Text style={{
              fontSize:14,
              color:'#FFFFFF',
              paddingTop:6,
              fontWeight:'bold',
              width:'100%',
              textAlign:'center'}}>{this.props.text}</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  BotonR: {
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 10,
    width: '90%',
    height:50,
    borderRadius:25,
    textAlign: 'center'
  },
});

export default ButtonBlue;