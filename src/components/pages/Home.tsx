import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackComponent, Routes } from '../../routes/types';
import { useLazyGetCharactersQuery } from '../../services/api';
import { Character, CharacterStatus } from '../../services/types';
import { RootState } from '../../store';
import { ListMode, setConfigurations } from '../../store/slices/appSlice';
import { Card } from '../atoms/Card';
import { IconButton } from '../atoms/IconButton';
import { LoadingContainer } from '../atoms/LoadingContainer';
import { Space } from '../atoms/Space';
import { SearchField } from '../molecules/SearchField';
import { KeyValueData, SelectableList } from '../molecules/SelectableList';
import { ItemList } from '../organisms/ItemList';

const states: KeyValueData<CharacterStatus>[] = [
  { id: '', value: 'All' },
  { id: 'Alive', value: 'Alive' },
  { id: 'Dead', value: 'Dead' },
  { id: 'unknown', value: 'Unknown' },
];

const listRenderModes: KeyValueData<ListMode>[] = [
  { id: 'Grid', value: 'Grid' },
  { id: 'List', value: 'List' },
];

export const HomePage: RootStackComponent<Routes.Home> = memo(
  ({ navigation }) => {
    const [status, setStatus] = useState<CharacterStatus>('');
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [name, setName] = useState('');
    const [items, setItems] = useState<Character[]>([]);

    const { listMode } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();

    useEffect(
      () =>
        navigation.setOptions({
          headerRight: () => (
            <IconButton
              name="bookmark-outline"
              onPress={() => navigation.navigate(Routes.Bookmarked)}
            />
          ),
        }),
      []
    );

    const [get, result] = useLazyGetCharactersQuery();

    const onGetResult = useCallback(
      ({ data, reset }: { data: Character[]; reset: boolean }) => {
        setItems((prev) => (reset ? data : prev.concat(data)));
      },
      []
    );

    const getInitialCharacters = useCallback(
      ({ status, name }: { status: CharacterStatus; name: string }) => {
        // reset the app state when the "state" or "name" is changed
        setItems([]);
        setPage(1);

        get({
          page: 1,
          status,
          name,
        }).then((result) => {
          if (result.data) {
            setPageCount(result.data.info.pages);
            onGetResult({ data: result.data.results, reset: true });
          }
        });
      },
      []
    );

    useEffect(() => getInitialCharacters({ status, name }), []);

    const onChangeStatus = useCallback(
      (newStatus: CharacterStatus) => {
        setStatus(newStatus);
        getInitialCharacters({ status: newStatus, name });
      },
      [name]
    );

    const onSearch = useCallback(
      () => getInitialCharacters({ status, name }),
      [status, name]
    );

    const onClear = useCallback(() => {
      setName('');
      getInitialCharacters({ status, name: '' });
    }, [status]);

    const onEndReached = useCallback(() => {
      if (result.isFetching || page >= pageCount) return;

      get({
        status,
        name,
        page: page + 1,
      }).then((result) => {
        if (result.data) {
          setPage((prev) => prev + 1);
          onGetResult({ data: result.data.results, reset: false });
        }
      });
    }, [result.isFetching, page, pageCount, status, name]);

    const hasError = useMemo(
      () =>
        !result.isFetching &&
        result.error &&
        (result.error as FetchBaseQueryError)?.status !== 404,
      [result.isFetching, result.error]
    );

    return (
      <LoadingContainer style={styles.container} isBusy={result.isFetching}>
        <Space size="medium" />
        <Card style={styles.filterContainer}>
          <SelectableList
            data={states}
            selectedId={status}
            onChangeItem={({ id }) => onChangeStatus(id)}
          />
          <Space size="medium" />
          <SearchField
            value={name}
            onChangeText={(value) => setName(value)}
            onSearch={onSearch}
            onClear={onClear}
          />
        </Card>
        <Space size="large" />
        <SelectableList
          data={listRenderModes}
          selectedId={listMode}
          onChangeItem={({ id }) =>
            dispatch(
              setConfigurations({
                listMode: id,
              })
            )
          }
          style={styles.listModeContainer}
        />
        <Space size="small" />
        <ItemList
          items={items}
          mode={listMode}
          onEndReached={onEndReached}
          hasError={hasError}
          isBusy={result.isFetching}
        />
      </LoadingContainer>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listModeContainer: {
    paddingHorizontal: 16,
  },
  filterContainer: {
    paddingHorizontal: 16,
    marginHorizontal: 8,
  },
});
