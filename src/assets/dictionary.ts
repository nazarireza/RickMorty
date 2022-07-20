import i18n from 'i18n-js';

const en = {
  'Rick and Morty': 'Rick and Morty',
  'Bookmarked Items': 'Bookmarked Items',
};

i18n.translations = {
  en,
};

i18n.locale = 'en';

export const useTranslation = () => {
  return {
    t: (key: keyof typeof en) => i18n.t(key),
  };
};
