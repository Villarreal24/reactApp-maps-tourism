import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Cards from "../../components/Cards";
import { db } from "../../../store/Services/Firebase";
import Spinner from "react-native-loading-spinner-overlay";

const { width, height } = Dimensions.get("screen");
const HeightBar = StatusBar.currentHeight;

class Places extends Component {
  static navigationOptions = {
    header: null,
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
      .doc('interest/places')
      .get()
      .then(doc => {
        this.setState({ TData: doc.data() });
        this.state.documentData = Object.values(this.state.TData);
        this.setState({ loading: false });
      });
  }
  render() {
    const { loading, documentData } = this.state;
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, paddingTop: HeightBar }}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={require('../../../assets/images/Interest.png')}
        />
        <SafeAreaView style={styles.container}>
          <Spinner visible={loading} />
          <Text style={styles.title}>Selecciona donde te gusta comer</Text>
          <Cards data={documentData} />
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.ButtonContinue}
              onPress={() => {
                navigation.navigate("Food");
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 52, 52, 0.2)"
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    paddingTop: 15,
    width: "80%",
    marginBottom: 5
  },
  textButton: {
    fontSize: 16,
    color: "#FFFFFF",
    paddingTop: 3,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },
  containerButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  ButtonContinue: {
    backgroundColor: "#00212F",
    padding: 10,
    width: "80%",
    height: 50,
    borderRadius: 15
  },
  image: {
    position: "absolute",
    height: height,
    width: width
  }
});

export default Places;
