import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootStackComponent, Routes } from '../../routes/types';
import { RootState } from '../../store';
import { ItemList } from '../organisms/ItemList';

export const BookmarkedPage: RootStackComponent<Routes.Bookmarked> = memo(
  ({ navigation }) => {
    const { items } = useSelector((state: RootState) => state.bookmark);

    return (
      <View style={styles.container}>
        <ItemList items={items} />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
