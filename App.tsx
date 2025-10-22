import * as React from 'react';
import {useEffect, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store';
import StackNavigation from './src/navigations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loadStoredTheme} from './src/store/Slices/themeSlice';
import './src/languages/index';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {Appearance} from 'react-native';
import Toast from 'react-native-toast-message';

const AppWrapper = () => (
  <GestureHandlerRootView style={{flex: 1}}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </GestureHandlerRootView>
);

const App = () => {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);
  const isDarkTheme = useSelector((state: any) => state.theme.switchDarkTheme);

  useEffect(() => {
    const fetchTheme = async () => {
      const value = await AsyncStorage.getItem('isDarkTheme');
      const systemPrefersDark = Appearance.getColorScheme() === 'dark';
      dispatch(
        loadStoredTheme(value !== null ? JSON.parse(value) : systemPrefersDark),
      );
      setIsReady(true);
    };
    fetchTheme();
  }, [dispatch]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
      <StackNavigation />
      <Toast />
    </NavigationContainer>
  );
};

export default AppWrapper;
