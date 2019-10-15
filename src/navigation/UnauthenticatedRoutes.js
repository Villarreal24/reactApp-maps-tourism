import { createStackNavigator } from 'react-navigation';
import Login from '../components/screens/unauthenticatedRoutes/Login';
import SignIn from '../components/screens/unauthenticatedRoutes/SignIn';
import SignUp from '../components/screens/unauthenticatedRoutes/SignUp';
import ForgotPass from '../components/screens/unauthenticatedRoutes/ForgotPass';

const UnauthenticatedRoutes = createStackNavigator(
  {
    SignIn: {
      screen: SignIn
    },
    SignUp: {
      screen: SignUp
    },
    ForgotPass: {
      screen: ForgotPass
    },
    Login: {
      screen: Login
    }
  },
  {
    initialRouteName: 'Login'
  }
);

export { UnauthenticatedRoutes };
