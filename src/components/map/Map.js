import React, { Component } from "react";
import { StyleSheet, View, Image, Dimensions, Button } from "react-native";
import { connect } from "react-redux";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import { actionWipeRoute } from "../../../store/ACTIONS.js";

const { width, height } = Dimensions.get("screen");

const locations = require("../../components/objets/locations.json");

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markerImage: null,
      locations: locations
    };
  }

  renderMarkers = () => {
    return locations.map((location, idx) => {
      const {
        coords: { latitude, longitude },
      } = location;
      return (
        <Marker
          key={idx}
          title={location.name}
          description={location.description}
          coordinate={{ latitude, longitude }}
          onPress={() => {
            this.setState({
              markerImage: location.image,
            });
          }}
        >
          <Image
            style={{ height: 20, width: 20 }}
            source={{ uri: location.icon }}
          />
        </Marker>
      );
    });
  };

  markerDetails = () => (
    <View style={{ flex: 1 }}>
      <Image
        source={{
          uri: this.state.markerImage
        }}
        style={styles.imageMarkers}
      />
    </View>
  );

  hideContentMarker = () => {
    this.setState({ markerImage: null });
    this.props.WipeRoute();
  };

  // toggleCancel = () => {
  //   this.setState({
  //     showButton: !this.state.showButton
  //   });
  // };

  cancelRoute = () => {
    if (this.props.coords === []) {
      return (
        <View
          style={{
            position: 'absolute',//use absolute position to show button on top of the map
            top: '50%', //for center align
            alignSelf: 'flex-end' //for align to right
          }}
        >
          <Button title="Quitar Ruta" onPress={this.props.WipeRoute()} />
        </View>
      );
    } else {
      return null;
    }
  };

  render() {
    const { coords } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <MapView
          onPress={() => {
            this.hideContentMarker();
          }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          showsMyLocation
          followsUserLocation
          style={styles.map}
          initialRegion={{
            latitude: this.props.userLatitude,
            longitude: this.props.userLongitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        >
          <MapView.Polyline
            coordinates={coords}
            strokeColor="#09ABD4"
            strokeWidth={4}
          />
          {this.renderMarkers()}
        </MapView>
        {this.cancelRoute()}
        {this.markerDetails()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  imageMarkers: {
    flex: 1,
    width: width * 0.95,
    alignSelf: 'center',
    height: height * 0.2,
    position: 'absolute',
    bottom: height * 0.12,
    borderRadius: 6
  }
});

const mapStateToProps = state => {
  return {
    coords: state.reducerPolylineCoords,
    showButton: state.reducerPolylineCoords
  };
};

const mapDispatchToProps = dispatch => ({
  WipeRoute: () => {
    dispatch(actionWipeRoute());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
