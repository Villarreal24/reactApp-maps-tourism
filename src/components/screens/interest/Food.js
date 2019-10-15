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
import { db } from '../../../../store/Services/Firebase';
import { actionChangeInduction } from '../../../../store/ACTIONS';
import Cards from '../../Cards';
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get('screen');
const HeightBar = StatusBar.currentHeight;

class Food extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    TData: null,
    documentData: null,
    loading: true
  };

  async componentDidMount() {
    // this.props.getData("activities");
    await this.getData();
  }

  async getData() {
    await db
      .doc("interest/food")
      .get()
      .then(doc => {
        this.setState({ TData: doc.data() });
        this.state.documentData = Object.values(this.state.TData);
        this.setState({ loading: false });
      });
  }

  render() {
    const { loading, documentData } = this.state;

    return (
      <View style={{ flex: 1, paddingTop: HeightBar }}>
        <Image
          style={styles.image}
          resizeMode='cover'
          source={require('../../../../assets/images/Interest.png')}
        />
        <SafeAreaView style={styles.container}>
          <Spinner visible={loading} />
          <Text style={styles.title}>Selecciona tus gustos de comida</Text>
          <Cards data={documentData} />
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
