/* eslint-disable prettier/prettier */
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { UnauthenticatedRoutes } from './UnauthenticatedRoutes';
import { authenticatedRoutes } from './authenticatedRoutes';
import { InterestStack } from './InterestStack';
import Selection from './Selection';


export default createAppContainer(createSwitchNavigator({
  AuthLoading: Selection,
  Auth: UnauthenticatedRoutes,
  Interest: InterestStack,
  App: authenticatedRoutes,
},
{
  initialRouteName: 'AuthLoading',
}
));
