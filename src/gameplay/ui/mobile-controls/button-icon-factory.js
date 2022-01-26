import { Graphics, Sprite } from "pixi.js";
import Game from "../../../core/game/game";
import Debug from "../../../core/utils/debug";
import { ButtonType } from "./button-type.enum";

export default class ButtonIconFactory {
  constructor() {
    Debug.staticClass();
  }

  static createByType(game, type) {
    return ButtonIconFactory._createSprite(game, type);
  }

  static createMoveLeftIcon(game) {
    return ButtonIconFactory._createSprite(game, ButtonType.MoveLeft);
  }

  static createMoveRightIcon(game) {
    return ButtonIconFactory._createSprite(game, ButtonType.MoveRight);
  }

  static createShootIcon(game) {
    return ButtonIconFactory._createSprite(game, ButtonType.Shoot);
  }

  static _createSprite(game, type) {
    const texture = ButtonIconFactory._getTexture(game, type);
    const sprite = new Sprite(texture);
    sprite.anchor.set(0.5);
    return sprite;
  }

  static _getTexture(game, type) {
    const textures = ButtonIconFactory._cachedTextures;
    let texture = textures[type];
  
    if (!texture) {
      const create = ButtonIconFactory._getCreationMethod(type);
      texture = create(game);
      textures[type] = texture;
    }
  
    return texture;
  }

  static _getCreationMethod(buttonType) {
    switch (buttonType) {
      case ButtonType.MoveLeft:
        return ButtonIconFactory._createMoveLeftTexture;
      case ButtonType.MoveRight:
        return ButtonIconFactory._createMoveRightTexture;
      case ButtonType.Shoot:
        return ButtonIconFactory._createShootTexture;
      default:
        Debug.fail(`Unknown button type ${buttonType}.`);
    }
  }

  /**
   * @param {Game} game 
   */
  static _createMoveLeftTexture(game) {
    const size = ButtonIconFactory._size;
    const graphics = new Graphics();
    graphics.beginFill(ButtonIconFactory._color, ButtonIconFactory._alpha);
    graphics.drawPolygon([
      0, size * 0.5,
      size * 0.75, 0,
      size * 0.75, size,
    ]);
    graphics.endFill();
  
    const renderer = game.getRenderer();
    return renderer.generateTexture(graphics);
  }

  /**
   * @param {Game} game 
   */
  static _createMoveRightTexture(game) {
    const size = ButtonIconFactory._size;
    const graphics = new Graphics();
    graphics.beginFill(ButtonIconFactory._color, ButtonIconFactory._alpha);
    graphics.drawPolygon([
      0, 0,
      size * 0.75, size * 0.5,
      0, size,
    ]);
    graphics.endFill();
  
    const renderer = game.getRenderer();
    return renderer.generateTexture(graphics);
  }

  /**
   * @param {Game} game 
   */
  static _createShootTexture(game) {
    const size = ButtonIconFactory._size;
    const graphics = new Graphics();
    graphics.beginFill(ButtonIconFactory._color, ButtonIconFactory._alpha);
    graphics.drawCircle(0, 0, size * 0.5);
    graphics.endFill();
  
    const renderer = game.getRenderer();
    return renderer.generateTexture(graphics);
  }
}

ButtonIconFactory._size = 50;
ButtonIconFactory._color = 0xffffff;
ButtonIconFactory._alpha = 0.25;
ButtonIconFactory._cachedTextures = {};
