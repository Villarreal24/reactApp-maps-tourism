import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('screen');

const locations = require('../../components/map/locations.json');

class Map extends Component {
  state = {
    markerImage: null,
    locations: locations,
  };

  renderMarkers = () => {
    return (
      <View>
        {locations.map((location, idx) => {
          const {
            coords: { latitude, longitude }
          } = location;
          return (
            <Marker
              key={idx}
              title={location.name}
              description={location.address}
              coordinate={{ latitude, longitude }}
              onPress={this.onMarkerPress(location)}
            >
              <Image
                style={{ height: 20, width: 20 }}
                source={{ uri: location.icon }}
              />
            </Marker>
          );
        })}
      </View>
    );
  };

  onMarkerPress = location => () => {
    this.setState({
      markerImage: location,
    });
  };

  hideContentMarker = () => {
    this.setState({ markerImage: null });
  };

  render() {
    const { markerImage } = this.state;

    return (
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
        {this.renderMarkers()}
        <Image
          source={{
            uri: markerImage && markerImage.image
          }}
          style={{
            flex: 1,
            width: width * 0.95,
            alignSelf: "center",
            height: height * 0.15,
            position: "absolute",
            bottom: height * 0.12,
            borderRadius: 6
          }}
        />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
