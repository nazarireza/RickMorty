import { memo, useMemo } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
} from 'react-native';
import { useTranslation } from '../../assets/dictionary';
import { Character } from '../../services/types';
import { Label } from '../atoms/Label';
import { Space } from '../atoms/Space';

type CharacterItemProps = {
  item: Character;
  isBookmarked?: boolean;
};

export const CharacterItem: React.FC<
  CharacterItemProps & TouchableOpacityProps
> = memo(
  ({
    item: {
      image,
      name,
      status,
      species,
      origin: { name: originName },
      episode: [firstSeenEpisode],
    },
    isBookmarked = false,
    ...rest
  }) => {
    const { t } = useTranslation();

    const normalizedFirstSeenEpisode = useMemo(
      () => firstSeenEpisode.split('/').at(-1),
      [firstSeenEpisode]
    );

    return (
      <TouchableOpacity activeOpacity={0.7} {...rest}>
        <Image style={styles.cover} source={{ uri: image }} />
        <Space />
        <Label style={styles.title} numberOfLines={1}>
          {name}
        </Label>
        <Space />
        <KeyValueText title={t('Status')} value={status} />
        <KeyValueText title={t('Species')} value={species} />
        <KeyValueText title={t('Origin')} value={originName} />
        <KeyValueText
          title={t('First Seen Episode')}
          value={normalizedFirstSeenEpisode}
        />
      </TouchableOpacity>
    );
  }
);

type KeyValueTextProps = {
  title: string;
  value?: string;
};

const KeyValueText = memo<KeyValueTextProps>(({ title, value }) => {
  return (
    <Label style={styles.subtitle} numberOfLines={1}>
      {title}: <Label style={styles.subtitleValue}>{value}</Label>
    </Label>
  );
});

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
  },
  cover: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
  },
  subtitleValue: {
    fontWeight: 'bold',
  },
});
