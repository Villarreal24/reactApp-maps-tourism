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
import { connect } from "react-redux";
import Cards from '../../components/Cards';
import { actionChangeInduction } from '../../../store/ACTIONS';

const { width, height } = Dimensions.get('screen');
const HeightBar = StatusBar.currentHeight;

class Food extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const food = [
      {
        name: "Vegetariano",
        image:
          "https://firebasestorage.googleapis.com/v0/b/vr-tourism-1559586745843.appspot.com/o/assets%2Ficons%2FFood%2Fdieta.png?alt=media&token=a6c96441-0efb-48f7-adf2-20bfe849b73a"
      },
      {
        name: "Carnivoro",
        image:
          "https://firebasestorage.googleapis.com/v0/b/vr-tourism-1559586745843.appspot.com/o/assets%2Ficons%2FFood%2Fcarne.png?alt=media&token=028aebe5-c433-4dfe-a1d5-193c8c849fd9"
      },
      {
        name: "Vegano",
        image:
          "https://firebasestorage.googleapis.com/v0/b/vr-tourism-1559586745843.appspot.com/o/assets%2Ficons%2FFood%2Fpasta.png?alt=media&token=5ab85a15-f162-4803-8742-9d4c3f9050cb"
      },
      {
        name: "Mar",
        image:
          "https://firebasestorage.googleapis.com/v0/b/vr-tourism-1559586745843.appspot.com/o/assets%2Ficons%2FFood%2Fcamaron.png?alt=media&token=72ba1702-e8c4-4cf0-84c3-6f710a9d3995"
      },
      {
        name: "Gluten Free",
        image:
          "https://firebasestorage.googleapis.com/v0/b/vr-tourism-1559586745843.appspot.com/o/assets%2Ficons%2FFood%2Fgluten-free.png?alt=media&token=ce14ea59-7c32-40d7-ab46-ff4206072b8a"
      },
      {
        name: "De todo",
        image:
          "https://firebasestorage.googleapis.com/v0/b/vr-tourism-1559586745843.appspot.com/o/assets%2Ficons%2FFood%2Fsupermercado.png?alt=media&token=1bb90017-e785-4a8e-a411-9f918ada3a07"
      }
    ];

    return (
      <View style={{ flex: 1, paddingTop: HeightBar }}>
        <Image
          style={styles.image}
          resizeMode='cover'
          source={require('../../../assets/images/Interest.png')}
        />
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Selecciona tus gustos de comida</Text>
          <Cards data={food} />
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.ButtonContinue}
              onPress={() => {
                this.props.changeInduction();
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
    fontSize: 16,
    color:'#FFFFFF',
    paddingTop: 3,
    fontWeight:'bold',
    width:'100%',
    textAlign:'center'
  },
  containerButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
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
  }
});

const mapStateToProps = state => {
  return {
    user: state.reducerSession
  };
};

const mapDispatchToProps = dispatch => ({
  changeInduction: () => {
    dispatch(actionChangeInduction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Food);
