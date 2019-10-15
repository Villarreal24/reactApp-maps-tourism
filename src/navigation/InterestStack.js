import { createStackNavigator } from "react-navigation";
import Activities from "../components/screens/interest/Activities";
import Places from "../components/screens/interest/Places";
import Food from "../components/screens/interest/Food";

const InterestStack = createStackNavigator({
  Activities: {
    screen: Activities
  },
  Places: {
    screen: Places
  },
  Food: {
    screen: Food
  }
});

export { InterestStack };
