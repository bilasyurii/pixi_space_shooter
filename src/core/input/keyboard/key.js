import MiniSignal from "mini-signals";
import Debug from "../../utils/debug";

export default class Key {
  constructor(code) {
    Debug.assert(code, 'Key code must be specified.');

    this.onDown = new MiniSignal();
    this.onUp = new MiniSignal();

    this._code = code;
    this._isDown = false;
    this._wasPressedThisFrame = false;
  }

  isDown() {
    return this._isDown;
  }

  isUp() {
    return this._isDown === false;
  }

  wasPressedThisFrame() {
    return this._wasPressedThisFrame;
  }

  setDown() {
    this._isDown = true;
    this._wasPressedThisFrame = true;
    this.onDown.dispatch(this);
  }

  setUp() {
    this._isDown = false;
    this._wasPressedThisFrame = true;
    this.onUp.dispatch(this);
  }

  update() {
    this._wasPressedThisFrame = false;
  }
}