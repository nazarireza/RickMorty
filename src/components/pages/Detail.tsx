import { memo } from 'react';
import { RootStackComponent, Routes } from '../../routes/types';
import { View, Text, StyleSheet } from 'react-native';

export const DetailPage: RootStackComponent<Routes.Detail> = memo(
  ({
    navigation,
    route: {
      params: { id },
    },
  }) => {
    return (
      <View style={styles.container}>
        <Text>Detail Page</Text>
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
