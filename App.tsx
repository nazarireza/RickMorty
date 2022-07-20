import { useEffect } from 'react';
import store from './src/store';
import { getConfigurations } from './src/store/slices/appSlice';
import { Provider } from 'react-redux';

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
