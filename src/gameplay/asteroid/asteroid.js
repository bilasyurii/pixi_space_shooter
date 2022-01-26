import { Point, Sprite, utils } from "pixi.js";
import Math2 from "../../core/utils/math2";
import { CONFIG } from "../../data/config";
import CircleCollider from "../../core/physics/circle-collider";
import ValueNoise from "../utils/value-noise";
import Game from "../../core/game/game";
import { Tags } from "../../data/tags.enum";

export default class Asteroid extends Sprite {
  /**
   * @param {Game} game 
   */
  constructor(game) {
    const texture = utils.TextureCache['asteroid'];

    super(texture);

    this.game = game;
    this._basePosition = new Point();
    this._angle = new ValueNoise(4);
    this._distance = new ValueNoise(4);
    this._angleTime = 0;
    this._distanceTime = 0;
    this._isAlive = true;
    this._collider = null;

    this.anchor.set(0.5);

    this._initCollider();
  }

  getCollider() {
    return this._collider;
  }

  setBasePosition(x, y) {
    if (this._isAlive) {
      this._basePosition.set(x, y);
      this._updatePosition();
      this.position.copyFrom(this._collider);
    }
  }

  kill() {
    if (this._isAlive) {
      this._isAlive = false;
      this.game.getPhysics().removeCollider(this._collider);
      this.destroy();
    }
  }

  update(dt) {
    if (this._isAlive === false) {
      return;
    }

    this._angleTime += dt * 0.0005;
    this._distanceTime += dt * 0.002;
    this._updatePosition();
    this.position.copyFrom(this._collider);
  }

  _initCollider() {
    const collider = new CircleCollider(CONFIG.AsteroidRadius);
    this._collider = collider;
    collider.owner = this;
    collider.tag = Tags.Asteroid;
    this.game.getPhysics().addCollider(collider);
  }

  _updatePosition() {
    const basePosition = this._basePosition;
    const angle = (this._angle.getValue(this._angleTime) + 1) * 0.5 * Math2.PI2;
    const distance = this._distance.getValue(this._distanceTime) * CONFIG.AsteroidMovementAmplitude;
    const collider = this._collider;

    collider.x = basePosition.x + Math.cos(angle) * distance;
    collider.y = basePosition.y + Math.sin(angle) * distance;
  }
}
