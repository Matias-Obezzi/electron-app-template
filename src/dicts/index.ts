import en from './en.json';

export const langs = ["en"] as const;
export type Lang = typeof langs[number];
export const dicts : Record<Lang, Record<string, any>> = {
  en
}

const translator = (lang: Lang) => {
  return (...keys: string[]) => {
    return keys.reduce((acc: any, key) => {
      if (acc?.[key]) {
        return acc[key];
      }
      return "";
    }, dicts[lang]);
  }
}

export default translator;
