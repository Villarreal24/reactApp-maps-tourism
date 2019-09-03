import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SectionList,
  StatusBar,
  BackHandler
} from "react-native";
import * as NavigationService from "../navigation/NavigationService";
import Icon from "react-native-ionicons";
import { connect } from 'react-redux';

const { width, height } = Dimensions.get('screen');
const HeightBar = StatusBar.currentHeight;

class ContentListDrawer extends Component {
  static navigationOptions = {
    headerStyle: {
      marginTop: HeightBar
    },
    headerTransparent: true,
    mode: "modal",
    headerMode: "none",
    headerLeft: (
      <TouchableOpacity onPress={() => NavigationService.navigate("Home")}>
        <Icon
          style={{ paddingLeft: 20 }}
          name="arrow-back"
          size={25}
          color={"#FFFFFF"}
        />
      </TouchableOpacity>
    )
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      NavigationService.navigate('App'); // works best when the goBack is async
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    const data = this.props.data[0];
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0,0,0, .5)"
          barStyle="light-content"
        />
        <Image
// -------------------------------------------------------
//        Imagen pendiente de ajustar correctamente
// -------------------------------------------------------
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flex: 1,
            resizeMode: 'contain',
            bottom: height * 0.32
          }}
          source={{ uri: data.image }}
        />
        <View style={styles.containerDetails}>
          <View style={{ paddingHorizontal: 20 }}>
            <Text
              style={{ fontSize: 30, fontWeight: "bold", paddingBottom: 5 }}
            >
              {data.title}
            </Text>
            <Text style={{ fontSize: 13, color: '#76767A' }}>
              {data.description}
            </Text>
          </View>
          <SectionList
            showsVerticalScrollIndicator={false}
            sections={data.data}
            renderSectionHeader={({ section: { listName } }) => (
              <Text
                style={{
                  marginLeft: 20,
                  marginTop: 15,
                  fontSize: 22,
                  fontWeight: 'bold'
                }}
              >
                {listName}
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
                      onPress={() =>
                        NavigationService.navigate('ContentListDrawer')
                      }
                    >
                      <Image
                        style={{
                          width: 216,
                          height: 130,
                          position: "absolute"
                        }}
                        source={{ uri: item.url }}
                      />
                      {/* <Text style={styles.textList}>{item.name}</Text> */}
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item, index) => String(index)}
              />
            )}
            keyExtractor={(item, index) => String(index)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerDetails: {
    flex: 1,
    position: 'absolute',
    top: '33%',
    paddingTop: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#FBFBFB'
  },
  listCategories: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
    marginLeft: 15,
    marginVertical: 10,
    width: 216,
    height: 130,
    borderRadius: 8,
    elevation: 3
  }
});

const mapStateToProps = state => {
  return {
    data: state.ExpandedDrawer
  };
};

// const mapDispatchToProps = dispatch => ({
//   authenticationUser: () => {
//   }
// });

export default connect(mapStateToProps)(ContentListDrawer);
