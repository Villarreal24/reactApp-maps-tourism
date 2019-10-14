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
import { db } from '../../../store/Services/Firebase';
import { actionGetDataInterest } from '../../../store/ACTIONS';

const { width, height } = Dimensions.get('screen');
const HeightBar = StatusBar.currentHeight;

class Activities extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    showAlert: true,
    data: null,
    loading: true,
    TData: null,
    documentData: null
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  async componentDidMount() {
    await this.props.getData("activities");
    await this.getData();
  }

  async getData() {
    await db
      .doc("interest/activities")
      .get()
      .then(doc => {
        this.setState({ TData: doc.data() });
        this.state.documentData = Object.values(this.state.TData);
      });
  }

  render() {
    const { navigation } = this.props;
    const { showAlert } = this.state;

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
          <Cards data={this.state.documentData} />
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
            confirmText="Aceptar !"
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
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    paddingTop: 15,
    width: '80%',
    marginBottom: 5,
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
  console.log('State de Activities: ', state.DataActivities);
  return {
    Data: state.DataActivities,
  };
};

const mapDispatchToProps = dispatch => ({
  getData: doc => {
    console.log(doc);
    dispatch(actionGetDataInterest(doc));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activities);
