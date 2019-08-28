import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator, StatusBar } from "react-native";
import { actionSetSession, actionLogout } from "../../store/ACTIONS";
import { connect } from "react-redux";
import { authentication } from "../../store/Services/Firebase";

class Selection extends Component {
  componentDidMount() {
    this.props.authenticationUser();
  }

  componentDidUpdate() {
    const { navigation, user } = this.props;
    navigation.navigate(user ? 'App' : 'Auth');
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <StatusBar barStyle="default" />
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
  console.log("State de Selection ", state.InitialSession);
  return {
    user: state.InitialSession
  };
};

const mapDispatchToProps = dispatch => ({
  authenticationUser: () => {
    authentication.onAuthStateChanged(user => {
      if (user) {
        dispatch(actionSetSession(user));
      } else {
        dispatch(actionLogout());
      }
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Selection);
