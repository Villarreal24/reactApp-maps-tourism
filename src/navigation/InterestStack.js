import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Activities from '../screens/interest/Activities';
import Places from '../screens/interest/Places';
import Food from '../screens/interest/Food';

const InterestStack = createStackNavigator({
    Activities: {
      screen: Activities,
    },
    Places: {
        screen: Places,
    },
    Food: {
      screen: Food,
    },
});

  export { InterestStack };