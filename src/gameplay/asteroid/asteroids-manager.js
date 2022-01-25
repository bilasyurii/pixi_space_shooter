import { Container } from "pixi.js";
import { CONFIG } from "../data/config";
import Asteroid from "./asteroid";

export default class AsteroidsManager {
  /**
   * @param {Container} container
   */
  constructor(container) {
    this._container = container;
    this._asteroids = [];

    this._initAsteroids();
  }

  update(dt) {
    this._asteroids.forEach((asteroid) => asteroid.update(dt));
  }

  _initAsteroids() {
    const count = CONFIG.AsteroidsCount;
    const screenWidth = CONFIG.Width;
    const stepX = screenWidth / count;
    const offsetX = stepX * 0.5;
    const offsetY = 100;

    for (let i = 0; i < count; ++i) {
      const asteroid = this._createAsteroid();
      asteroid.setBasePosition(offsetX + stepX * i, offsetY);
    }
  }

  _createAsteroid() {
    const asteroid = new Asteroid();
    this._asteroids.push(asteroid);
    this._container.addChild(asteroid);
    return asteroid;
  }
}
