import { Text } from "pixi.js";
import Debug from "./debug";

export default class Localization {
  constructor() {
    Debug.staticClass();
  }

  /**
   * @param {string} key
   * @returns {string}
   */
  static get(key) {
    return Localization._strings[key] || key;
  }

  /**
   * @param {string} key
   * @param {string} value
   */
  static set(key, value) {
    Localization._strings[key] = value;
  }

  /**
   * @param {Text} text
   * @param {number} width
   * @param {number} height
   */
  static fitText(text, width, height) {
    const style = text.style;

    while (true) {
      if (text.width <= width && text.height <= height) {
        return;
      }

      const newSize = style.fontSize - 1;
      style.fontSize = newSize;

      if (newSize <= 4) {
        return;
      }
    }
  }

  /**
   * @returns {string}
   */
  static getLanguage() {
    return Localization._language;
  }

  /**
   * @param {string} language
   */
  static setLanguage(language) {
    const data = Localization._data;
    let languageData = data[language];

    if (!languageData) {
      Debug.info(`Language ${language} missing. Setting default language.`);

      language = Localization._defaultLanguage;
      languageData = data[language];
    }

    Localization._language = language;
    Localization._strings = languageData;

    Debug.info(`Language set: ${language}.`);
  }

  /**
   * @param {object} jsonObject
   */
  static setFromJSON(jsonObject) {
    const data = {};
    Localization._data = data;

    for (const key in jsonObject) {
      const translations = jsonObject[key];

      for (const language in translations) {
        Localization._storeString(language, key, translations[language]);
      }
    }
  }

  static _storeString(language, key, value) {
    const data = Localization._data;
    let languageData = data[language];

    if (!languageData) {
      languageData = {};
      data[language] = languageData;
    }

    languageData[key] = value;
  }
}

Localization._defaultLanguage = 'en';
Localization._language = Localization._defaultLanguage;
Localization._data = {};
Localization._strings = {};
