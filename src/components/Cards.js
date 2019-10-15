import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
// import { db } from '../../store/Services/Firebase';

class Cards extends Component {
  state = {
    itemSelected: null,
    checked: false,
    pressed: false,
    selected_category: []
  };

  // ---------------------------------------------------------------
  //        Funcion para obtener en un arreglo y cambiar el
  //      estado de las opciones que va presionando el usuario.
  // ---------------------------------------------------------------
  _handleCategorySelect = index => {
    this.selectedArray = this.state.selected_category;

    if (this.selectedArray.indexOf(index) < 0) {
      this.selectedArray.push(index);
    } else {
      this.selectedArray.splice(this.selectedArray.indexOf(index), 1);
    }

    this.setState({ selected_category: this.selectedArray });
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          extraData={this.state}
          data={this.props.data}
          numColumns={2}
          renderItem={({ item, index }) => (
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 15,
                marginVertical: 5
              }}
            >
              <TouchableOpacity
                onPress={() => this._handleCategorySelect(index.toString())}
                underlayColor={"gray"}
                style={styles.cardButton}
                activeOpacity={0.6}
              >
                <View style={styles.containerCheck}>
                  <Image
                    style={styles.checkSelect}
                    source={
                      this.state.selected_category.indexOf(index.toString()) >=
                      0
                        ? require("../../assets/icons/success.png")
                        : require("../../assets/icons/error.png")
                    }
                  />
                </View>
                <Image
                  style={{ width: 70, height: 70 }}
                  source={{ uri: item.image }}
                />
                <Text style={styles.text}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => String(index)}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 6,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000"
  },
  cardButton: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#30F177",
    padding: 5,
    width: 130,
    height: 150,
    borderRadius: 5,
    textAlign: "center"
  },
  containerCheck: {
    width: "100%",
    position: "absolute",
    top: 5,
    bottom: 0,
    left: 5,
    right: 0
  },
  checkSelect: {
    width: 27,
    height: 27,
    position: "absolute"
  },
});

export default Cards;
