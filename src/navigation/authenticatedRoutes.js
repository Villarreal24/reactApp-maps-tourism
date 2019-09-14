import { createStackNavigator } from "react-navigation";
import ContentListDrawer from "../components/ContentListDrawer";
import TabNavigator from './TabNavigator';

const authenticatedRoutes = createStackNavigator(
  {
    ContentListDrawer: {
      screen: ContentListDrawer
    },
    TabNavigator: {
      screen: TabNavigator
    }
  },
  {
    initialRouteName: 'TabNavigator'
  }
);

export { authenticatedRoutes };
