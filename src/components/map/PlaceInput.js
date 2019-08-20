import React, { Component } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import Axios from "axios";
import _ from "lodash";

class PlaceInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predictions: [],
      destinationInput: '',
    };
    this.getPlaces = this.getPlaces.bind(this);
    this.getPlacesDebounced = _.debounce(this.getPlaces, 500);
    this.setDestination = this.setDestination.bind(this);
  }

  // -------------------------------------------------------
  //          Autocompletar input al seleccionar una
  //            opcion del listado de predicciones
  // -------------------------------------------------------
  setDestination(main_text) {
    this.setState({ destinationInput: main_text, predictions: [] });
    Keyboard.dismiss();
  }

  // -------------------------------------------------------
  //          Request API, consulta del buscador de
  //           predicciones de los lugares del mapa
  // -------------------------------------------------------
  async getPlaces(input) {
    const result = await Axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyDGJWTDnaUpLl02VFsQmcNECQ_8gvuoQcY&input=${input}&location=20.868532, -105.437676&radius=10000`
    );
    this.setState({ predictions: result.data.predictions });
  }

  render() {
    const { suggestion, main_text, secondary_text, placeInput } = styles;
    const predictions = this.state.predictions.map(prediction => {
      const { id, structured_formatting } = prediction;
      return (
        <View style={{ flex:1 }}>
          <TouchableOpacity
            key={id}
            onPress={() => this.setDestination(structured_formatting.main_text)}
          >
            <View style={suggestion}>
              <Text style={main_text}>{structured_formatting.main_text}</Text>
              <Text style={secondary_text}>
                {prediction.structured_formatting.secondary_text}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    });
    return (
      <View>
        <TextInput
          value={this.state.destinationInput}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={input => {
            this.setState({ destinationInput: input });
            this.getPlacesDebounced(input);
          }}
          style={placeInput}
          placeholder="Buscar en el mapa"
          paddingLeft={20}
          fontSize={16}
        />
        {predictions}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  placeInput: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 10,
    borderRadius: 8,
    height: 47,
    backgroundColor: "#FFFFFF"
  },
  suggestion: {
    backgroundColor: "white",
    marginHorizontal: 10,
    paddingVertical: 1,
    borderWidth: 0.2,
    borderColor: "gray",
  },
  secondary_text: {
    color: "gray"
  },
});

export default PlaceInput;
