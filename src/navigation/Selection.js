import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { actionSetSession, actionLogout } from "../../store/ACTIONS";
import { connect } from "react-redux";
import { authentication } from "../../store/Services/Firebase";

class Selection extends Component {
  componentDidMount() {
    this.props.authenticationUser();
  }

  componentDidUpdate() {
    const { navigation, isLoggedIn } = this.props;
    // console.warn("previous", prevProps.isLoggedIn, "current", isLoggedIn);
    console.log(isLoggedIn);
    if (isLoggedIn === true) {
      navigation.navigate("App");
    } else {
      navigation.navigate("Auth");
    }
    // this.updateRoute();
  }

  // updateRoute = (prevProps, prevState) => {
  // };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  console.log("Actualizacion de StateToProps");
  console.log(state.reducerSession);
  return {
    isLoggedIn: state.reducerSession
  };
};

const mapDispatchToProps = dispatch => ({
  authenticationUser: () => {
    authentication.onAuthStateChanged(user => {
      console.log("Se ejecuto el dispatch de Selection");
      if (user) {
        console.log("Existe un usuario iniciado");
        dispatch(actionSetSession(true));
        console.log(user.toJSON());
      } else {
        console.log("No existe sesión");
        dispatch(actionLogout(false));
      }
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Selection);
