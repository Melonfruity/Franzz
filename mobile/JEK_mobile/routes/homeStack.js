
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const screens = {
  Home: {
    screen: Home
  },
  Login: {
    screen: Login
  }
}

const homeStack = createStackNavigator({  });