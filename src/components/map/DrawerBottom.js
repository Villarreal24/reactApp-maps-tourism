import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  SectionList,
} from "react-native";
import BottomDrawer from "rn-bottom-drawer";
import { connect } from "react-redux";
import { actionRouteCoords } from "../../../store/ACTIONS.js";
// import { db } from '../../../store/Services/Firebase.js';

const TAB_BAR_HEIGHT = -100;

const subModules = require("../objets/subModules.json");
const buttonContent = require("../objets/buttonContent.json");

const PolyCoordinates = [
  { latitude: 20.870672, longitude: -105.440461 },
  { latitude: 20.870008, longitude: -105.440204 },
  { latitude: 20.86956, longitude: -105.44123 },
  { latitude: 20.868658, longitude: -105.440795 },
  { latitude: 20.869287, longitude: -105.439312 },
  { latitude: 20.868355, longitude: -105.436225 }
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
  // state = {
  //   PolyCoordinates: PolyCoordinates
  // };

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
                if (item.name === "Recorridos") {
                  this.props.routeCoords(PolyCoordinates);
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
          // contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          sections={buttonContent}
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
                  >
                    <Image
                      style={{ width: 216, height: 130, position: "absolute" }}
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
        startUp={false}
        containerHeight={700}
        offset={TAB_BAR_HEIGHT}
        roundedEdges={true}
        backgroundColor={"#F8F8F8"}
      >
        {this.renderSubmodules()}
        {this.expandedContent()}
      </BottomDrawer>
    );
  }
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
  },
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
    textAlign: "center",
    color: "#FFFFFF",
  },
  textList: {
    padding: 7,
    fontSize: 18,
    width: "100%",
    color: "#FFFFFF",
    backgroundColor: "rgba(52, 52, 52, 0.1)",
  },
  lineStyle: {
    borderWidth: 2,
    borderColor: "#DBDBDB",
    marginTop: 10,
    width: 30,
    borderRadius: 10,
  },
  cardButton: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#000000",
    margin: 6,
    width: 95,
    height: 90,
    borderRadius: 5,
    elevation: 2,
  },
  listCategories: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
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
    position: "absolute",
    borderRadius: 4,
  },
});

const mapStateToProps = state => ({
  coords: state.reducerPolylineCoords
});

const mapDispatchToProps = dispatch => ({
  routeCoords: (PolyCoordinates) => {
    dispatch(actionRouteCoords(PolyCoordinates));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerBottom);
