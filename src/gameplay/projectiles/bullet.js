import { Graphics, Point, Sprite } from "pixi.js";
import Game from "../../core/game/game";
import { CONFIG } from "../data/config";
import CircleCollider from "../../core/physics/circle-collider";
import { Tags } from "../data/tags";

export default class Bullet extends Sprite {
  /**
   * @param {Game} game 
   */
  constructor(game) {
    const texture = Bullet._getTexture(game);

    super(texture);

    this.game = game;
    this._velocity = new Point(0, 0);
    this._isAlive = true;
    this._collider = null;

    this.anchor.set(0.5);

    this._initCollider();
  }

  getCollider() {
    return this._collider;
  }

  setVelocity(x, y) {
    this._velocity.set(x, y);
  }

  setPosition(x, y) {
    if (this._isAlive) {
      const collider = this._collider;
      collider.x = x;
      collider.y = y;
      this.position.copyFrom(collider);
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

    const velocity = this._velocity;
    const collider = this._collider;
    collider.x += velocity.x * dt;
    collider.y += velocity.y * dt;
    this.position.copyFrom(this._collider);
  }

  _initCollider() {
    const collider = new CircleCollider(CONFIG.BulletRadius);
    this._collider = collider;
    collider.owner = this;
    collider.tag = Tags.Bullet;
    this.game.getPhysics().addCollider(collider);
  }

  static _getTexture(game) {
    let texture = Bullet._cachedTexture;

    if (!texture) {
      texture = Bullet._createTexture(game);
      Bullet._cachedTexture = texture;
    }

    return texture;
  }

  /**
   * @param {Game} game 
   */
  static _createTexture(game) {
    const graphics = new Graphics();
    graphics.beginFill(0x01fc06);
    graphics.drawCircle(0, 0, CONFIG.BulletRadius);
    graphics.endFill();

    const renderer = game.getRenderer();
    return renderer.generateTexture(graphics);
  }
}

Bullet._cachedTexture = null;
