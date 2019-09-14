import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  StatusBar,
  isAndroid,
  TouchableOpacity
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
    flex: 1,
    flexDirection: "row",
    marginTop: HeightBar + 15,
    width: '100%'
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555555",
    textAlign: "center",
    alignItems: 'center',
    paddingLeft: 27,
    flex: 1
  },
  headerIcon: {
    alignItems: 'flex-end',
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
