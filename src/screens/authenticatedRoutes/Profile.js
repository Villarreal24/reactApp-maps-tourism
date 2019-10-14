import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  isAndroid,
  TouchableOpacity,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import { actionSignOut } from "../../../store/ACTIONS";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconHeader from "react-native-vector-icons/AntDesign";

const HeightBar = StatusBar.currentHeight;

class Profile extends Component {
  componentDidMount() {
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setBarStyle("dark-content");
      isAndroid && StatusBar.setBackgroundColor("#EBEBEB");
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}> Perfil </Text>
          <IconHeader
            style={styles.headerIcon}
            name="setting"
            size={27}
            color={"#3C3B3B"}
          />
        </View>
        <View style={styles.containerPhoto}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={require("../../../assets/images/Perfil.png")}
          />
          <Text style={{ textAlign: "center", color: "#555555" }}>
            Iniciado con Facebook
          </Text>
        </View>
        <View style={styles.containerInputs}>
          <Text style={styles.titleInput}>Nombre Completo</Text>
          <TextInput
            style={styles.inputs}
            placeholder="Ted Benet"
            placeholderTextColor="#555555"
            paddingHorizontal={20}
            underlineColorAndroid='#E8E8E8'
          />
          <Text style={styles.titleInput}>Email</Text>
          <TextInput
            style={styles.inputs}
            placeholder="Ted.benet18@gmail.com"
            placeholderTextColor="#555555"
            paddingHorizontal={20}
            underlineColorAndroid='#E8E8E8'
          />
          <Text style={styles.titleInput}>Contraseña</Text>
          <TextInput
            style={styles.inputs}
            placeholder="**********"
            placeholderTextColor="#555555"
            paddingHorizontal={20}
            underlineColorAndroid='#E8E8E8'
          />
          <Text style={styles.titleInput}>Edad</Text>
          <TextInput
            style={styles.inputs}
            placeholder="32"
            placeholderTextColor="#555555"
            paddingHorizontal={20}
            underlineColorAndroid='#E8E8E8'
          />
          <Text style={styles.titleInput}>Sexo</Text>
          <TextInput
            style={styles.inputs}
            placeholder="Masculino"
            placeholderTextColor="#555555"
            paddingHorizontal={20}
            underlineColorAndroid='#E8E8E8'
          />
        </View>
        <View style={styles.PositionSignOut}>
          <TouchableOpacity
            style={styles.ButtonSignOut}
            onPress={() => this.props.SignOut()}
          >
            <View style={styles.containerSignOut}>
              <Icon name="exit-to-app" size={27} color={"#3C3B3B"} />
              <Text style={styles.textSignOut}>CERRAR SESION</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF"
  },
  containerTitle: {
    flexDirection: "row",
    marginTop: HeightBar + 15,
    width: "100%"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555555",
    textAlign: "center",
    alignItems: "center",
    paddingLeft: 27,
    flex: 1
  },
  headerIcon: {
    alignItems: "flex-end"
  },
  containerPhoto: {
    flex: 1,
    marginTop: 5,
    marginBottom: 10
  },
  image: {
    resizeMode: "contain",
    height: 150,
    width: 200
  },
  containerInputs: {
    flex: 2,
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    marginTop: 20
  },
  titleInput: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: -5
  },
  inputs: {
    marginLeft: -15,
    fontSize: 16,
    width: '100%',
    paddingBottom: 20
  },
  PositionSignOut: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 30
  },
  containerSignOut: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  ButtonSignOut: {
    width: "60%",
    borderRadius: 25,
    borderWidth: 1,
    padding: 8,
    paddingHorizontal: 25
  },
  textSignOut: {
    fontSize: 14,
    textAlign: "center",
    paddingLeft: 8
  }
});

const mapStateToProps = state => ({
  numero: state.reducerPrueba
});

const mapDispatchToProps = dispatch => ({
  SignOut: () => {
    dispatch(actionSignOut());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
