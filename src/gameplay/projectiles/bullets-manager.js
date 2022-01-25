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
    bullet.getCollider().onCollided.add(this._onCollided, this);
  }

  update(dt) {
    this._bullets.forEach((bullet) => bullet.update(dt));
  }

  _onCollided(_, collider) {
    const bullet = collider.owner;
    bullet.kill();

    const bullets = this._bullets;
    bullets.splice(bullets.indexOf(bullet), 1);
  }
}
