/* eslint-disable prettier/prettier */
import React from 'react';
import { Platform, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Home from '../screens/authenticatedRoutes/Home';
import Profile from '../screens/authenticatedRoutes/Profile';
import Camera from '../screens/authenticatedRoutes/Camera';

const authenticatedRoutes = createBottomTabNavigator({
  Home: {
    screen: Home,

    navigationOptions: {
      tabBarLabel:"Inicio",
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name="home" size={28} color="black" />
      ),
    },
  },
  Camera: {
    screen: Camera,

    navigationOptions: {
      tabBarLabel:"Camara",
      tabBarIcon: ({ tintColor }) => (
        <Icon
           name= "camerao" size={28} color="black" />
      ),
    },
  },
  Profile: {
    screen: Profile,

    navigationOptions: {
      tabBarLabel:"Perfil",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="profile" size={28} color="black" />
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
      showLabel: true,
      style: {
        backgroundColor: 'white',
      },
    },
  }
);

  export { authenticatedRoutes };