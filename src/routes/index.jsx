import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const {Navigator, Screen} = createNativeStackNavigator();

import {Home} from '../screens/Home';
import {Camera} from '../screens/Camera';
import {Gallery} from '../screens/Gallery';

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="Camera"
          component={Camera}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="Gallery"
          component={Gallery}
          options={{
            headerShown: false,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
