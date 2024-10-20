// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store.js';
import AppNavigator from './src/navigation/AppNavigator.js';

export default function App() {
  return (
    <Provider store={store}>
      {/* Giữ NavigationContainer ở đây */}
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
