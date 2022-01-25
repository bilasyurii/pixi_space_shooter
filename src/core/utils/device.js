export default class Device {
  constructor() {
    this.vita = false;
    this.kindle = false;
    this.android = false;
    this.chromeOS = false;
    this.iOS = false;
    this.linux = false;
    this.macOS = false;
    this.windows = false;
    this.windowsPhone = false;
    this.desktop = false;
    this.silk = false;
    this.language = 'en';

    this._checkOS();
    this._checkLanguage();
  }

  // adapted from Phaser 2's Device class: https://github.com/photonstorm/phaser/blob/v2.6.2/src/utils/Device.js
  _checkOS() {
    const ua = navigator.userAgent;

    if (/Playstation Vita/.test(ua)) {
      this.vita = true;
    } else if (/Kindle/.test(ua) || /\bKF[A-Z][A-Z]+/.test(ua) || /Silk.*Mobile Safari/.test(ua)) {
      this.kindle = true;
    } else if (/Android/.test(ua)) {
      this.android = true;
    } else if (/CrOS/.test(ua)) {
      this.chromeOS = true;
    } else if (/iP[ao]d|iPhone/i.test(ua)) {
      this.iOS = true;
    } else if (/Linux/.test(ua)) {
      this.linux = true;
    } else if (/Mac OS/.test(ua)) {
      this.macOS = true;
    } else if (/Windows/.test(ua)) {
      this.windows = true;
    }

    if (/Windows Phone/i.test(ua) || /IEMobile/i.test(ua)) {
      this.android = false;
      this.iOS = false;
      this.macOS = false;
      this.windows = true;
      this.windowsPhone = true;
    }

    this.silk = /Silk/.test(ua);

    if (this.windows || this.macOS || (this.linux && !this.silk) || this.chromeOS) {
      this.desktop = true;
    }

    if (this.windowsPhone || ((/Windows NT/i.test(ua)) && (/Touch/i.test(ua)))) {
      this.desktop = false;
    }
  }

  _checkLanguage() {
    if (!navigator) {
      return;
    }

    let language;

    if (navigator.language) {
      language = navigator.language;
    } else if (navigator.languages) {
      language = navigator.languages[0];
    } else if (navigator.userLanguage) {
      language = navigator.userLanguage;
    } else if (navigator.browserLanguage) {
      language = navigator.browserLanguage;
    } else if (navigator.systemLanguage) {
      language = navigator.systemLanguage;
    }

    if (language) {
      this.language = language.toLowerCase();
    }
  }
}
