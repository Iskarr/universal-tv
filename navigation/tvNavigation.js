import { createAppContainer, createStackNavigator } from "react-navigation";
import menuScreen from "../screens/menuScreen";
import tvDetailScreen from "../screens/tvDetailScreen";
import streamScreen from "../screens/streamScreen";
import Colors from "../constants/Colors";

const tvNavigation = createStackNavigator(
  {
    menuScreen: {
      screen: menuScreen
    },
    tvDetailScreen: {
      screen: tvDetailScreen
    },
    streamScreen: {
      screen: streamScreen
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primaryColor
      },
      headerTitleStyle: {
        color: Colors.textColor,
        fontSize: 20
      }
    }
  }
);

export default createAppContainer(tvNavigation);
