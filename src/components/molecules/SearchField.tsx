import { memo } from 'react';
import { View, StyleSheet, ViewProps, TextInputProps } from 'react-native';
import { useTranslation } from '../../assets/dictionary';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Space } from '../atoms/Space';

type SearchFieldProps = {
  onSearch?: () => void;
  onClear?: () => void;
};

export const SearchField: React.FC<
  ViewProps & TextInputProps & SearchFieldProps
> = memo(({ onSearch, onClear, value, style, ...rest }) => {
  const { t } = useTranslation();

  return (
    <View style={[styles.container, style]} {...rest}>
      <Input
        {...rest}
        value={value}
        style={styles.input}
        returnKeyType="search"
        onSubmitEditing={onSearch}
      />
      <Space />
      <Button title={t('Search')} onPress={onSearch} disabled={!value} />
      <Button title={t('Clear')} onPress={onClear} disabled={!value} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    fontSize: 20,
    flex: 1,
  },
});
