import { memo } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
} from 'react-native';
import { useTranslation } from '../../assets/dictionary';
import { Character } from '../../services/types';
import { useUrl } from '../../utilities/useUrl';
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
    const { getLastRoute } = useUrl();

    return (
      <TouchableOpacity activeOpacity={0.7} {...rest}>
        <Image style={styles.cover} source={{ uri: image }} />
        <Space />
        <Label style={styles.title} numberOfLines={1}>
          {name}
        </Label>
        <Space />
        <KeyValueText title={t('Status')} value={status} numberOfLines={1} />
        <KeyValueText title={t('Species')} value={species} numberOfLines={1} />
        <KeyValueText
          title={t('Origin')}
          value={originName}
          numberOfLines={1}
        />
        <KeyValueText
          title={t('First Seen Episode')}
          value={getLastRoute(firstSeenEpisode)}
          numberOfLines={1}
        />
      </TouchableOpacity>
    );
  }
);

type KeyValueTextProps = {
  title: string;
  value?: string | number;
  numberOfLines?: number;
};

export const KeyValueText = memo<KeyValueTextProps>(
  ({ title, value, numberOfLines }) => {
    return (
      <Label style={styles.subtitle} numberOfLines={numberOfLines}>
        {title}: <Label style={styles.subtitleValue}>{value}</Label>
      </Label>
    );
  }
);

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
