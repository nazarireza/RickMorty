import { memo, useMemo } from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { useTranslation } from '../../assets/dictionary';
import { Character } from '../../services/types';
import { useUrl } from '../../utilities/useUrl';
import { IconButton } from '../atoms/IconButton';
import { Label } from '../atoms/Label';
import { Space } from '../atoms/Space';
import { KeyValueText } from './CharacterItem';

type CharacterDetailItemProps = {
  item: Character;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
};

export const CharacterDetailItem: React.FC<CharacterDetailItemProps> = memo(
  ({
    item: {
      image,
      name,
      status,
      species,
      origin: { name: originName },
      location: { name: locationName },
      episode,
      gender,
    },
    isBookmarked = false,
    onToggleBookmark,
  }) => {
    const { t } = useTranslation();
    const { getLastRoute } = useUrl();

    const [normalizedFirstSeenEpisode, normalizedLastSeenEpisode] =
      useMemo(() => {
        const { length, [0]: first, [length - 1]: last } = episode;
        return [getLastRoute(first), getLastRoute(last)];
      }, [episode]);

    return (
      <ScrollView>
        <Image style={styles.cover} source={{ uri: image }} />
        <Space />
        <Label style={styles.title} numberOfLines={1}>
          {name}
        </Label>
        <IconButton
          testID="bookmark"
          name={isBookmarked ? 'star' : 'star-outline'}
          onPress={onToggleBookmark}
        />
        <Space />
        <KeyValueText title={t('Status')} value={status} />
        <KeyValueText title={t('Species')} value={species} />
        <KeyValueText title={t('Gender')} value={gender} />
        <KeyValueText title={t('Origin')} value={originName} />
        <KeyValueText title={t('Last Known Location')} value={locationName} />
        <KeyValueText title={t('Number Of Episodes')} value={episode.length} />
        <KeyValueText
          title={t('First Seen Episode')}
          value={normalizedFirstSeenEpisode}
        />
        <KeyValueText
          title={t('Last Seen Episode')}
          value={normalizedLastSeenEpisode}
        />
      </ScrollView>
    );
  }
);

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cover: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
  },
});
