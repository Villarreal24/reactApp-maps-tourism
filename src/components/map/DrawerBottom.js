import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import BottomDrawer from 'rn-bottom-drawer';

const TAB_BAR_HEIGHT = -50;

class DrawerBottom extends Component {
  // -------------------------------------------------------
  //       Contenido que se muestra en el BottomDrawer
  // -------------------------------------------------------
  renderContent = () => {
    return (
      <View style={{ backgroundColor: '#F8F8F8' }}>
        <View style={styles.lineStyle} />
        <Text style={{ fontSize: 20, textAlign: "center", paddingTop: 10 }}>
          Explora Sayulita
        </Text>
        <ScrollView horizontal={true}>
          <View style={styles.buttonsContainer}>
            {/* --------------------------------------------------------------
                                    Boton de "Videos & VR"
            ----------------------------------------------------------------*/}
            <TouchableOpacity style={styles.cardButton} activeOpacity={0.6}>
              <Image
                style={styles.image}
                source={{
                  uri:
                    'https://firebasestorage.googleapis.com/v0/b/vr-tourism-1559586745843.appspot.com/o/assets%2Ficons%2FMap%2FBottomDrawer%2Fvideos%26VR.png?alt=media&token=98dbc572-2093-4573-a9da-eb59983d0109',
                }}
              />
              <View style={styles.containerText}>
                <Text style={styles.text}>Videos{'\n'} & VR</Text>
              </View>
            </TouchableOpacity>
            {/* --------------------------------------------------------------
                                Boton de "Lugares Turisticos"
            ----------------------------------------------------------------*/}
            <TouchableOpacity style={styles.cardButton} activeOpacity={0.6}>
              <Image
                style={styles.image}
                source={{
                  uri:
                    'https://firebasestorage.googleapis.com/v0/b/vr-tourism-1559586745843.appspot.com/o/assets%2Ficons%2FMap%2FBottomDrawer%2FLugaresTuristicos.png?alt=media&token=0c180bb2-db5f-4ac4-ab42-9ca3171e46b5',
                }}
              />
              <View style={styles.containerText}>
                <Text style={styles.text}>Lugares{'\n'} Turisticos</Text>
              </View>
            </TouchableOpacity>
            {/* --------------------------------------------------------------
                                    Boton de "Recorridos"
            ----------------------------------------------------------------*/}
            <TouchableOpacity style={styles.cardButton} activeOpacity={0.6}>
              <Image
                style={styles.image}
                source={{
                  uri:
                    'https://firebasestorage.googleapis.com/v0/b/vr-tourism-1559586745843.appspot.com/o/assets%2Ficons%2FMap%2FBottomDrawer%2FRecorridos.png?alt=media&token=fc88c849-59e0-4f0f-8d20-57b2b355b44d',
                }}
              />
              <View style={styles.containerText}>
                <Text style={styles.text}>Recorridos</Text>
              </View>
            </TouchableOpacity>
            {/* --------------------------------------------------------------
                                    Boton de "Actividades"
            ----------------------------------------------------------------*/}
            <TouchableOpacity style={styles.cardButton} activeOpacity={0.6}>
              <Image
                style={styles.image}
                source={{
                  uri:
                    'https://firebasestorage.googleapis.com/v0/b/vr-tourism-1559586745843.appspot.com/o/assets%2Ficons%2FMap%2FBottomDrawer%2FActividades.png?alt=media&token=f1a95418-e8b7-45a8-9aa4-bb5459d3abc3',
                }}
              />
              <View style={styles.containerText}>
                <Text style={styles.text}>Actividades</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardButton}>
              <View style={styles.containerText}>
                <Text style={styles.text}>Otro</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };

  onExpanded = () => {
    console.log("Swipe");
    return (
      <View>
        <Text>Holis</Text>
      </View>
    );
  };

  render() {
    return (
      <BottomDrawer
        onExpanded={() => {
          this.onExpanded();
        }}
        startUp={false}
        containerHeight={400}
        offset={TAB_BAR_HEIGHT}
        roundedEdges={true}
        backgroundColor={"#F8F8F8"}
      >
        {this.renderContent()}
      </BottomDrawer>
    );
  }
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row"
  },
  containerText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: 'center',
    color: '#FFFFFF',
  },
  lineStyle: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#DBDBDB',
    marginTop: 10,
    marginLeft: 185,
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
    textAlign: 'center',
  },
  image: {
    opacity: 0.6,
    width: 95,
    height: 90,
    position: 'absolute',
    borderRadius: 4,
  },
});

export default DrawerBottom;
