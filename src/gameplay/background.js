import { Sprite, utils } from "pixi.js";

export default class Background extends Sprite {
  constructor() {
    const texture = utils.TextureCache['background'];

    super(texture);
  }
}
