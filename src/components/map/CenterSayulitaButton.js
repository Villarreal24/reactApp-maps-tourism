import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export const CenterSayulitaButton = function(props) {
  const cb = props.cb
    ? props.cb
    : () => console.log("Callback function not passed to CenterSayulitaButton !");

  const bottom = props.bottom ? props.bottom : 180;

  return (
    <View style={[styles.container, { top: HEIGHT - bottom }]}>
      <Icon
        name="center-focus-strong"
        size={30}
        color={'#3C3B3B'}
        onPress={() => {
          cb();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 45,
    height: 45,
    backgroundColor: '#fff',
    left: WIDTH - 60,
    borderRadius: 50,
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent: 'space-around',
    alignItems: 'center',
  }
});
