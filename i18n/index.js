import en from "./en.json";
import zh from "./zh.json";
import deal from './deal.json'
export default {
  en: { ...en, ...deal.en },
  zh: { ...zh, ...deal.zh }
};
