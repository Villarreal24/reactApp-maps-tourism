import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions
} from "react-native";
import Cards from '../../components/Cards';

const { width, height } = Dimensions.get('screen');
const HeightBar = StatusBar.currentHeight;

class Places extends Component {

  static navigationOptions = {
    header: null
  };

  render() {
    const { navigation } = this.props;

    const places = [
      { name: 'Restaurante', image: 'https://firebasestorage.googleapis.com/v0/b/vr-tourism-1559586745843.appspot.com/o/assets%2Ficons%2FPlaces%2Frestaurante.png?alt=media&token=8d0dad08-1aa2-4ec5-abc7-e8ebda415020'},
      { name: 'Bar', image: 'https://firebasestorage.googleapis.com/v0/b/vr-tourism-1559586745843.appspot.com/o/assets%2Ficons%2FPlaces%2Fchampan.png?alt=media&token=9cac91cf-72ea-42c9-8553-b0443e2190f3'},
      { name: 'Comida Rapida', image: 'https://firebasestorage.googleapis.com/v0/b/vr-tourism-1559586745843.appspot.com/o/assets%2Ficons%2FPlaces%2Fhamburguesa.png?alt=media&token=73922d56-3081-4ded-ad25-73bbb7608396'},
      { name: 'Comida Urbana', image: 'https://firebasestorage.googleapis.com/v0/b/vr-tourism-1559586745843.appspot.com/o/assets%2Ficons%2FPlaces%2Fhot-dog.png?alt=media&token=66c069e4-41e7-440c-b089-c9d49391ec93'},
      { name: 'Gourmet', image: 'https://firebasestorage.googleapis.com/v0/b/vr-tourism-1559586745843.appspot.com/o/assets%2Ficons%2FPlaces%2Fostra.png?alt=media&token=7acbae94-940f-43f1-84bc-7428e4401538'},
      { name: 'De todo', image: 'https://firebasestorage.googleapis.com/v0/b/vr-tourism-1559586745843.appspot.com/o/assets%2Ficons%2FPlaces%2Fcamarero.png?alt=media&token=de267161-e6d4-4bbf-9228-790f920df93a'},
    ]

    return (
      <View style={{ flex: 1, paddingTop: HeightBar }}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={require("../../../assets/images/Interest.png")}
        />
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Selecciona donde te gusta comer</Text>
          <Cards data={places} />
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.ButtonContinue}
              onPress={() => {
                navigation.navigate('Food');
              }}
            >
              <Text style={styles.textButton}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.2)'
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    paddingTop: 15,
    width: '80%',
    marginBottom: 5
  },
  textButton: {
    fontSize:16,
    color:'#FFFFFF',
    paddingTop:3,
    fontWeight:'bold',
    width:'100%',
    textAlign:'center'
  },
  containerButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  ButtonContinue: {
    backgroundColor: '#00212F',
    padding: 10,
    width: '80%',
    height: 50,
    borderRadius: 15
  },
  image: {
    position: 'absolute',
    height: height,
    width: width
  },
});

export default Places;