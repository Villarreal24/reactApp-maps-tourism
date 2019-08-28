/* eslint-disable prettier/prettier */
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { UnauthenticatedRoutes } from './UnauthenticatedRoutes';
import { TabNavigator } from './TabNavigator';
import { InterestStack } from './InterestStack';
import Selection from './Selection';
import { authenticatedRoutes } from './authenticatedRoutes';


export default createAppContainer(createSwitchNavigator({
  AuthLoading: Selection,
  Auth: UnauthenticatedRoutes,
  Interest: InterestStack,
  App: TabNavigator,
  DeepApp: authenticatedRoutes
},
{
  initialRouteName: 'AuthLoading',
}
));
