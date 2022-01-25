import Collider from "./collider";

export default class CircleCollider extends Collider {
  constructor(radius) {
    super();

    this.radius = radius;
    this.x = 0;
    this.y = 0;
    this.isCircle = true;
  }
}
