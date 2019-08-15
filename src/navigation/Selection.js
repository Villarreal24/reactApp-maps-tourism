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
    this.updateRoute();
  }

  async updateRoute() {
    const { navigation, user } = this.props;
    console.log(user);
    if (user) {
      navigation.navigate('App');
    } else {
      navigation.navigate('Auth');
    }
  }

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
  console.log(state.reducerSession);
  return {
    user: state.reducerSession
  };
};

const mapDispatchToProps = dispatch => ({
  authenticationUser: () => {
    authentication.onAuthStateChanged(user => {
      if (user) {
        console.log(user);
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
