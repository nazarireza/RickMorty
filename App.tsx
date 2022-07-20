import { useEffect } from 'react';
import store from './src/store';
import { getConfigurations } from './src/store/slices/appSlice';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './src/routes/RootStack';

// Set the locale once at the beginning of your app.
import './src/assets/dictionary';

export default function App() {
  useEffect(() => {
    store.dispatch(getConfigurations());
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}
