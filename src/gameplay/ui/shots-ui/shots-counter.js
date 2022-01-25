import { Container } from "pixi.js";
import Game from "../../../core/game/game";
import { CONFIG } from "../../../data/config";
import ShotIcon from "./shot-icon";

export default class ShotsCounter extends Container {
  /**
   * @param {Game} game 
   */
  constructor(game) {
    super();

    this.game = game;
    this._width = 0;
    this._height = ShotIcon.Size;
    this._shotIcons = [];

    this._initShotIcons();
  }

  onShoot() {
    const icons = this._shotIcons;
    const icon = icons.pop();

    if (icon) {
      icon.destroy();
    }
  }

  getWidth() {
    return this._width * this.scale.x;
  }

  getHeight() {
    return this._height * this.scale.y;
  }

  _initShotIcons() {
    const count = CONFIG.BulletsCount;
    const size = ShotIcon.Size;
    const interval = 5;
    const step = size + interval;

    this._width = step * count - interval;

    for (let i = 0; i < count; ++i) {
      const icon = this._createIcon();
      icon.position.x = step * i;
    }
  }

  _createIcon() {
    const icon = new ShotIcon(this.game);
    this._shotIcons.push(icon);
    this.addChild(icon);
    return icon;
  }
}
