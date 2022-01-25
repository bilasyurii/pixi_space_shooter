import MiniSignal from "mini-signals";

export default class Collider {
  constructor() {
    this.tag = null;
    this.owner = null;
    this.onCollided = new MiniSignal();
  }

  /**
   * @param {Collider} other 
   */
  onCollision(other) {
    this.onCollided.dispatch(other, this);
  }
}
