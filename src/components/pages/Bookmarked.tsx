import { memo } from 'react';
import { RootStackComponent, Routes } from '../../routes/types';
import { View, Text, StyleSheet } from 'react-native';

export const BookmarkedPage: RootStackComponent<Routes.Bookmarked> = memo(
  ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text>Bookmarked Page</Text>
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
