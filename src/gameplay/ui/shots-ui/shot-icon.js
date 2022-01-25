import { Graphics, Sprite } from "pixi.js";
import Game from "../../../core/game/game";

export default class ShotIcon extends Sprite {
  /**
   * @param {Game} game 
   */
  constructor(game) {
    const texture = ShotIcon._getTexture(game);

    super(texture);
  }

  static _getTexture(game) {
    let texture = ShotIcon._cachedTexture;

    if (!texture) {
      texture = ShotIcon._createTexture(game);
      ShotIcon._cachedTexture = texture;
    }

    return texture;
  }

  /**
   * @param {Game} game 
   */
  static _createTexture(game) {
    const size = ShotIcon.Size;
    const graphics = new Graphics();
    graphics.beginFill(0x01fc06, 0.25);
    graphics.drawRoundedRect(0, 0, size, size, size * 0.3);
    graphics.endFill();

    const renderer = game.getRenderer();
    return renderer.generateTexture(graphics);
  }
}

ShotIcon.Size = 30;
ShotIcon._cachedTexture = null;
