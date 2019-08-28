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
import AwesomeAlert from "react-native-awesome-alerts";
import { connect } from "react-redux";
import Cards from '../../components/Cards';
import { actionGetDataActivities } from '../../../store/ACTIONS';

const { width, height } = Dimensions.get('screen');
const HeightBar = StatusBar.currentHeight;

class Activities extends Component {
  static navigationOptions = {
    header: null
  };

  state = { showAlert: true, data: null };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  componentDidMount() {
    this.props.getData();
  }

  render() {
    const { navigation } = this.props;
    const { showAlert } = this.state;

    const activities = [
      { name: 'Playa', image: 'https://firebasestorage.googleapis.com/v0/b/vr-tourism-1559586745843.appspot.com/o/assets%2Ficons%2FActivities%2Fplaya.png?alt=media&token=42874fc4-8c5c-4677-b314-4bc26069bb98'},
      { name: 'Museos', image: 'https://firebasestorage.googleapis.com/v0/b/vr-tourism-1559586745843.appspot.com/o/assets%2Ficons%2FActivities%2Fexposicion.png?alt=media&token=2850e7ad-3231-44a5-93b2-c61376623c24'},
      { name: 'Tours y Recorridos', image: 'https://firebasestorage.googleapis.com/v0/b/vr-tourism-1559586745843.appspot.com/o/assets%2Ficons%2FActivities%2Fviajar.png?alt=media&token=9b97d467-0bee-46e5-ab9f-ee82d715a6a2'},
      { name: 'Clubs y discotecas', image: 'https://firebasestorage.googleapis.com/v0/b/vr-tourism-1559586745843.appspot.com/o/assets%2Ficons%2FActivities%2Fbola-de-discoteca.png?alt=media&token=7d0e8533-ae59-462a-a953-b6a3ddf8538a'},
      { name: 'Descanso', image: 'https://firebasestorage.googleapis.com/v0/b/vr-tourism-1559586745843.appspot.com/o/assets%2Ficons%2FActivities%2Farea-de-descanso.png?alt=media&token=6bb7949c-6698-4f68-98a7-892288c44739'},
      { name: 'Turismo y Aventura', image: 'https://firebasestorage.googleapis.com/v0/b/vr-tourism-1559586745843.appspot.com/o/assets%2Ficons%2FActivities%2Fexcursionista.png?alt=media&token=4cac254e-71c5-4033-83ae-e799f9e79291'},
    ];

    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{ flex: 1, paddingTop: HeightBar }}>
        <StatusBar
          translucent
          backgroundColor="rgba(128,128,128, .5)"
          barStyle="light-content"
        />
        <Image
          style={styles.image}
          source={require('../../../assets/images/Interest.png')}
        />
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>
            Selecciona las actividades que te gustan realizar
          </Text>
          <Cards data={this.props.data} />
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.ButtonContinue}
              onPress={() => {
                navigation.navigate('Places');
              }}
            >
              <Text style={styles.textButton}>Continuar</Text>
            </TouchableOpacity>
          </View>
          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title="Selecciona tus gustos"
            message="Queremos conocer tus gustos e
                    intereses para recomendarte lo mejor para ti !"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Okay !"
            confirmButtonColor="#DD6B55"
            onConfirmPressed={() => {
              this.hideAlert();
            }}
          />
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
    color: '#FFFFFF',
    paddingTop: 3,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center'
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
    resizeMode: 'cover',
    height: height,
    width: width
  }
});

const mapStateToProps = state => {
  return {
    Data: state.DataActivities
  };
};

const mapDispatchToProps = dispatch => ({
  getData: () => {
    dispatch(actionGetDataActivities());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activities);
