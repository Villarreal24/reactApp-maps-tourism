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
import { db } from '../../store/Services/Firebase';
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get('screen');
const HeightBar = StatusBar.currentHeight;

class ContentListDrawer extends Component {
  state = {
    loading: true,
    TData: null,
    list: null
  };

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

  async componentDidMount() {
    await this.getData();
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      NavigationService.navigate('App'); // works best when the goBack is async
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  getData() {
    db.doc(
      `drawerBottom/subModules/listView/categories/content/${this.props.data}`
    )
      .get()
      .then(doc => {
        console.log(doc.data());
        this.setState({ TData: doc.data() });
        console.log(this.state.TData);
        this.setState({ list: this.state.TData.list });
        this.state.dataList = Object.values(this.state.list);
        console.log(this.state.dataList);
        this.setState({ loading: false });
      });
  }

  render() {
    const { loading } = this.state;
    console.log(this.props.data);
    if (loading) {
      // eslint-disable-next-line prettier/prettier
      return (
        <Spinner
          visible={loading}
          size={"large"}
          overlayColor={"#FFFFFF"}
          color={"black"}
        />
      );
    } else {
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
            source={{ uri: this.state.TData.image }}
          />
          <View style={styles.containerDetails}>
            <View style={{ paddingHorizontal: 20 }}>
              <Text
                style={{ fontSize: 30, fontWeight: "bold", paddingBottom: 5 }}
              >
                {this.state.TData.name}
              </Text>
              <Text style={{ fontSize: 13, color: '#76767A' }}>
                {this.state.TData.description}
              </Text>
            </View>
            <SectionList
              showsVerticalScrollIndicator={false}
              sections={this.state.dataList}
              renderSectionHeader={({ section: { title } }) => (
                <Text
                  style={{
                    marginLeft: 20,
                    marginTop: 15,
                    fontSize: 22,
                    fontWeight: 'bold'
                  }}
                >
                  {title}
                </Text>
              )}
              renderItem={({ item, section }) => {
                console.log(item);
                const temp = Object.values(item);
                const data = Object.values(temp[0]);
                console.log(data);
                return (
                  <View>
                    <FlatList
                      data={data}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item, index }) => (
                        <View>
                          <TouchableOpacity
                            style={styles.listCategories}
                            activeOpacity={0.6}
                            // onPress={() =>                             }
                          >
                            <Image
                              style={{
                                width: 216,
                                height: 130,
                                position: "absolute"
                              }}
                              source={{ uri: item.image }}
                            />
                            <Text style={styles.textList}>{item.name}</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                      keyExtractor={(item, index) => String(index)}
                    />
                  </View>
                );
              }}
              keyExtractor={(item, index) => String(index)}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerDetails: {
    flex: 1,
    position: 'absolute',
    width: '100%',
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
  },
  textList: {
    padding: 5,
    color: 'black',
  },
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
