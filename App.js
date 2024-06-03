// In App.js in a new project

import * as React from 'react';
import Home from './src/Home';
import User from './src/User';
import List from './src/List';
import { Provider } from 'react-redux';
import store from './store/store'
import { Text, View } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="User" component={User} />
          <Stack.Screen name="List" component={List} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

export default App;

