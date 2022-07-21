import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackComponent, Routes } from '../../routes/types';
import { useGetSingleCharacterQuery } from '../../services/api';
import { Character } from '../../services/types';
import { RootState } from '../../store';
import { unBookmark, bookmark } from '../../store/slices/bookmarkSlice';
import { LoadingContainer } from '../atoms/LoadingContainer';
import { CharacterDetailItem } from '../molecules/CharacterDetailItem';
import { RetryRequest } from '../molecules/RetryRequest';

export const DetailPage: RootStackComponent<Routes.Detail> = memo(
  ({
    navigation,
    route: {
      params: { id },
    },
  }) => {
    const {
      bookmark: { items: bookmarks },
    } = useSelector((state: RootState) => state);

    const dispatch = useDispatch();

    const { data, refetch, ...result } = useGetSingleCharacterQuery({
      id,
    });

    const isBookmarked = useMemo(
      () => data && bookmarks.findIndex((p) => p.id === data.id) !== -1,
      [bookmarks, data]
    );

    const onToggleBookmark = useCallback(() => {
      if (!isBookmarked) dispatch(bookmark(data as Character));
      else dispatch(unBookmark(data as Character));
    }, [data, isBookmarked]);

    useEffect(
      () =>
        navigation.setOptions({
          title: data?.name,
        }),
      [data]
    );

    return (
      <LoadingContainer style={styles.container} isBusy={result.isLoading}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {result.isError && <RetryRequest onRetry={refetch} />}
          {data && (
            <CharacterDetailItem
              item={data}
              isBookmarked={isBookmarked}
              onToggleBookmark={onToggleBookmark}
            />
          )}
        </ScrollView>
      </LoadingContainer>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
