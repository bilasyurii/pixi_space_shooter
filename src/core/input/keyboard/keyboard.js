import Debug from "../../utils/debug";
import Key from "./key";

export default class Keyboard {
  constructor() {
    this._keys = [];
    this._keysLookup = {};

    this._setupEvents();
  }

  addKey(code) {
    const lookup = this._keysLookup;

    Debug.assert(!lookup[code], 'Can\'t add the same key to keyboard twice.');

    const key = new Key(code);
    lookup[code] = key;
    this._keys.push(key);
  }

  getKey(code) {
    return this._keys[code];
  }

  update() {
    this._keys.forEach((key) => key.update());
  }

  _setupEvents() {
    window.addEventListener('keydown', (event) => this._onDown(event));
    window.addEventListener('keyup', (event) => this._onUp(event));
  }

  _onDown(e) {
    const code = e.code;
    const key = this._keysLookup[code];

    if (key) {
      key.setDown();
    }
  }

  _onUp(e) {
    const code = e.code;
    const key = this._keysLookup[code];

    if (key) {
      key.setUp();
    }
  }
}
