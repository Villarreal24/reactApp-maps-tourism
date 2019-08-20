import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
// import Video from "react-native-video";
// import Youtube from "react-native-youtube";
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { actionWipeRoute } from '../../../store/ACTIONS.js';
import PlaceInput from './PlaceInput.js';
import { CenterSayulitaButton } from "./CenterSayulitaButton";

const { width, height } = Dimensions.get('screen');

const locations = require('../../components/objets/locations.json');

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markerContent: {},
      locations: locations,
      loading: false,
      isReady: false,
    };
  }

  // --------------------------------------------------------------
  //      Function para renderizar en la mapa los customMarkers
  //     recorriendo un arreglo .json obteniendo data + imagenes
  // --------------------------------------------------------------
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
              markerContent: location
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

  // -------------------------------------------------------------
  //      Function para mostrar la informacion + image/video
  //          de los customMarkers al ser presionados.
  // -------------------------------------------------------------
  markerDetails = () => {
    const { markerContent, loading } = this.state;
    switch (markerContent.name) {
      case 'Realidad Aumentada':
        console.log(markerContent.name);
        return (
          <View style={styles.containerMarkerDetails}>
            <Image
              source={{ uri: markerContent.url }}
              style={styles.contentMarkers}
              onLoadStart={() => this.setState({ loading: true })}
              onLoadEnd={() => this.setState({ loading: false })}
            />
            {loading && <ActivityIndicator size="large" />}
          </View>
        );
      case 'Recorrido Virtual':
        return (
          <View style={styles.containerMarkerDetails}>
            {/* <Video
              // source={require('../../../assets/videos/test.mp4')}
              source={{ uri: markerContent.url }}
              ref={ref => {
                this.player = ref;
              }}
              onBuffer={this.onBuffer}
              onError={this.videoError}
              style={styles.contentMarkers}
              onLoadStart={() => this.setState({ loading: true })}
              onLoadEnd={() => this.setState({ loading: false })}
            /> */}
            {/* <Youtube
              videoId="W7h-Yho8EB0"
              style={styles.imageMarkers}
              onReady={() => this.setState({ isReady: true })}
              play={true}
            /> */}
            <Image
              source={{ uri: markerContent.url }}
              style={styles.contentMarkers}
              onLoadStart={() => this.setState({ loading: true })}
              onLoadEnd={() => this.setState({ loading: false })}
            />
            {loading && <ActivityIndicator size="large" />}
          </View>
        );
      default:
        return null;
    }
  };

  centerMap() {
    const {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    } = this.props.region;

    this.map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    });
  }

  hideContentMarker = () => {
    this.setState({ markerContent: {} });
    this.props.WipeRoute();
  };

  render() {
    const { coords, region } = this.props;
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
          rotateEnabled={false}
          ref={map => (this.map = map)}
          style={styles.map}
          initialRegion={region}
        >
          <Polyline
            coordinates={coords}
            strokeColor="#09ABD4"
            strokeWidth={4}
          />
          {this.renderMarkers()}
        </MapView>
        <PlaceInput />
        <CenterSayulitaButton
          cb={() => {
            this.centerMap();
          }}
        />
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
  contentMarkers: {
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
