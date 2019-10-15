/* eslint-disable prettier/prettier */
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { createBottomTabNavigator } from 'react-navigation';
import Home from '../components/screens/authenticatedRoutes/Home';
import Profile from '../components/screens/authenticatedRoutes/Profile';
import Camera from '../components/screens/authenticatedRoutes/Camera';

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: Home,

    navigationOptions: {
      header: null,
      tabBarLabel:"Inicio",
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name="home" size={30} color="black" />
      ),
    },
  },
  Camera: {
    screen: Camera,

    navigationOptions: {
      tabBarLabel:"Camara",
      tabBarIcon: ({ tintColor }) => (
        <Icon
           name= "camerao" size={30} color="black" />
      ),
    },
  },
  Profile: {
    screen: Profile,

    navigationOptions: {
      tabBarLabel:"Perfil",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="user" size={30} color="black" />
      ),
    },
  },
},
  {
  initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: 'white',
      },
    },
  }
);

TabNavigator.navigationOptions = {
  header: null
};

export default TabNavigator;
