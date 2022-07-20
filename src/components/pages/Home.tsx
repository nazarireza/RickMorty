import { memo } from 'react';
import { RootStackComponent, Routes } from '../../routes/types';
import { View, Text, StyleSheet } from 'react-native';

export const HomePage: RootStackComponent<Routes.Home> = memo(
  ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text>Home Page</Text>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
