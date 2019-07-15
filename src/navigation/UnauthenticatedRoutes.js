import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Login from '../screens/unauthenticatedRoutes/Login';
import SignIn from '../screens/unauthenticatedRoutes/SignIn';
import SignUp from '../screens/unauthenticatedRoutes/SignUp';
import ForgotPass from '../screens/unauthenticatedRoutes/ForgotPass';

const UnauthenticatedRoutes = createStackNavigator({
    Login: {
      screen: Login,
    },
    SignIn: {
      screen: SignIn,
    },
    SignUp: {
      screen: SignUp,
    },
    ForgotPass: {
      screen: ForgotPass,
    },
});

  export { UnauthenticatedRoutes };