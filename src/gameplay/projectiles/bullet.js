import { Graphics, RenderTexture, Sprite } from "pixi.js";
import Game from "../../core/game/game";
import { CONFIG } from "../data/config";

export default class Bullet extends Sprite {
  /**
   * @param {Game} game 
   */
  constructor(game) {
    const texture = Bullet._getTexture(game);

    super(texture);

    this.anchor.set(0.5);
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
