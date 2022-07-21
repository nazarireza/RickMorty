import i18n from 'i18n-js';

const en = {
  'Rick and Morty': 'Rick and Morty',
  'Bookmarked Items': 'Bookmarked Items',
  "Something's Wrong": "Something's Wrong",
  Retry: 'Retry',
  Search: 'Search',
  Clear: 'Clear',
  Status: 'Status',
  Species: 'Species',
  Origin: 'Origin',
  'First Seen Episode': 'First Seen Episode',
  'Search and Filter': 'Search and Filter',
  Gender: 'Gender',
  'Last Known Location': 'Last Known Location',
  'Number Of Episodes': 'Number Of Episodes',
  'Last Seen Episode': 'Last Seen Episode',
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
