import Debug from "./debug";

export default class Math2 {
  constructor() {
    Debug.staticClass();
  }

  static randomSign() {
    return Math.random() < 0.5 ? 1 : -1;
  }

  static sign(x) {
    return x < 0 ? -1 : 1;
  }

  static between(a, b) {
    const diff = b - a;
    return a + Math.random() * diff;
  }

  static lerp(a, b, t) {
    return a + (b - a) * t;
  }

  static move(from, to, movement) {
    const diff = to - from;

    if (diff > 0) {
      return (diff > movement ? from + movement : to);
    }

    const movementNegative = -movement;
    return (diff < movementNegative ? from + movementNegative : to);
  }
}

Math2.PI2 = Math.PI * 2;
Math2.PI05 = Math.PI * 0.5;
