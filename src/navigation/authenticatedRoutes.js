import { createStackNavigator } from "react-navigation";
import ContentListDrawer from "../components/ContentListDrawer";

const authenticatedRoutes = createStackNavigator({
  ContentListDrawer: {
    screen: ContentListDrawer
  }
});

export { authenticatedRoutes };
