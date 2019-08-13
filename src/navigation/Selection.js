import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { actionSetSession, actionLogout } from "../../store/ACTIONS";
import { connect } from "react-redux";
import { authentication } from "../../store/Services/Firebase";

class Selection extends Component {
  state = {
    isLoggedIn: null
  };

  componentDidMount() {
    this.props.authenticationUser();
  }

  componentDidUpdate() {
    this.updateRoute();
  }

  updateRoute = (prevProps, prevState) => {
    const { navigation, isLoggedIn } = this.props;
    console.log(isLoggedIn);
    if (isLoggedIn.isLoggedIn === true) {
      navigation.navigate("App");
    } else {
      navigation.navigate("Auth");
    }
  };

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
    isLoggedIn: state.reducerSession,
    user: state.reducerSession.user
  };
};

const mapDispatchToProps = dispatch => ({
  authenticationUser: () => {
    authentication.onAuthStateChanged(user => {
      console.log("Se ejecuto el dispatch de Selection");
      if (user) {
        console.log("Existe un usuario iniciado");
        dispatch(actionSetSession(user));
        console.log(user.toJSON());
      } else {
        console.log("No existe sesión");
        dispatch(actionLogout());
      }
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Selection);
