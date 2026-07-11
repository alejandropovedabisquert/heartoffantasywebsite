import 'server-only'
import { Locale } from '@/lib/routes';

const dictionaries = {
  en: () => import('../../dictionaries/en.json').then((module) => module.default),
  es: () => import('../../dictionaries/es.json').then((module) => module.default),
  ca: () => import('../../dictionaries/ca.json').then((module) => module.default),
  ja: () => import('../../dictionaries/ja.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale as keyof typeof dictionaries]();
};
