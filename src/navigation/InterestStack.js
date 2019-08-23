import { createStackNavigator } from "react-navigation";
import Activities from "../screens/interest/Activities";
import Places from "../screens/interest/Places";
import Food from "../screens/interest/Food";
import ContentListDrawer from "../components/map/ContentListDrawer";

const InterestStack = createStackNavigator({
  Activities: {
    screen: Activities
  },
  Places: {
    screen: Places
  },
  Food: {
    screen: Food
  },
  ContentListDrawer: {
    screen: ContentListDrawer
  }
});

export { InterestStack };
