import { Point, Sprite, utils } from "pixi.js";
import Math2 from "../../core/utils/math2";
import { CONFIG } from "../data/config";
import ValueNoise from "../utils/value-noise";

export default class Asteroid extends Sprite {
  constructor() {
    const texture = utils.TextureCache['asteroid'];

    super(texture);

    this._basePosition = new Point();
    this._angle = new ValueNoise(4);
    this._distance = new ValueNoise(4);
    this._angleTime = 0;
    this._distanceTime = 0;

    this.anchor.set(0.5);
  }

  setBasePosition(x, y) {
    this._basePosition.set(x, y);
    this._updatePosition();
  }

  update(dt) {
    this._angleTime += dt * 0.0005;
    this._distanceTime += dt * 0.002;
    this._updatePosition();
  }

  _updatePosition() {
    const basePosition = this._basePosition;
    const angle = (this._angle.getValue(this._angleTime) + 1) * 0.5 * Math2.PI2;
    const distance = this._distance.getValue(this._distanceTime) * CONFIG.AsteroidMovementAmplitude;

    this.position.set(
      basePosition.x + Math.cos(angle) * distance,
      basePosition.y + Math.sin(angle) * distance
    );
  }
}
