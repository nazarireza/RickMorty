import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import { StyleSheet, FlatList, ListRenderItem, Dimensions } from 'react-native';
import { Routes } from '../../routes/types';
import { Character } from '../../services/types';
import { ListMode } from '../../store/slices/appSlice';
import { Label } from '../atoms/Label';
import { Space } from '../atoms/Space';
import { CharacterItem } from '../molecules/CharacterItem';
import { RetryRequest } from '../molecules/RetryRequest';

type ItemListProps = {
  items: Character[];
  onEndReached?: () => void;
  hasError?: boolean;
  isBusy?: boolean;
  mode?: ListMode;
};

const { width } = Dimensions.get('window');

const PAGE_HORIZONTAL_PADDING = 16,
  ITEM_GAP = 8,
  COLUMN_COUNT = 2;

export const ItemList: React.FC<ItemListProps> = memo(
  ({
    items,
    onEndReached,
    hasError = false,
    isBusy = false,
    mode = 'Grid',
  }) => {
    const navigation = useNavigation();

    const renderItem: ListRenderItem<Character> = useCallback(
      ({ item, index }) => (
        <CharacterItem
          {...(mode === 'Grid' && {
            style: [
              styles.gridItemContainer,
              {
                marginEnd: (index + 1) % COLUMN_COUNT === 0 ? 0 : ITEM_GAP,
              },
            ],
          })}
          item={item}
          onPress={() =>
            navigation.dispatch(
              CommonActions.navigate({
                name: Routes.Detail,
                params: { id: item.id },
              })
            )
          }
        />
      ),
      [mode]
    );

    return (
      <FlatList
        key={mode}
        contentContainerStyle={styles.scrollContainer}
        data={items}
        numColumns={mode !== 'Grid' ? 1 : COLUMN_COUNT}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Space size="large" />}
        keyExtractor={(item) => `${item.id}`}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        ListFooterComponent={() =>
          hasError ? <RetryRequest onRetry={onEndReached} /> : null
        }
        ListEmptyComponent={() =>
          !isBusy ? <Label>List is empty!</Label> : null
        }
      />
    );
  }
);

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: PAGE_HORIZONTAL_PADDING,
    paddingTop: 8,
    paddingBottom: 24,
  },
  gridItemContainer: {
    width:
      (width - 2 * PAGE_HORIZONTAL_PADDING - (COLUMN_COUNT - 1) * ITEM_GAP) /
      COLUMN_COUNT,
  },
});
