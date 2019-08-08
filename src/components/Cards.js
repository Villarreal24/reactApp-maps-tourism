import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
// import { db } from '../../store/Services/Firebase';

class Cards extends Component {
  state = {
    itemSelected: null,
    checked: false
    // selected: [],
    // arraySelected: [null][false],
    // selected: (new Map(): Map<string, boolean>)
  };

  // componentWillMount() {
  //   // this.getData();
  //   // setTimeout(() => {
  //     // console.log('TimeOut');
  //     // db.collection('app').doc('interest').collection('activities').get().then(function(querySnapshot) {
  //     //   querySnapshot.forEach(function(doc) {
  //     //       // doc.data() is never undefined for query doc snapshots
  //     //       // console.log(doc.data());
  //     //     const content = doc.data();
  //     //     console.log(content);
  //     //     console.log(content.name);
  //     //     let ArrayActivities = Object.values(content);
  //     //   });
  //     // });
  //   // }, 1000);
  // }

  render() {
    const { navigation } = this.props;

    // const getData = () => {
    //   db.collection('app').doc('interest').collection('activities').get().then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //       // const content = doc;
    //     });
    //   });
    // }

    const onPressAction = (item, index) => {
      // console.log(index);
      // this.setState((state) => {
      //   // copy the map rather than modifying state.
      //   const selected = new Map(state.selected);
      //   selected.set(index, !selected.get(index)); // toggle
      //   return console.log(selected);
      // });
      // let { checked } = this.state;
      // let targetcheck = checked[index];
      // targetcheck.name = !targetcheck.name;
    };

    const selectionItem = index => {
      this.setState({
        checked: !this.state.checked,
        itemSelected: index,
      });
      // let selectedIndex = this.state.selected.indexOf(index+this.props.checked);
      //   if(selectedIndex== -1){
      //     this.setState({selected: [...this.state.selected,index+this.props.checked]})
      //   }

      // this.setState({
      //   arraySelected:[index][!this.state.arraySelected]
      // })
    };

    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          extraData={this.state}
          data={this.props.data}
          numColumns={2}
          renderItem={({ item, index }) => (
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 15,
                marginVertical: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  selectionItem(index);
                }}
                style={styles.cardButton}
                activeOpacity={0.6}
              >
                <View style={styles.containerCheck}>
                  <Image
                    style={styles.checkSelect}
                    source={
                      this.state.itemSelected === index
                        ? require('../../assets/icons/success.png')
                        : require('../../assets/icons/error.png')
                    }
                  />
                </View>
                <Image
                  style={{ width: 70, height: 70 }}
                  source={{ uri: item.image }}
                />
                <Text style={styles.text}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => String(index)}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 6,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000"
  },
  cardButton: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#30F177",
    padding: 5,
    width: 130,
    height: 150,
    borderRadius: 5,
    textAlign: "center"
  },
  containerCheck: {
    width: "100%",
    position: "absolute",
    top: 5,
    bottom: 0,
    left: 5,
    right: 0,
  },
  checkSelect: {
    width: 27,
    height: 27,
    position: "absolute"
  },
});

export default Cards;
