import { Sprite, utils } from "pixi.js";
import SpaceshipInput from "./spaceship-input";

export default class Spaceship extends Sprite {
  constructor(game) {
    const texture = utils.TextureCache['spaceship'];

    super(texture);

    this.game = game;
    this._input = null;
    this._speed = 10;

    this.anchor.set(0.5);

    this._initInput();
    this._setupEvents();
  }

  update(dt) {
    const velocityX = this._input.getVelocityX() * this._speed;
    const movementX = velocityX * dt;

    this.position.x += movementX;
  }

  _initInput() {
    this._input = new SpaceshipInput(this.game)
  }

  _setupEvents() {
    this._input.onShoot.add(this._onShoot, this);
  }

  _onShoot() {
    console.log('shoot');
  }
}
