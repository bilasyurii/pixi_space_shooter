import { Graphics, Point, Sprite } from "pixi.js";
import Game from "../../core/game/game";
import { CONFIG } from "../../data/config";
import CircleCollider from "../../core/physics/circle-collider";
import { Tags } from "../../data/tags.enum";
import MiniSignal from "mini-signals";

export default class Bullet extends Sprite {
  /**
   * @param {Game} game 
   */
  constructor(game) {
    const texture = Bullet._getTexture(game);

    super(texture);

    this.game = game;
    this.onLifeTimeEnded = new MiniSignal();
    this._lifeTimer = game.getTime().createClock();
    this._velocity = new Point(0, 0);
    this._isAlive = true;
    this._collider = null;

    this.anchor.set(0.5);

    this._initCollider();
    this._setupEvents();
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

  spawn() {
    this.alpha = 1;
    this._lifeTimer.reset(5, true);
  }

  kill() {
    if (this._isAlive) {
      this._lifeTimer.pause();
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

    const lifeTime = this._lifeTimer.getTimeLeft();

    if (lifeTime < 1) {
      this.alpha = lifeTime;
    }
  }

  _initCollider() {
    const collider = new CircleCollider(CONFIG.BulletRadius);
    this._collider = collider;
    collider.owner = this;
    collider.tag = Tags.Bullet;
    this.game.getPhysics().addCollider(collider);
  }

  _setupEvents() {
    this._lifeTimer.onEnded.add(this._onLifeTimeEnded, this);
  }

  _onLifeTimeEnded() {
    this.onLifeTimeEnded.dispatch(this);
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
