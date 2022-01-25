import Debug from "../utils/debug";
import Collider from "./collider";
import TagManager from "./tags-manager";

export default class Physics {
  constructor() {
    /**
     * @type {Collider[]}
     */
    this._colliders = [];
    this._tags = new TagManager();
  }

  getTags() {
    return this._tags;
  }

  /**
   * @param {Collider} collider 
   */
  addCollider(collider) {
    this._colliders.push(collider);
  }

  /**
   * @param {Collider} collider 
   */
  removeCollider(collider) {
    const colliders = this._colliders;
    colliders.splice(colliders.indexOf(collider), 1);
  }

  update() {
    const colliders = this._colliders.slice();
    const count = colliders.length;
    const tags = this._tags;

    for (let i = 0; i < count; ++i) {
      const collider = colliders[i];
      const tag = collider.tag;

      for (let j = i + 1; j < count; ++j) {
        const other = colliders[j];

        if (tags.canCollide(tag, other.tag) === false) {
          continue;
        }

        const isCollision = this._checkCollision(collider, other);

        if (isCollision) {
          collider.onCollision(other);
          other.onCollision(collider);
        }
      }
    }
  }

  _checkCollision(a, b) {
    if (a.isCircle) {
      if (b.isCircle) {
        return this._circleToCircle(a, b);
      } else {
        Debug.fail('Unknown collider.' + b);
      }
    } else {
      Debug.fail('Unknown collider.' + a);
    }
  }

  _circleToCircle(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const radiuses = a.radius + b.radius;
    return ((dx * dx + dy * dy) < (radiuses * radiuses))
  }
}
