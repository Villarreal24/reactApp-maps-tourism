import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  SectionList,
} from 'react-native';
import BottomDrawer from 'rn-bottom-drawer';
import { connect } from 'react-redux';
import {
  actionRouteCoords,
  actionSetExpandedDrawer
} from "../../../store/ACTIONS.js";
import getDirections from 'react-native-google-maps-directions';
import * as NavigationService from '../../navigation/NavigationService';

// import { db } from '../../../store/Services/Firebase.js';

const TAB_BAR_HEIGHT = -120;

const subModules = require('../objets/subModules.json');
const listExpandedDrawer = require('../objets/listExpandedDrawer.json');

const PolyCoordinates = [
  { latitude: 20.869904, longitude: -105.440426 },
  { latitude: 20.869565, longitude: -105.44123 },
  { latitude: 20.868465, longitude: -105.440704 },
  { latitude: 20.868647, longitude: -105.440795 },
  { latitude: 20.868717, longitude: -105.440618 },
  { latitude: 20.869255, longitude: -105.439349 },
  { latitude: 20.869314, longitude: -105.439379 },
  { latitude: 20.869345, longitude: -105.43972 },
  { latitude: 20.869384, longitude: -105.440755 },
  { latitude: 20.869594, longitude: -105.440882 },
  { latitude: 20.869687, longitude: -105.440944 },
  { latitude: 20.869769, longitude: -105.440749 },
  { latitude: 20.86969, longitude: -105.440938 },
  { latitude: 20.869929, longitude: -105.44106 },
  { latitude: 20.870535, longitude: -105.441349 },
];

// var docRef = db
//   .collection("app")
//   .doc("map")
//   .collection("buttonDrawer")
//   .doc("subModules");

// docRef
//   .get()
//   .then(function(doc) {
//     if (doc.exists) {
//       console.log("Document data:", doc.data());
//       const dataModules = doc.subModules.data();
//       console.log(dataModules);
//     } else {
//       // doc.data() will be undefined in this case
//       console.log("No such document!");
//     }
//   })
//   .catch(function(error) {
//     console.log("Error getting document:", error);
//   });

class DrawerBottom extends Component {
  handleGetDirections = () => {
    const data = {
      source: {
        latitude: 20.869904,
        longitude: -105.440426,
      },
      destination: {
        latitude: 20.870535,
        longitude: -105.441349,
      },
      params: [
        {
          key: 'travelmode',
          value: 'walking' // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: 'dir_action',
          value: 'navigate' // this instantly initializes navigation using the given travel mode
        },
      ],
      waypoints: [
        {
          latitude: 20.86844,
          longitude: -105.440765,
        },
        {
          latitude: 20.868808,
          longitude: -105.4406,
        },
        {
          latitude: 20.869458,
          longitude: -105.439708,
        },
        {
          latitude: 20.869559,
          longitude: -105.440936,
        },
        {
          latitude: 20.869711,
          longitude: -105.440718,
        },
        {
          latitude: 20.869906,
          longitude: -105.441115,
        },
        {
          latitude: 20.871036,
          longitude: -105.440364,
        },
      ],
    };
    getDirections(data);
  };

  // -------------------------------------------------------
  //       Botones - SubModulos en el BottomDrawer
  // -------------------------------------------------------
  renderSubmodules = () => {
    return (
      <View style={styles.containerSubModules}>
        <View style={styles.lineStyle} />
        <Text style={{ fontSize: 20, paddingTop: 10 }}>Explora Sayulita</Text>
        <FlatList
          data={subModules}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.cardButton}
              activeOpacity={0.6}
              onPress={() => {
                if (item.name === 'Recorridos') {
                  this.handleGetDirections();
                  // this.props.routeCoords(PolyCoordinates);
                }
              }}
            >
              <Image style={styles.image} source={{ uri: item.image }} />
              <View style={styles.containerText}>
                <Text style={styles.textModuls}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => String(index)}
        />
      </View>
    );
  };

  // -------------------------------------------------------
  //         Contenido del BottonDrawer expandido
  //      (Listado de contenido de los populares etc.)
  // -------------------------------------------------------
  expandedContent = () => {
    return (
      <View style={{ flex: 1, marginBottom: 100 }}>
        <SectionList
          showsVerticalScrollIndicator={false}
          sections={listExpandedDrawer}
          renderSectionHeader={({ section: { title } }) => (
            <Text
              style={{
                marginLeft: 10,
                marginTop: 15,
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              {title}
            </Text>
          )}
          renderItem={({ item, section }) => (
            <FlatList
              data={item}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <View>
                  <TouchableOpacity
                    style={styles.listCategories}
                    activeOpacity={0.6}
                    onPress={() => {
                      // const data = item.data;
                      this.props.updateExpandedDrawer(item.data);
                      NavigationService.navigate("ContentListDrawer");
                    }}
                  >
                    <Image
                      style={{ width: 216, height: 130, position: 'absolute' }}
                      source={{ uri: item.image }}
                    />
                    <Text style={styles.textList}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => String(index)}
            />
          )}
          keyExtractor={(item, index) => String(index)}
        />
      </View>
    );
  };

  render() {
    return (
      <BottomDrawer
        style={{ flex: 1 }}
        startUp={false}
        containerHeight={700}
        offset={TAB_BAR_HEIGHT}
        roundedEdges={true}
        backgroundColor={'#F8F8F8'}
      >
        {this.renderSubmodules()}
        {this.expandedContent()}
      </BottomDrawer>
    );
  }
}

const styles = StyleSheet.create({
  containerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSubModules: {
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  textModuls: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  textList: {
    padding: 7,
    fontSize: 18,
    width: '100%',
    color: '#FFFFFF',
    backgroundColor: 'rgba(52, 52, 52, 0.1)',
  },
  lineStyle: {
    borderWidth: 2,
    borderColor: '#DBDBDB',
    marginTop: 10,
    width: 30,
    borderRadius: 10,
  },
  cardButton: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#000000',
    margin: 6,
    width: 95,
    height: 90,
    borderRadius: 5,
    elevation: 2,
  },
  listCategories: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    margin: 10,
    width: 216,
    height: 130,
    borderRadius: 8,
    elevation: 3,
  },
  image: {
    opacity: 0.6,
    width: 95,
    height: 90,
    position: 'absolute',
    borderRadius: 4,
  },
});

const mapStateToProps = state => ({
  coords: state.reducerPolylineCoords,
  data: state.reducerExpandedContent
});

const mapDispatchToProps = dispatch => ({
  routeCoords: PolyCoordinates => {
    dispatch(actionRouteCoords(PolyCoordinates));
  },
  updateExpandedDrawer: item => {
    dispatch(actionSetExpandedDrawer(item));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerBottom);
