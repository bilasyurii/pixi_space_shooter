import { Container } from "pixi.js";
import Bullet from "./bullet";

export default class BulletsManager {
  /**
   * @param {Container} container 
   */
  constructor(container) {
    this._container = container;
    this._bullets = [];
  }

  /**
   * @param {Bullet} bullet 
   */
  add(bullet) {
    this._bullets.push(bullet);
    this._container.addChild(bullet);
  }

  update(dt) {
    this._bullets.forEach((bullet) => bullet.update(dt));
  }
}
