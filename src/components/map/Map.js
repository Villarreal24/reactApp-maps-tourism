import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker }  from 'react-native-maps';

class Map extends Component {
  renderMarkers = () => {
    const { locations } = this.props;
    return (
      <View>
        {locations.map((location, idx) => {
          const {
            coords: { latitude, longitude }
          } = location;
          return (
            <Marker key={idx} coordinate={{ latitude, longitude }}>
              <Image
                style={{ height: 20, width: 20 }}
                source={{ uri: location.image }}
              />
            </Marker>
          );
        })}
      </View>
    );
  };

  render() {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocation={true}
        followsUserLocation={true}
        style={styles.map}
        initialRegion={{
          latitude: this.props.userLatitude,
          longitude: this.props.userLongitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
      >
        {this.renderMarkers()}
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
