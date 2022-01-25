import MiniSignal from "mini-signals";
import { Point, Sprite, utils } from "pixi.js";
import Game from "../../core/game/game";
import Math2 from "../../core/utils/math2";
import { CONFIG } from "../../data/config";
import Bullet from "../projectiles/bullet";
import SpaceshipInput from "./spaceship-input";

export default class Spaceship extends Sprite {
  /**
   * @param {Game} game
   */
  constructor(game) {
    const texture = utils.TextureCache['spaceship'];

    super(texture);

    this.game = game;
    this.onShoot = new MiniSignal();
    this._input = null;
    this._cooldown = game.getTime().createClock(0.5);
    this._speed = 10;
    this._shootOffset = new Point(0, -100);
    this._ammoLeft = CONFIG.BulletsCount;

    this.anchor.set(0.5);

    this._initInput();
    this._setupEvents();
  }

  update(dt) {
    const velocityX = this._input.getVelocityX() * this._speed;
    const movementX = velocityX * dt;
    const position = this.position;
    const newX = position.x + movementX;
    const boundsPadding = 70;
    const leftBound = boundsPadding;
    const rightBound = CONFIG.Width - boundsPadding;

    if (newX < leftBound) {
      position.x = leftBound;
    } else if (newX > rightBound) {
      position.x = rightBound;
    } else {
      position.x = newX;
    }
  }

  _initInput() {
    this._input = new SpaceshipInput(this.game)
  }

  _setupEvents() {
    this._input.onShoot.add(this._onShoot, this);
  }

  _onShoot() {
    if (this._canShoot() === false) {
      return;
    }

    --this._ammoLeft;
    this._cooldown.restart();

    const bullet = new Bullet(this.game);
    const position = this.position;
    const shootOffset = this._shootOffset;

    bullet.setPosition(
      position.x + shootOffset.x,
      position.y + shootOffset.y
    );
    bullet.setVelocity(0, Math2.between(CONFIG.BulletVelocityY.from, CONFIG.BulletVelocityY.to));
    bullet.spawn();

    this.onShoot.dispatch(bullet);
  }

  _canShoot() {
    if (this._ammoLeft <= 0) {
      return false;
    }

    return this._cooldown.isRunning() === false;
  }
}
