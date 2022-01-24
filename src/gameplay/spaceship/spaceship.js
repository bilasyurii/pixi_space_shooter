import { Sprite, utils } from "pixi.js";

export default class Spaceship extends Sprite {
  constructor() {
    const texture = utils.TextureCache['spaceship'];

    super(texture);

    this.anchor.set(0.5);
  }
}
