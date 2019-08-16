import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Video,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { actionWipeRoute } from '../../../store/ACTIONS.js';
import PlaceInput from './PlaceInput.js';

const { width, height } = Dimensions.get('screen');

const locations = require('../../components/objets/locations.json');

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markerImage: null,
      locations: locations,
      loading: false
    };
  }

  renderMarkers = () => {
    return locations.map((location, idx) => {
      const {
        coords: { latitude, longitude }
      } = location;
      return (
        <Marker
          key={idx}
          title={location.name}
          description={location.description}
          coordinate={{ latitude, longitude }}
          onPress={() => {
            this.setState({
              markerImage: location.image
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
    <View style={styles.containerMarkerDetails}>
      <Image
        source={{
          uri: this.state.markerImage
        }}
        style={styles.imageMarkers}
        onLoadStart={() => this.setState({ loading: true })}
        onLoadEnd={() => this.setState({ loading: false })}
      />
      {this.state.loading && <ActivityIndicator size="large" />}
    </View>
  );

  hideContentMarker = () => {
    this.setState({ markerImage: null });
    this.props.WipeRoute();
  };

  render() {
    const { coords } = this.props;

    return (
      <View style={{ flex: 1, paddingTop: 15 }}>
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
            longitudeDelta: 0.0121,
          }}
        >
          <MapView.Polyline
            coordinates={coords}
            strokeColor="#09ABD4"
            strokeWidth={4}
          />
          {this.renderMarkers()}
        </MapView>
        <PlaceInput />
        {this.markerDetails()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    paddingTop: 15,
    ...StyleSheet.absoluteFillObject,
  },
  containerMarkerDetails: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 100
  },
  imageMarkers: {
    flex: 1,
    width: width * 0.95,
    alignSelf: "center",
    height: height * 0.2,
    position: "absolute",
    bottom: height * 0.12,
    borderRadius: 6,
  },
});

const mapStateToProps = state => {
  return {
    coords: state.reducerPolylineCoords,
    showButton: state.reducerPolylineCoords,
  };
};

const mapDispatchToProps = dispatch => ({
  WipeRoute: () => {
    dispatch(actionWipeRoute());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
