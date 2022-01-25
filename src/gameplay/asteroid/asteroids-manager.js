import MiniSignal from "mini-signals";
import { Container } from "pixi.js";
import Game from "../../core/game/game";
import { CONFIG } from "../../data/config";
import Asteroid from "./asteroid";

export default class AsteroidsManager {
  /**
   * @param {Game} game
   * @param {Container} container
   */
  constructor(game, container) {
    this.game = game;
    this.onAsteroidDestroyed = new MiniSignal();
    this._container = container;
    this._asteroids = [];

    this._initAsteroids();
  }

  getCount() {
    return this._asteroids.length;
  }

  update(dt) {
    this._asteroids.forEach((asteroid) => asteroid.update(dt));
  }

  _initAsteroids() {
    const count = CONFIG.AsteroidsCount;
    const screenWidth = CONFIG.Width;
    const spawnPadding = 100;
    const spawnWidth = screenWidth - spawnPadding * 2;
    const stepX = spawnWidth / count;
    const offsetX = spawnPadding + stepX * 0.5;
    const offsetY = 100;

    for (let i = 0; i < count; ++i) {
      const asteroid = this._createAsteroid();
      asteroid.setBasePosition(offsetX + stepX * i, offsetY);
    }
  }

  _createAsteroid() {
    const asteroid = new Asteroid(this.game);
    this._asteroids.push(asteroid);
    this._container.addChild(asteroid);
    asteroid.getCollider().onCollided.add(this._onCollided, this);
    return asteroid;
  }

  _onCollided(_, collider) {
    const asteroid = collider.owner;
    asteroid.kill();

    const asteroids = this._asteroids;
    asteroids.splice(asteroids.indexOf(asteroid), 1);

    this.onAsteroidDestroyed.dispatch(asteroid);
  }
}
