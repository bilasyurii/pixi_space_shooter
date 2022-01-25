import Math2 from "../../core/utils/math2";

export default class ValueNoise {
  constructor(octaves = 2) {
    this._seed = ~~(Math.random() * 30000);
    this._octaves = octaves;
  }

  getValue(x) {
    let frequency = 1;
    let amplitude = 1;
    let scale = 0;
    let total = 0;
    const octaves = this._octaves;

    for (let i = 0; i < octaves; ++i) {
      total += this._interpolatedNoise(x * frequency) * amplitude;
      scale += amplitude;
      frequency *= 2;
      amplitude *= 0.5;
    }

    return total / scale;
  }

  _pseudoRandom(x) {
    let n = this._seed + x * 57
    n = (n << 13) ^ n;
    return (1.0 - ((n * (n * n * 15731 + 789221) + 1376312589) % 0x7fffffff) / 1073741824.0);
  }

  _interpolatedNoise(x) {
    const integerX = ~~(x);
    let t = x - integerX;
    t = t * t * (3 - 2 * t);
    return Math2.lerp(this._pseudoRandom(integerX), this._pseudoRandom(integerX + 1), t);
  }
}
