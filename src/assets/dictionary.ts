import i18n from 'i18n-js';

const en = {};

i18n.translations = {
  en,
};

i18n.locale = 'en';

export const useTranslation = () => {
  return {
    t: (key: keyof typeof en) => i18n.t(key),
  };
};
