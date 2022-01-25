import { Container, Sprite, utils } from "pixi.js";
import GameState from "../core/states/game-state";
import AsteroidsManager from "./asteroid/asteroids-manager";
import { CONFIG } from "./data/config";
import { Tags } from "./data/tags";
import BulletsManager from "./projectiles/bullets-manager";
import Spaceship from "./spaceship/spaceship";

export default class GameplayState extends GameState {
  constructor(game) {
    super(game);

    this._bg = null;
    this._gameContainer = null;
    this._spaceship = null;
    this._asteroids = null;
    this._bullets = null;
  }

  onEntered() {
    this._initBg();
    this._initGameContainer();
    this._setupCollisionTags();
    this._initSpaceship();
    this._initAsteroids();
    this._initBullets();
    this._setupEvents();
    this._forceResize();
  }

  update(dt) {
    this._spaceship.update(dt);
    this._asteroids.update(dt);
    this._bullets.update(dt);
  }

  _initBg() {
    const texture = utils.TextureCache['background'];
    const bg = new Sprite(texture);
    this._bg = bg;
    this.addChild(bg);
    bg.anchor.set(0.5);
  }

  _initGameContainer() {
    const container = new Container();
    this._gameContainer = container;
    this.addChild(container);
    container.pivot.set(CONFIG.Width * 0.5, CONFIG.Height * 0.5);
  }

  _setupCollisionTags() {
    const tags = this.game.getPhysics().getTags();
    tags.registerOne(Tags.Bullet, Tags.Bullet, false);
    tags.registerOne(Tags.Asteroid, Tags.Asteroid, false);
    tags.registerBoth(Tags.Bullet, Tags.Asteroid, true);
  }

  _initSpaceship() {
    const spaceship = new Spaceship(this.game);
    this._spaceship = spaceship;
    this._gameContainer.addChild(spaceship);
    spaceship.position.set(CONFIG.Width * 0.5, CONFIG.Height - 100);
  }

  _initAsteroids() {
    this._asteroids = new AsteroidsManager(this.game, this._gameContainer);
  }

  _initBullets() {
    this._bullets = new BulletsManager(this._gameContainer);
  }

  _setupEvents() {
    this.game.getScreen().onResize.add(this._onScreenResize, this);
    this._spaceship.onShoot.add(this._onSpaceshipShoot, this);
  }

  _forceResize() {
    this.game.getScreen().updateSize();
  }

  _onScreenResize() {
    const screen = this.game.getScreen();
    const width = screen.getWidth();
    const height = screen.getHeight();
    const centerX = width * 0.5;
    const centerY = height * 0.5;

    // cover screen with bg
    const bg = this._bg;
    bg.position.set(centerX, centerY);
    bg.scale.set(1);
    bg.scale.set(Math.max(width / bg.width, height / bg.height));

    // fit game container to desired size
    const container = this._gameContainer;
    container.scale.set(Math.min(width / CONFIG.Width, height / CONFIG.Height));
    container.position.set(centerX, centerY);
  }

  _onSpaceshipShoot(bullet) {
    this._bullets.add(bullet);
  }
}
